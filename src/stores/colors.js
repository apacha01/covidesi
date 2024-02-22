import { atom } from "nanostores";

const hexStringRegex = /(?:#?[0-9a-fA-F]{6}|#?[0-9a-fA-F]{3})/;

export const textColor = atom('#000000');
export const bgColor = atom('#ffffff');

export const cvdTextColor = atom('#000000');
export const cvdBgColor = atom('#ffffff');

export const setTextColor = (newColor) => {
	// check if it is an hex string
	if (hexStringRegex.exec(newColor).length > 0)
		textColor.set(newColor);
};

export const setBgColor = (newColor) => {
	// check if it is an hex string
	if (hexStringRegex.exec(newColor).length > 0)
		bgColor.set(newColor);
};

export const setCvdTextColor = (newColor) => {
	// check if it is an hex string
	if (hexStringRegex.exec(newColor).length > 0)
		cvdTextColor.set(newColor);
};

export const setCvdBgColor = (newColor) => {
	// check if it is an hex string
	if (hexStringRegex.exec(newColor).length > 0)
		cvdBgColor.set(newColor);
};