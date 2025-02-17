export function increaseQuantity(quantity, max = 10) {
    return quantity < max ? quantity + 1 : quantity;
}

export function decreaseQuantity(quantity, min = 1) {
    return quantity > min ? quantity - 1 : quantity;
}