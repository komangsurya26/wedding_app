import {
    Cormorant_Garamond,
    Karla,
    Marcellus,
    Bodoni_Moda,
    Lora,
    Great_Vibes,
    Caveat,
    Oranienbaum,
    Noto_Serif_Display,
    Lato,
} from "next/font/google";
import localFont from "next/font/local";

export const myFont1 = Cormorant_Garamond({ variable: "--font-cormorantgaramond", subsets: ["latin"] });
export const myFont2 = Karla({ variable: "--font-karla", subsets: ["latin"] });
export const myFont3 = Marcellus({ variable: "--font-marcellus", subsets: ["latin"], weight: "400" });
export const myFont4 = Bodoni_Moda({ variable: "--font-bodonimoda", subsets: ["latin"] });
export const myFont5 = localFont({ src: "../public/fonts/BelgianoSerif.woff2", display: "swap", variable: "--font-belgiano" });
export const myFont6 = localFont({ src: "../public/fonts/Thesignature.woff2", display: "swap", variable: "--font-signature" });
export const myFont7 = Lora({ variable: "--font-lora", subsets: ["latin"] });
export const myFont8 = Great_Vibes({ variable: "--font-greatvibes", subsets: ["latin"], weight: "400" });
export const myFont9 = Caveat({ variable: "--font-caveat", subsets: ["latin"] });
export const myFont10 = Oranienbaum({ variable: "--font-oranienbaum", subsets: ["latin"], weight: "400" });
export const myFont11 = Noto_Serif_Display({ variable: "--font-noto-serif-display", subsets: ["latin"] });
export const myFont12 = Lato({ variable: "--font-lato", subsets: ["latin"], weight: "400" });


// Gabungkan jadi satu string untuk class body
export const fontVariables = [
    myFont1.variable,
    myFont2.variable,
    myFont3.variable,
    myFont4.variable,
    myFont5.variable,
    myFont6.variable,
    myFont7.variable,
    myFont8.variable,
    myFont9.variable,
    myFont10.variable,
    myFont11.variable,
    myFont12.variable,
]
    .filter(Boolean)
    .join(" ");
