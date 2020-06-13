import React from "react";

// 原：
// function FancyButton (props) {
//     return (
//         <button className="FancyButton">
//           {props.children}
//         </button>
//       );
// }

// 使用refs转发
const FancyButton = React.forwardRef((props, ref) => (
    <button ref={ref} className="FancyButton" onClick={props.handleClick}>
        {props.children}
    </button>
));


export default FancyButton;