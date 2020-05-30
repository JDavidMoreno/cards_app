import React from "react"
import Box from '@material-ui/core/Box';
import "./card.css";
import cardBack from "../../static/1m.jpg";

function Card(props) {

  const get_rotation = () => {
    const num = Math.random() * 10;
    return (parseInt(num) % 2 === 0 ? '+' : '-') + num.toString();
  }

  const cardAction = (event) => {
      let card = document.getElementById(props.img)
      props.onCardClick(card, (props.variant === 'main' ? 'cardAction' : 'messageAction'));
      // if (card.dataset.cardState !== 'moved' && card.dataset.cardState !== 'flipped') {
        
      // } else if (card.dataset.cardState === 'moved') {

      // }
  }

  const styles = {
    transform: `rotate(${get_rotation()}deg)`
  }
  
  return (
        <Box id={props.img} draggable="true" onClick={cardAction} className={'card ' + (props.variant === 'main' ? 'card-main' : 'card-message')} style={styles} >
          <Box className="card-inner">
            <img className="card-image" src={cardBack} style={{ width: '100%', height: '100%'}} alt="test" />
            <Box className="card_filter" />
          </Box> 
        </Box>
    );
  }

export default Card;