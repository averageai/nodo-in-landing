import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return <>
    {/* Forzar a Tailwind a incluir animate-fade-in */}
    <div className="hidden animate-fade-in"></div>
    <Component {...pageProps} />
  </>;
}
