import React from 'react'

export default function FinalPage(props) {

    function startAgain() {
        props.startAgain()
    }

    return (
        <div className="flex flex-col justify-center h-screen">
            <div className="m-4 p-4 border-2 rounded-xl border-white md:max-w-md md:m-auto md: px-16">
                <div className="text-center p-2">
                    <h4 className="text-white text-2xl">You got {props.correctAnswers} correct answers</h4>
                </div>
                <div className='text-center mb-4 mt-6'>
                    <button className='bg-color1 text-white text-2xl pt-2 pb-3 px-10 rounded-lg border-2' onClick={startAgain}>Play Again</button>
                </div>

                
            </div>
        </div>
    )
}