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
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  .container {
    font-family: Poppins, Arial, Helvetica, sans-serif;
    padding: 20px;
    width: 600px;
    border-radius: 10px;
  }
  .container h3 {
    font-size: 19px;
    margin-bottom: 5px;
    font-weight: 500;
    font-style: oblique;
  }
  .container h3::before {
    content: open-quote;
    font-size: 25px;
  }
  .container h3::after {
    content: close-quote;
    vertical-align: sub;
    font-size: 25px;
  }
  .container p {
    font-style: italic;
    padding: 5px;
    text-align: right;
  }
  .container h3 span {
    display: block;
  }
  ${themeStyles}
`;

export const renderHorizontal = ({ kural, chapter, color, border }: Props) => {
  const themeStyles = getThemeStyles(color, border);
  const containerStyles = getContainerStyles(themeStyles);

  return `
    <svg width="600" height="180" viewBox="0 0 600 180" fill="none" xmlns="http://www.w3.org/2000/svg">
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
