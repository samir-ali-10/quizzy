import { useEffect, useRef, useState } from 'react';
import './App.css';
import FlashcardList from './views/FlashcardList';
import axios from 'axios';


function App() {

  const [flashcard, setFlashcard] = useState([]),
    [categories, setCategories] = useState([]);

  const categoryEl = useRef(),
    amountEl = useRef();

  useEffect(() => {
    axios.get(`https://opentdb.com/api_category.php`).then(res => {
      setCategories(res.data.trivia_categories);
    })
  }, [])

  let decodeString = (str) => {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value;
  }

  let handleSubmit = (e) => {
    e.preventDefault();
    axios.get(`https://opentdb.com/api.php`, {
      params: {
        amount: amountEl.current.value,
        category: categoryEl.current.value
      }
    })
      .then(res => {
        setFlashcard(res.data.results.map((questionItem, index) => {
          const answer = decodeString(questionItem.correct_answer);
          const options = [...questionItem.incorrect_answers.map(a => decodeString(a)), answer]
          return {
            id: `${index} - ${Date.now()}`,
            question: decodeString(questionItem.question),
            answer: answer,
            options: options.sort(() => Math.random() - .5)
          }
        }))
      })
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div className='controls'>
          <div className='form_group'>
            <label htmlFor='category'>Category</label>
            <select id='category' ref={categoryEl}>
              {
                categories.map(category =>
                  <option key={category.id} value={category.id}>{category.name}</option>
                )
              }
            </select>
          </div>
          <div className='form_group'>
            <label htmlFor='amount'>Number of Questions</label>
            <input id='amount' type='number' min="1" step="1" defaultValue={10} ref={amountEl}></input>
          </div>
        </div>
        <div className='form_group'>
          <button className='btn'>Generate</button>
        </div>
      </form>
      <div className='container'>
        <FlashcardList flashcards={flashcard} />
      </div>
    </div>
  );
}

export default App;
