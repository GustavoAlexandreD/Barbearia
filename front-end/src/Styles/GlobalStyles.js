import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: "Georgia", serif;
    background: #0d1b2a;
    color: #fff;
  }

  h1, h2, h3, h4, h5 {
    font-family: "Georgia", serif;
    font-weight: bold;
  }

  p {
    font-size: 14px;
    line-height: 1.6;
  }
`;