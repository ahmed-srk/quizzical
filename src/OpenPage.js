import React from "react";

function OpenPage(props) {
  return (
    <div className="open--page">
        <h1 className="open--page--title">Quizzical</h1>
        <h3 className="open--page--sub">Click the button to attempt the Questions.</h3>
        <button className="open--page--btn" onClick={props.onClick}>Start Quiz</button>
    </div>
  );
}

export default OpenPage;
