import Container from "@/components/Container";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/lib/ThemeContext";
import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Head>
        <title>판다마켓</title>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Header />
      <Container>
        <Component {...pageProps} />
      </Container>
      <Footer />
    </ThemeProvider>
  );
}
