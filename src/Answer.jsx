import React,{useRef,useEffect} from 'react'

export default function Answer(props) {
    const ansRef = useRef(null)
    const pRef = useRef(null)

    useEffect(() => {
        ansRef.current.style.backgroundColor= "transparent"
    },[props.questionIndex])

    function checkAnswer () {
        if(!props.answered) {
            if(props.content === props.answer) {
                ansRef.current.style.backgroundColor = "#46c263"
                props.addCorrectAnswer()
            }
            else {
                ansRef.current.style.backgroundColor = "#e33437"
            }
            props.toggleAnswered()
        }
    }

    if(props.answered && props.content === props.answer) {
        ansRef.current.style.backgroundColor = "#46c263"
    }
    useEffect(() => {
        pRef.current.innerHTML = props.content
    })

    return (
        <div className="border-2 border-white rounded-md hover:cursor-pointer" onClick={checkAnswer} ref={ansRef}>
            <p className="text-white py-4 pl-2" ref={pRef}></p>
        </div>
    )
}