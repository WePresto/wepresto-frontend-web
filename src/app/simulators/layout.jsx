export const metadata = {
  title: "WePresto - Simula tu préstamo",
  description:
    "La plataforma de préstamos colaborativos que ofrece las mejores tasas del mercado. Pide prestado y paga a una tasa de interés baja. Invierte y obtén una rentabilidad por tu dinero mes a mes.",
  themeColor: "#fff",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    url: "https://wepresto.com/",
    title: "WePresto - Simula tu préstamo",
    description:
      "La plataforma de préstamos colaborativos que ofrece las mejores tasas del mercado. Pide prestado y paga a una tasa de interés baja. Invierte y obtén una rentabilidad por tu dinero mes a mes.",
    images: [
      {
        url: "https://wepresto.com/banner_meta.png",
        width: 1200,
        height: 630,
        alt: "WePresto - Simula tu préstamo",
      },
    ],
  },
  twitter: {
    title: "WePresto - Simula tu préstamo",
    description:
      "La plataforma de préstamos colaborativos que ofrece las mejores tasas del mercado. Pide prestado y paga a una tasa de interés baja. Invierte y obtén una rentabilidad por tu dinero mes a mes.",
    images: ["https://wepresto.com/banner_meta.png"],
  },
  
};

export default function SimulatorLayout({ children }) {
  return children;
}
