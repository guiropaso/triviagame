import React, { useRef } from 'react'

export default function initialPage(props) {
    const catRef = useRef(null)
    const difRef = useRef(null)

    function startQuiz() {
        const chosenCat = catRef.current.value
        const chosenDif = difRef.current.value
        props.startQuiz(chosenCat,chosenDif)
    }


    return(
        <div className="flex flex-col justify-center h-screen">
            <div className="m-4 p-4 border-2 rounded-xl border-white md:max-w-md md:m-auto">
                <div className="text-center p-2">
                    <h1 className="text-white text-5xl">Trivia Game</h1>
                </div>
                <div className="p-2 flex flex-col">
                    <label htmlFor="" className="mt-4 mb-2 text-white font-bold">Categories</label>
                    <select name="cat" ref={catRef} id="1" className="py-2 hover:cursor-pointer text-zinc-800 outline-none pl-2 rounded-md">
                        {props.cat.trivia_categories.map(cat => <option className="text-lg" key={cat.id} value={cat.id} >{cat.name}</option>)}
                    </select>
                    <label htmlFor="" className="mt-8 mb-2 text-white font-bold" >Difficulty</label>
                    <select name="cat" ref={difRef} id="1" className="py-2 hover:cursor-pointer text-zinc-800 outline-none pl-2 rounded-md">
                        <option value="easy" className="text-lg">Easy</option>
                        <option value="medium" className="text-lg">Medium</option>
                        <option value="hard" className="text-lg">Hard</option>
                    </select>
                    <div className="text-center mt-8">
                        <button className="bg-color1 text-white text-2xl pt-2 pb-3 px-10 rounded-lg border-2" onClick={startQuiz}>Start</button>
                    </div>
                </div>
            </div>
        </div>
    )
}