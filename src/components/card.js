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
      if (card.dataset.cardState !== 'done') {
        props.onClick(card, (props.variant === 'main' ? 'cardAction' : 'messageAction'));
      } else {
        const cardChild = card.firstElementChild;
        // Turn oon the card
        const cardOriginalWidth = cardChild.offsetWidth;
        cardChild.firstElementChild.style.transition = cardChild.style.transition;
        cardChild.firstElementChild.style.width = 0;

        setTimeout(() => {
          cardChild.firstElementChild.src = props.img;
          cardChild.firstElementChild.style.width = cardOriginalWidth + 'px';
        }, parseFloat(card.dataset.cardTransition) * 1000);
      }
  }

  const styles = {
    transform: `rotate(${get_rotation()}deg)`,
    // backgroundImage: `url('${props.img}')`
  }
  return (
      <Box id={props.img} className="card-container">
        <Box draggable="true" onClick={moveCard} boxShadow={3} className={'card ' + (props.variant === 'main' ? 'card-main' : 'card-message')} style={styles} >
          <img className="card-image" src={cardBack} style={{ width: '100%', height: '100%'}} alt="test" />
        </Box>
      </Box>
    );
  }

export default Card;