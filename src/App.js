import React from "react";
import OpenPage from "./OpenPage";
import Quiz from "./Quiz";

function App() {
    const [quiz, setQuiz] = React.useState(false)

    function startQuiz(){
        setQuiz((item) => !item)
    }

    return (
        <div className="App" style={{height: window.innerHeight}}>
            { quiz ? <Quiz /> : <OpenPage onClick = {startQuiz} /> }
        </div>
    );
}

export default App;