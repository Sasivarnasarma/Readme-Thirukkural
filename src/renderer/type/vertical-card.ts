import { poppinsFontSVG } from "../constants.js";
import { getThemeStyles, type Theme } from "../theme/awesome-card.js";

interface Props {
  kural: string;
  chapter: string;
  color: Theme;
  border: boolean;
}

const getContainerStyles = (themeStyles: string) => `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .container {
    width: 300px;
    height: 300px;
    font-family: Poppins, Arial, Helvetica, sans-serif;
    padding: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-radius: 10px;
  }
  .container h3::before {
    content: open-quote;
    font-size: 50px;
    display: block;
    margin-bottom: -20px;
  }
  .container h3::after {
    content: close-quote;
    font-size: 50px;
    display: block;
    margin-bottom: -20px;
  }
  .container h3 {
    margin-bottom: 15px;
  }
  .container p {
    font-style: italic;
  }
  .container h3 span {
    display: block;
  }
  ${themeStyles}
`;

export const renderVertical = ({ kural, chapter, color, border }: Props) => {
  const themeStyles = getThemeStyles(color, border);
  const containerStyles = getContainerStyles(themeStyles);

  return `
    <svg width="300" height="300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml">
          ${poppinsFontSVG}
          <style>
            ${containerStyles}
          </style>
          <div class="container">
            <h3>${kural}</h3>
            <p>- ${chapter}</p>
          </div>
        </div>
      </foreignObject>
    </svg>
  `;
};
