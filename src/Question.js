import React from "react";
import {nanoid} from "nanoid"

function Question(props) {
    const [ansOptions, setAnsOptions] = React.useState(() => {
        const answers = props.incorrect_answers.map((value) => {
            return {id:nanoid(), answer: value, isCorrect: false, selected: false}
        })

        answers.push({id:nanoid(), answer: props.correct_answer, isCorrect:true, selected: false})

        answers.sort(() => 0.5 - Math.random());
        return answers
    })

    React.useEffect(() => {
        if(!props.checked){
            ansOptions.sort(() => 0.5 - Math.random());
            setAnsOptions((prev) => {
                return prev.map((item) => {
                    return {...item, selected: false}
                })
            })
        }

        if(props.checked){
            for(let i = 0; i < 4; i++){
                if(ansOptions[i].selected && ansOptions[i].isCorrect){
                    props.checkAnswer()
                    break
                }
            }
        }

        // eslint-disable-next-line
    }, [props.checked])

    function toggleSelected(id){
        setAnsOptions((prev) => {
            return prev.map((item) => {
                if(item.id === id){
                    return {...item, selected: !item.selected}
                } else{
                    if(item.selected){
                        return {...item, selected: !item.selected}
                    } else{
                        return item
                    }
                }
            })
        })
    }

    const styleSelected = {
        backgroundColor: "rgba(128, 128, 128, 1.0)",
        color: "white",
        borderStyle: "none"
    }

    const styleCorrectAns = {
        backgroundColor: "rgba(0, 180, 0, 0.7)",
        color: "rgba(0, 0, 0, 1.0)",
        borderStyle: "none"
    }

    const styleNotCorrectAns = {
        backgroundColor: "rgba(180, 0, 0, 0.5)",
        color: "rgba(0, 0, 0, 0.5)",
        borderStyle: "none"
    }

    return (
        <div className="question">
            <p className="question--title">{props.question}</p>
            {
                ansOptions.map((item) => {
                    if(!props.checked){
                        return (
                            <button key = {item.id} className="question--btn" 
                                onClick={() => {toggleSelected(item.id)}}
                                style={item.selected ? styleSelected : {}}
                            >
                                {item.answer}
                            </button>
                        )
                    }else{
                        if(item.selected || item.isCorrect){
                            return (
                                <button key = {item.id} className="question--btn"
                                        style={item.isCorrect ? styleCorrectAns : styleNotCorrectAns}
                                >
                                    {item.answer}
                                </button>
                            )
                        }else{
                            return (
                                <button key = {item.id} className="question--btn">
                                    {item.answer}
                                </button>
                            )
                        }
                    }
                })
            }
        </div>
    );
}

export default Question;