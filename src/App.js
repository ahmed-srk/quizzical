import React from "react";
import OpenPage from "./OpenPage";
import Quiz from "./Quiz";

function App() {
    const [quiz, setQuiz] = React.useState(false)

    const [data, setData] = React.useState()

    React.useEffect(() => {
      fetch("https://opentdb.com/api.php?amount=49&category=17&difficulty=easy&type=multiple")
          .then(res => res.json())
          .then(item => {
              setData(item.results)
          })
    }, [])

    function toggleQuiz(){
        setQuiz((item) => !item)
    }

    return (
        <div className="App" style={{height: window.innerHeight}}>
            { (quiz && data) ? <Quiz data = {data}  onClick = {toggleQuiz} /> : <OpenPage onClick = {toggleQuiz} /> }
            { (quiz && !data) && <p className="load--message">Loading...</p>}
        </div>
    );
}

export default App;