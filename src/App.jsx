import './App.css'
import InitialPage from './InitialPage'
import Questions from './Questions'
import FinalPage from './FinalPage'
import {React,useEffect,useState} from 'react'

export default function App() {
  const [page,setPage] = useState("")
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [cat, setCat] = useState({})
  const [apiUrl,setApiUrl] = useState("")
  const [error,setError] = useState(null)
  const [loading,setLoading] = useState(true)
  


  useEffect(() => {
    fetch('https://opentdb.com/api_category.php')
    .then(res => {
    if(!res.ok) {
      throw Error("Oops! Network error, try again please")
    }
      return res.json()
    })
    .then(data => setCat(data))
    .then(() => setPage("InitialPage"))
    .then(() => setLoading(false))
    .catch(err => setError(err))
  },[])

  function startQuiz(category,difficulty) {
    setPage("Questions")
    setApiUrl(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}`)
  }

  function addCorrectAnswer(){
    setCorrectAnswers(prev => prev + 1)
  }

  function startAgain(){
    setPage('InitialPage')
  }



  return (
    <>
    {error || loading &&
    <>
    <div className="flex flex-col justify-center h-screen">
      <div className="m-4 p-4 border-2 rounded-xl border-white md:max-w-md md:m-auto">
        <div className="text-center p-2">
          <h1 className="text-white text-2xl">{error ?  `${error}` : 'Loading...' }</h1>
        </div>
      </div> 
    </div>
    </>
    }
    
    {page==="InitialPage" && <InitialPage startQuiz={startQuiz} cat={cat} />}
    {page==="Questions" && <Questions endQuiz={()=> setPage("FinalPage")} apiUrl={apiUrl} startAgain={startAgain} addCorrectAnswer={addCorrectAnswer}/>}
    {page==="FinalPage" && <FinalPage correctAnswers={correctAnswers} startAgain={startAgain}/>}
    </>
  )
}

