import { listProduct } from "../interface/createOrder";

const servicesTotalQuantity = (array: listProduct[]) => {
    const reduce = array.reduce((sum: number, item: listProduct) => {
        return sum + Number(item.quantity)
    },0)
    return reduce
}

const servicesTotalPrice = (array: listProduct[]) => {
    const reduce = array.reduce((sum: number, item: listProduct) => {
        return sum + (Number(item.price) * Number(item.quantity))
    },0)
    return reduce
}

export {
    servicesTotalQuantity,
    servicesTotalPrice
}