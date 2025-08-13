import "@/styles/globals.css";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Forzar modo oscuro
    document.documentElement.classList.add('dark');
    document.documentElement.style.colorScheme = 'dark';
  }, []);

  return <>
    {/* Forzar a Tailwind a incluir animate-fade-in */}
    <div className="hidden animate-fade-in"></div>
    <Component {...pageProps} />
  </>;
}
