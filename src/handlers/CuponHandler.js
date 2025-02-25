const calculateCupon = (cuponQuery) => {
    let cuponValue = 0;
    switch (cuponQuery) {
        case "SAVE50":
            cuponValue = 50;
            break;
        case "SAVE10":
            cuponValue = 10;
            break;  
        default:
            cuponValue = 0;
            break;
    }
    return cuponValue;
};

export const getCuponValue = (cuponQuery) => {
    const cuponValue = calculateCupon(cuponQuery) 
    return (cuponValue/100);
    //return calculateTotal() * (cuponValue/100);
};