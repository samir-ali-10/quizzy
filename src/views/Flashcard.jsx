import React, { useEffect, useRef, useState } from 'react'

export default function Flashcard({ flashcard }) {

    const [flip, setFlip] = useState(false),
        [height, setHeight] = useState("initial");

    const frontEl = useRef();
    const backEl = useRef();

    let setMaxHeight = () => {
        const frontHeight = frontEl.current.getBoundingClientRect().height
        const backHeight = backEl.current.getBoundingClientRect().height
        setHeight(Math.max(frontHeight, backHeight, 100));
    }

    useEffect(() => {
        setMaxHeight();
    },[flashcard.question, flashcard.answer, flashcard.options])

    useEffect(() => {
        window.addEventListener("resize", setMaxHeight);
        return (
            window.removeEventListener("resize", setMaxHeight)
        )
    },[])

    return (
        <div className={`card ${flip ? "flip" : ""}`} style={{height: height}} onClick={() => setFlip(!flip)}>
            <div className="front" ref={frontEl}>
                <div className="card_question">{flashcard.question}</div>
                <div className="card_options">
                    {
                        flashcard.options.map(option =>
                            <div className="option" key={option}>{option}</div>
                        )
                    }
                </div>
            </div>
            <div className="back" ref={backEl}>
                {flashcard.answer}
            </div>
        </div>
    )
}
