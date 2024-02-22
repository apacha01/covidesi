import { CVD, machadoMatrices } from "./constants";

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

///////////////////////////////////////////////// Contrast Check
// Calculate relative luminance with w3 (https://www.w3.org/WAI/GL/wiki/Relative_luminance) formula:
// L = 0.2126 * R + 0.7152 * G + 0.0722 * B where R, G and B are defined as:
// if RsRGB <= 0.04045 then R = RsRGB/12.92 else R = ((RsRGB+0.055)/1.055) ^ 2.4
// if GsRGB <= 0.04045 then G = GsRGB/12.92 else G = ((GsRGB+0.055)/1.055) ^ 2.4
// if BsRGB <= 0.04045 then B = BsRGB/12.92 else B = ((BsRGB+0.055)/1.055) ^ 2.4
// and RsRGB, GsRGB, and BsRGB are defined as:
// RsRGB = R8bit/255
// GsRGB = G8bit/255
// BsRGB = B8bit/255
export const calculateRelativeLuminance = ({ r, g, b }) => {
	let R, G, B;

	let rs = r / 255;
	let gs = g / 255;
	let bs = b / 255;

	if (rs <= 0.04045) R = rs / 12.92;
	else R = Math.pow((rs + 0.055) / 1.055, 2.4);

	if (gs <= 0.04045) G = gs / 12.92;
	else G = Math.pow((gs + 0.055) / 1.055, 2.4);

	if (bs <= 0.04045) B = bs / 12.92;
	else B = Math.pow((bs + 0.055) / 1.055, 2.4);

	return 0.2126 * R + 0.7152 * G + 0.0722 * B;
};

// Calculate contrast with w3 (https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html#key-terms) formula:
// contrast ratio
// (L1 + 0.05) / (L2 + 0.05), where
// 		L1 is the relative luminance of the lighter of the colors, and
// 		L2 is the relative luminance of the darker of the colors.
export const calculateContrastRatio = (hexColorString1, hexColorString2) => {
	const L1 = calculateRelativeLuminance(hex2rgb(hexColorString1));
	const L2 = calculateRelativeLuminance(hex2rgb(hexColorString2));

	// L1 is darker
	if (L1 < L2) return (L2 + 0.05) / (L1 + 0.05);
	// L1 is lighter
	else return (L1 + 0.05) / (L2 + 0.05);
};

/////////////////////////////////////// CVD changes & selection
export const clampSeverity = (s) => {
	return s > 10 ? 10 : s < 1 ? 1 : s;
};

export const clampRGB = (n) => {
	return n > 255 ? 255 : n < 0 ? 0 : n;
};

// Calculate the color seen depending on the CVD
export const calculateColorByCvd = (_cvd, _severity, hexColorString) => {
	let realSeverity = clampSeverity(_severity);
	let { r, g, b } = hex2rgb(hexColorString);

	if (
		!Object.values(CVD).includes(_cvd) ||
		_cvd.localeCompare(CVD.NORMAL) === 0
	)
		return { r, g, b };

	// https://www.inf.ufrgs.br/~oliveira/pubs_files/CVD_Simulation/CVD_Simulation.html
	let M = machadoMatrices[_cvd][realSeverity - 1];

	return {
		r: clampRGB(Math.round(M[0] * r + M[1] * g + M[2] * b)),
		g: clampRGB(Math.round(M[3] * r + M[4] * g + M[5] * b)),
		b: clampRGB(Math.round(M[6] * r + M[7] * g + M[8] * b)),
	};
};