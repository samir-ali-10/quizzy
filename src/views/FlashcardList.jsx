import React from 'react'
import Flashcard from './Flashcard'

export default function FlashcardList({ flashcards }) {
    return (
        <div className='flashcard_list'>
            {
                flashcards.map(flashcard => 
                        <Flashcard key={flashcard.id} flashcard={flashcard}/>
                    )
            }
        </div>
    )
}
