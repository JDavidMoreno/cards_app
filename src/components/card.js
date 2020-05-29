import React from "react"
import Box from '@material-ui/core/Box';
import "./card.css";
import cardBack from "../../static/1m.jpg";

function Card(props) {

  const get_rotation = () => {
    const num = Math.random() * 10;
    return (parseInt(num) % 2 === 0 ? '+' : '-') + num.toString();
  }

  const moveCard = (event) => {
      let card = document.getElementById(props.img)
      if (card.dataset.cardState !== 'moved' && card.dataset.cardState !== 'flipped') {
        props.onClick(card, (props.variant === 'main' ? 'cardAction' : 'messageAction'));
      } else if (card.dataset.cardState === 'moved') {
        // Turn oon the card
        const cardOriginalWidth = card.offsetWidth;
        card.firstElementChild.style.width = 0;
        card.firstElementChild.children[1].style.opacity = 1;
        console.log(card.firstElementChild)
        card.firstElementChild.classList.add('card-transition-flip');
        setTimeout(() => {
          card.firstElementChild.classList.remove('card-transition-flip');
          card.firstElementChild.firstElementChild.src = props.img;
          card.firstElementChild.style.width = cardOriginalWidth + 'px';
          card.firstElementChild.children[1].style.opacity = 0;
        }, 0.4 * 1000);
        card.dataset.cardState = 'flipped';
      }
  }

  const styles = {
    transform: `rotate(${get_rotation()}deg)`
  }
  
  return (

        <Box id={props.img} draggable="true" onClick={moveCard} className={'card ' + (props.variant === 'main' ? 'card-main' : 'card-message')} style={styles} >
          <Box className="card-inner">
            <img className="card-image" src={cardBack} style={{ width: '100%', height: '100%'}} alt="test" />
            <Box className="card_filter" />
          </Box> 
        </Box>
    );
  }

export default Card;