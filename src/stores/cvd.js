import { atom } from "nanostores";
import { CVD } from "../constants";

export const cvd = atom({ cvd: CVD.NORMAL, severity: 10 });

export const setCvd = (newCvd) => {
	cvd.set({ cvd: newCvd, severity: cvd.get().severity });
}

export const setCvdSeverity = (newSeverity) => {
	cvd.set({ cvd: cvd.get().cvd, severity: newSeverity });
}