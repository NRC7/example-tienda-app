export const isAbove18 = (user_date) => {
    // Obtener la fecha actual
    const actualDate = new Date();

    // Calcular la fecha límite (fecha actual menos 18 años)
    const limitDate = new Date(
        actualDate.getFullYear() - 18,
        actualDate.getMonth(),
        actualDate.getDate()
    );

    // Comparar la fecha de nacimiento con la fecha límite
    return new Date(user_date) <= limitDate;
}