const pennyToUnitary = (penny) => {
	if (!penny) {
		return ''
	}
    let yuan = penny/100.0;
    return yuan.toFixed(2);
}
export { pennyToUnitary };