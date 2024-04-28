//format number
const roundNumber = (value: number|string) => {
    let replace:number|string = value
    if(value && value !== '') {
        replace = value.toString().replace(/[^0-9]/g,'')
        replace = parseFloat(replace)
        replace = replace.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    } else {
        replace = "0"
    }
    return replace
}

const formatCurrencyToNumber = (value: number|string) => {
    const stringWithoutCommas = value.toString().replace(/\,/g, '');
    return Number(stringWithoutCommas)
}
export {
    roundNumber,
    formatCurrencyToNumber
}