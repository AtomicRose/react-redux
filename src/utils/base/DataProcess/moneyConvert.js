const pennyToUnitary = (penny) => {
    if (penny && penny.toString().length && Number(penny).toString() !== 'NaN') {
        return parseFloat(penny/100.0).toFixed(2);
    }
    return '';
}

export default {
    pennyToUnitary
}
