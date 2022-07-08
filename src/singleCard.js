import './singleCard.css'

const SingleCard = ({card, handleChoice, flipped, disabled}) => {

const handleClick = () =>{
  if(!disabled){
    handleChoice(card)
  }
}


  return (
    <div className='cards'>
      <div className={flipped ? "flipped" : ""}>
        <img src={card.src} alt="card front" className='front' />
        <img 
           src="/img/cover.png"
           alt="card cover" 
           onClick={handleClick}
           className="cover"
        />
      </div>
    </div>
  )
}

export default SingleCard