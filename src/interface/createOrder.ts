interface infoForm {
    name: string,
    phone: string,
    email: string,
}

interface listProduct {
    value: string,
    id: number|string,
    quantity: number,
    price: number,
    label?: string
}

export {
    infoForm,
    listProduct
}