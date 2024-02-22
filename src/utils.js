export const hex2rgb = (hex) => {
	let result6digit =
		/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})?$/i.exec(hex);

	let result3digit =
		result6digit === null
			? /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})?$/i.exec(
				hex,
			)
			: null;

	// take the wright array
	let result =
		result6digit === null
			? result3digit.map((e) => `${e}${e}`)
			: result6digit;
	return result
		? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16),
		}
		: null;
};

export const rgb2hex = ({ r, g, b }) => {
	return '#' + r.toString(16).padStart(2, 0) + g.toString(16).padStart(2, 0) + b.toString(16).padStart(2, 0);
}