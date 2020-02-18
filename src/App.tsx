import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./router";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import { GlobalStyle, theme, AppContent } from "./style";
import { ThemeProvider } from "styled-components";
import { Layout } from "antd";
import { AppHeader } from "./components/Header/Header";
import { AppFooter } from "./components/Footer/Footer";
import "antd/dist/antd.css";

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql"
});

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <GlobalStyle />
          <Layout>
            <AppHeader />
            <AppContent>
              <Routes />
            </AppContent>
            <AppFooter />
          </Layout>
        </ApolloProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
