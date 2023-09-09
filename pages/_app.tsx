import Head from "next/head";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/components/organisms/Header";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>都道府県別人口推移グラフ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Component {...pageProps} />
    </>
  );
}
