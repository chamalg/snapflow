"use client";
import { ReactNode } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import Navigation from "../components/Navigation";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: Arial, sans-serif;
    background-color: #f9f9f9;
  }
`;

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <head>
        <title>SnapFlow App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <ThemeProvider theme={{}}>
          <GlobalStyle />
          <main>{children}</main>
          <Navigation />
        </ThemeProvider>
      </body>
    </html>
  );
}
