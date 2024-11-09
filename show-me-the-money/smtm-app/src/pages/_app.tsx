import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CssVarsProvider defaultMode="dark" modeStorageKey="joy-mode-scheme-dark">
      <CssBaseline />
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </CssVarsProvider>
  );
}
