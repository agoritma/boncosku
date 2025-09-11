const moneyFormat = (num) => {
    const formatedNumber = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `Rp ${formatedNumber}`
};

export default moneyFormat;