import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
  }

  html {
    font-size: 60%;
  }

  body {
    color: ${({ theme }) => theme.colors.primary};
  }

  body, input, button, textarea {
    font-size: 1.6rem;
  }

  a {
    text-decoration: none;
  }
`;
