import App from "next/app";
import Head from "next/head";
import Script from 'next/script'
import "../assets/scss/style.scss";
import { createContext } from "react";
import { getStrapiMedia } from "../lib/media";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

//Start Apollo client
const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_STRAPI_API_URL ? process.env.NEXT_PUBLIC_STRAPI_API_URL + '/graphql' : "http://localhost:1337/graphql",
  cache: new InMemoryCache()
});

// Store Strapi Global object in context
export const GlobalContext = createContext({});

const MyApp = ({ Component, pageProps }) => {
  const { global } = pageProps;

  return (
    <>
      <Head>
        {/* <link rel="shortcut icon" href={getStrapiMedia(global.data.attributes.Favicon)} /> */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/uikit@3.2.3/dist/css/uikit.min.css"
        />
      </Head>
      
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.2.0/js/uikit.min.js" />
      <Script src="https://cdn.jsdelivr.net/npm/uikit@3.2.3/dist/js/uikit-icons.min.js" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.2.0/js/uikit.js" />

      <GlobalContext.Provider value={global}>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </GlobalContext.Provider>
    </>
  );
};

export default MyApp;