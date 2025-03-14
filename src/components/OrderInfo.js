import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { formatCurrency } from '../util/FormatCurrency';
import { sanitizeCategory } from '../util/SanitizeCategory';
import { getOrders } from '../services/PrivateServices';
import { useAuth } from '../context/AuthContext';
import '../styles/OrderInfo.css';

const OrderInfo = () => {

    const { authData } = useAuth();

    const [orders, setOrders] = useState([]);

    const [error, setError] = useState("");

    const [expandedRow, setExpandedRow] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async (token) => {
            try {
                const data = await getOrders(token)
                //   setProductsInContexts(data.data);
                console.log(data.data)
                setOrders(data.data)
            } catch (error) {
                console.log("error fetching orders: ", error)
                //   setProductsInContexts([]);
            }
        };
        fetchData(authData.access_token);
        
        }, []);

    const handleError = (status) => {
        if (status === "400") {
        setError("Faltan campos obligatorios.");
        } else if (status === "404") {
        setError("Usuario no registrado.");
        } else {
        setError("error durante pago.");
        }
    }; 

    const toggleRowDetail = (index) => {
        setExpandedRow(expandedRow === index ? null : index); // Alterna la visibilidad del detalle
    };

    const getCartQuantity = (arr) => {
        let qt = 0
        arr.forEach(element => {
            qt += element.quantity                                
        })
        return qt;
    }

    return (
            <div style={{ width: "98%", height: "90vh", marginTop: "30px", overflowY:"auto" }}>
                <table className="orders-table">
                    <thead>
                        <tr>
                            <th>N° DE ORDEN</th>
                            <th>FECHA COMPRA</th>
                            <th>MEDIO PAGO</th>
                            <th>TOTAL</th>
                            <th>ESTADO</th>
                            <th>DETALLE</th>
                        </tr>
                    </thead>
                    <tbody>
                    {orders.map((order, index) => (
                        <React.Fragment key={index}>
                        <tr>
                            <td>{order._id.slice(-4)}</td>
                            <td>{order.trxDate.slice(0, 19)} hrs.</td>
                            <td>{order.paymentMethod.replaceAll("*", "")}</td>
                            <td>
                            {order.totalWithDiscountAmount > 0
                                ? formatCurrency(order.totalWithDiscountAmount)
                                : formatCurrency(order.totalAmount)}
                            </td>
                            <td>{sanitizeCategory(order.status)}</td>
                            <td>
                            <button
                                className="details-btn"
                                onClick={() => toggleRowDetail(index)}
                            >
                                {expandedRow === index ? "Ocultar Detalle" : "Ver Detalle"}
                            </button>
                            </td>
                        </tr>
                        {/* Mostrar el detalle en un dropdown debajo de la fila */}
                        {expandedRow === index && (
                            <tr>
                                <td colSpan="6">
                                    <div className="order-detail">
                                        <div className="order-info">
                                            <span>Dirección: {order.address}</span>
                                            <span>Correo para envío boleta: {order.email}</span>
                                            <span>Fecha de entrega estimada: {order.deliveryDate}</span>
                                            <span>Fecha de compra: {order.trxDate.slice(0, 19)} hrs.</span>
                                            <span>Cantidad de productos: {getCartQuantity(order.cartProducts)}</span>
                                            <span>costo de envío: {formatCurrency(order.shippingCost)}</span>
                                            <span>Sub total: {formatCurrency(order.subTotalAmount)}</span>
                                            {order.totalWithDiscountAmount > 0 ? (
                                                <>
                                                    <span>Desct. por cupon: -{(parseFloat(order.couponFactor) * 100) + "%"}</span>
                                                    <span>Total con descuentos aplicados: {formatCurrency(order.totalWithDiscountAmount)}</span>
                                                </>
                                            ) : (
                                                <span>Total: {formatCurrency(order.totalAmount)}</span>
                                            )}
                                            <span>Estado: {order.status}</span>
                                            <span>Ultima actualizacion de estado: {order.lastStatusModificationDate}</span>
                                        </div>
                                        <div className="cart-products">
                                            <h4>Productos en el carrito:</h4>
                                            <div className="cart-products-list">
                                            {order.cartProducts.map((product, idx) => (
                                                <div key={idx} className="cart-product-item">
                                                    <img
                                                        src={product.imageResources[0]}
                                                        alt={product.name}
                                                        className="cart-product-image"
                                                    />
                                                    <span className="cart-product-name">{product.name} x{product.quantity}</span>
                                                </div>
                                            ))}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        )}
                        </React.Fragment>
                    ))}
                    </tbody>
                </table>
            </div>
        
    );
};

export default OrderInfo;