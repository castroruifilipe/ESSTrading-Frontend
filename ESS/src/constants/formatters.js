const formatterPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const formatterPercent = new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 3 });


export {
    formatterPercent,
    formatterPrice
}