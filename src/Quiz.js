import React from "react";
import Question from "./Question";
import {nanoid} from "nanoid";
import Data from "./data"
import Confetti from 'react-confetti'

function Quiz() {
    //State to receive data from API
    // eslint-disable-next-line
    const [qnsData, setQnsData] = React.useState(
        Data.results.map((item) => {
            return {id: nanoid(), ...item}
        })
    ) 

    //State to check if the answers have already been checked or not
    const [checked, setChecked] = React.useState(false)

    //State to receive shuffled data from the State array containing API data
    const [shuffledQns, setShuffledQns] = React.useState(() => 
        qnsData.sort(() => 0.5 - Math.random()).slice(0, 5)
    )

    const [count, setCount] = React.useState(0)

    function checkAnswer(){
        setCount((prev) => prev + 1)
    }

    const qns = shuffledQns.map((item) => {
        return (
            <Question
                key ={item.id}
                {...item}
                checked = {checked}
                checkAnswer = {checkAnswer}
            />
        )
    })

    function startGame(){
      setShuffledQns(() => qnsData.sort(() => 0.5 - Math.random()).slice(0, 5))
      setChecked(false)
      setCount(0)
    }



    return (
      <div className="quiz">
          {qns}

          {
              !checked ?
              <button className="quiz--btn" onClick={() => setChecked(true)}>Check Answers</button> :
              <div className="footer">
                  <p className="score">You scored {count}/5 Correct {count > 1 ? `Answers` : `Answer`}</p>
                  <button className="quiz--btn start--btn" onClick={startGame}>Play Again</button>
              </div>  
          }

          {count === 5 && <Confetti />}
      </div>
    );
}

export default Quiz;