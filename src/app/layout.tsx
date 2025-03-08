  "use client";
  import { ReactNode } from "react";
  import { createGlobalStyle, ThemeProvider } from "styled-components";
  import Navigation from "../components/Navigation";
  import styled from "styled-components";

  const GlobalStyle = createGlobalStyle`
    body {
      margin: 0;
      font-family: Arial, sans-serif;
      background-color: #f9f9f9;
    }
  `;

  const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh; 
    overflow: hidden;
  `;

  const Content = styled.main`
    flex: 1; 
    overflow-y: auto; 
    padding-bottom: 70px;
  `;

  type LayoutProps = {
    children: ReactNode;
  };

  export default function Layout({ children }: LayoutProps) {
    return (
      <html lang="en">
        <head>
          <title>SnapFlow</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body>
        <ThemeProvider theme={{}}>
            <GlobalStyle />
            <PageContainer>
              <Content>{children}</Content>
            </PageContainer>
            <Navigation />
          </ThemeProvider>
        </body>
      </html>
    );
  }
