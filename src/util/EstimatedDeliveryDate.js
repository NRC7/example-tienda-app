export const getEstimatedDeliveryDate = () => {

    const CLOSING_TIME = 18

    let estimatedDate = new Date();

    // Si es después de las XX:00, sumamos un día
    if (estimatedDate.getHours() >= CLOSING_TIME) {
        estimatedDate.setDate(estimatedDate.getDate() + 1);
    }

    let sumDays = 0;
    
    while (sumDays < 2) {
        estimatedDate.setDate(estimatedDate.getDate() + 1);
        if (estimatedDate.getDay() !== 0 && estimatedDate.getDay() !== 6) { // 0 = Domingo, 6 = Sábado
            sumDays++;
        }
    }

    return formatDate(estimatedDate);
};

export function formatDate(date) {
    const weekDays = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
    const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    
    const weekDay = weekDays[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${weekDay} ${day}/${month}./${year}`;
}

export function isWeekday(date) {
    const day = date.getDay();
    return day !== 0 && day !== 6; // Excluye domingos (0) y sábados (6)
}