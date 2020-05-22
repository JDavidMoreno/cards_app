import React from "react"
import Box from '@material-ui/core/Box';
import "./card.css";

function Card(props) {

  const get_rotation = () => {
    const num = Math.random() * 10;
    return (parseInt(num) % 2 === 0 ? '+' : '-') + num.toString();
  }

  const moveCard = (event) => {
      let card = document.getElementById(props.img)
      if (card.dataset.cardState !== 'done') {
        props.onClick(card, (props.variant === 'main' ? 'cardAction' : 'messageAction'));
      }
  }

  const styles = {
    transform: `rotate(${get_rotation()}deg)`,
    backgroundImage: `url('${props.img}')`
  }
  return (
      <Box id={props.img} className="card-container">
        <Box draggable="true" onClick={moveCard} boxShadow={3} className={'card ' + (props.variant === 'main' ? 'card-main' : 'card-message')} style={styles} />
      </Box>
    );
  }

export default Card;