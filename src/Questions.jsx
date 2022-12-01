import React, {useRef,useEffect, useState} from 'react'
import Answer from './Answer.jsx'

export default function Questions(props) {
    const h4ref = useRef(null)
    const [questionIndex, setQuestionIndex] = useState(0)
    const [data, setData] = useState({})
    const [answersArr, setAnswersArr] = useState([])
    const [answered, setAnswered] = useState(false)
    const [error, setError] = useState(null)
    const [loading,setLoading] = useState(true)
    let quest
    
    const shuffleArray = arr => {
        for(let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            const temp = arr[i]
            arr[i] = arr[j]
            arr[j] = temp
        }

        return arr
    }

    useEffect(() => {
        async function fetchQuestions() {
            try {

                const res = await fetch(props.apiUrl)
                const questionsFetch = await res.json()
                if(questionsFetch.response_code == 1) {
                    throw Error("Oops! There are not enough questions for your query")
                }
                setData(questionsFetch)
                setLoading(false)
            }
            catch(err) {setError(err)}
        }
        fetchQuestions()
    },[])

    useEffect(() => {
        if(questionIndex > 0) {
            const orderedAnswers = [...data.results[questionIndex].incorrect_answers,data.results[questionIndex].correct_answer]
            const shuffledAnswers = shuffleArray(orderedAnswers)
            setAnswersArr(shuffledAnswers)
        }
    },[questionIndex])

    
    if(Object.keys(data).length !== 0 ) {
        quest = data.results[questionIndex].question
        const title = h4ref.current
        title.innerHTML = quest
        if(answersArr.length == 0) {
            const orderedAnswers = [...data.results[questionIndex].incorrect_answers,data.results[questionIndex].correct_answer]
            const shuffledAnswers = shuffleArray(orderedAnswers)
            setAnswersArr(shuffledAnswers)
        }
        
    }

    function increaseIndex(){
        questionIndex >= (data.results.length-1) ? props.endQuiz() : setQuestionIndex(prev => prev + 1)
    }

    function toggleAnswered() {
       setAnswered(true);
    }

    function handleNext() {
        if(answered) {
            setAnswered(false)
            increaseIndex()
        }
    }

    return (
        <div className="flex flex-col justify-center h-screen">
            <div className="m-4 p-4 border-2 rounded-xl border-white md:max-w-md md:m-auto">
                {error && 
                <>
                <h4 className="text-white text-2xl text-center">{`${error}`}</h4>
                <div className='text-center mt-6'>
                    <button className='bg-color1 text-white text-2xl pt-2 pb-3 px-10 rounded-lg border-2' onClick={props.startAgain}>Go Back</button>
                </div>
                </>
                }
                {loading && <h4 className="text-white text-2xl text-center mt-6 px-12">Loading...</h4>}
                {!error &&
                <>
                <div className="text-center p-2">
                    <h4 className="text-white text-2xl" id="question-h4" ref={h4ref}></h4>
                </div>
                <div className="m-4 p-2 flex flex-col space-y-4 text-center">
                    {Object.keys(data).length !== 0 && answersArr.map(answer =>
                    <Answer
                    key={answer}
                    content={answer}
                    answer={data.results[questionIndex].correct_answer}
                    answered={answered}
                    questionIndex={questionIndex}
                    toggleAnswered={toggleAnswered}
                    addCorrectAnswer={props.addCorrectAnswer}
                    />
                    )}
                </div>
                <div className='text-center'>
                    {!loading && <button className='bg-color1 text-white text-2xl pt-2 pb-3 px-10 rounded-lg border-2' onClick={handleNext}>Next</button>}
                </div>
                </>
                }
            </div>
        </div>
    )
}

