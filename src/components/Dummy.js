<div className='pr-cont' style={{ display: 'flex', flexDirection: 'row' }}>
            {products.length > 0 ? (
                products.map((product) => (
                    <div className='pr-cont' style={{ display: 'flex', flexDirection: 'row' }}>
                        <div className='pr-card' key={product.id}>
                            <h2>{product.name}</h2>
                            <p>Categoria: {product.category}</p>
                            <img src={product.imageResources} alt={product.name} style={{ width: '100px', height: '100px' }} />
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                {product.discountPercentage !== "" ? (
                                    <>
                                        {/* Muestra normalPrice tachado */}
                                        <span style={{ textDecoration: 'line-through', color: 'red', marginRight: '10px' }}>
                                            {product.normalPrice} CLP
                                        </span>
                                        {/* Muestra dealPrice y discountPercentage */}
                                        <span style={{ fontWeight: 'bold', color: 'green' }}>
                                            {product.dealPrice} CLP
                                        </span>
                                        <span style={{ color: 'blue', marginLeft: '10px' }}>
                                                (-{product.discountPercentage} de descuento)
                                        </span>
                                    </>
                                ) : (
                                    // Muestra solo el normalPrice si no hay descuento
                                    <span style={{ fontWeight: 'bold', color: 'black' }}>{product.normalPrice} CLP</span>
                                )}
                            </div>
                            {/* Mostrar las estrellas de calificación */}
                            <Rating rating={product.rating} />
                        </div>
                    </div>
                ))
            ) : (
                <p>Cargando productos...</p>
            )}
        </div>