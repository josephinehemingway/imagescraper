import { Button } from 'antd';
import 'antd/dist/antd.css';
import styled from 'styled-components';

// const BUTTON_STYLES_MAP = {
//   primary: `
//     background-color: #274169;
//     color: white;`,
//   alt: `
//     background-color: #8BBAD8;
//     color: white;`,
// }

export const UtilityButton = styled(Button)`
  && {
    border-radius: 5px;
    font-size: 16px;  
    text-align: center;
    display-inline-block;
    width: ${(props) => (props.width ? props.width : '10vw')};
    min-width: 150px;
    max-width: 180px;
    height: 40px;
    margin-left: 10px;

  }
`
//    // ${(props) => BUTTON_STYLES_MAP[props.type]}

