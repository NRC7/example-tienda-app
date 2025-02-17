export const getEstimatedDeliveryDate = () => {
    let fecha = new Date();
    let diasSumados = 0;
    
    while (diasSumados < 2) {
        fecha.setDate(fecha.getDate() + 1);
        if (fecha.getDay() !== 0 && fecha.getDay() !== 6) { // 0 = Domingo, 6 = Sábado
            diasSumados++;
        }
    }

    return formatearFecha(fecha);
};

function formatearFecha(fecha) {
    const diasSemana = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"];
    const meses = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
    
    const diaSemana = diasSemana[fecha.getDay()];
    const dia = fecha.getDate();
    const mes = meses[fecha.getMonth()];
    const anio = fecha.getFullYear();

    return `${diaSemana} ${dia}/${mes}./${anio}`;
}