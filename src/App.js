import React, { useState } from 'react'
import { useEffect } from 'react';
import SingleCard from './singleCard';




const cardImages = [
  {"src":"/img/bmw.jpeg", matched: false},
  {"src":"/img/lambo.jpeg", matched: false},
  {"src":"/img/toyota.jpeg", matched: false},
  {"src":"/img/benz.jpeg", matched: false},
  {"src":"/img/rollsroyce.jpeg", matched: false},
  {"src":"/img/tesla.jpeg", matched: false}
]


const App = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] =useState(0);
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false)

const shuffleCards = () =>{
  const shuffledCards = [...cardImages, ...cardImages]
  .sort(() => Math.random() -0.5)
  .map(card => ({...card, id: Math.random()}))

  setChoiceOne(null)
  setChoiceTwo(null)
  setCards(shuffledCards)
  setTurns(0);
}

const handleChoice = (card) =>{
 choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
}

const resetTurn = () =>{
  setChoiceOne(null)
  setChoiceTwo(null)
  setDisabled(false)
  setTurns(prevTurns => prevTurns +1) 
}

useEffect(() => {

  if(choiceOne && choiceTwo){
    setDisabled(true)
    if(choiceOne.src === choiceTwo.src){
     setCards(prevCards =>{
      return prevCards.map(card => {
        if(card.src === choiceOne.src){
          return {...card, matched:true}
        }else{
          return card
        }
      })
     })
      resetTurn();

    }else{
        setTimeout(() =>  resetTurn(), 1000)
    }
  }
},[choiceOne, choiceTwo])

useEffect(() =>{
  shuffleCards()
},[])



  return (
    <div className='app'>
      <header>
        <h1>LOGO MATCHING</h1>
        <button onClick={shuffleCards}>New Game</button>
      </header>

      <div className='card-grid'>
        {cards.map((card) =>(
          <div className="cards" key={card.id}>
           <SingleCard  
              card={card} 
              handleChoice ={handleChoice}
              flipped = {card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
           />
          </div>
        ))}
      </div>
      <div className='turn'>Turns: {turns}</div>
    </div>
  )
}

export default App