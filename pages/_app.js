import "../styles/globals.css";
import { ModalContextProvider } from "../src/context/ModalContext.js";

function MyApp({ Component, pageProps }) {
  return (
    <ModalContextProvider>
      <Component {...pageProps} />
    </ModalContextProvider>
  );
}

export default MyApp;
