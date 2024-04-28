import { listProduct } from "../interface/createOrder";

const servicesTotalQuantity = (array: listProduct[]) => {
    const reduce = array.reduce((sum, item) => {
        return sum + item.quantity
    },0)
    return reduce
}

const servicesTotalPrice = (array: listProduct[]) => {
    const reduce = array.reduce((sum, item) => {
        return sum + (item.price * item.quantity)
    },0)
    return reduce
}

export {
    servicesTotalQuantity,
    servicesTotalPrice
}