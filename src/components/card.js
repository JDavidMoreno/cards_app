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
    props.onCardClick(document.getElementById(props.img), (props.variant === 'main' ? 'cardAction' : 'messageAction'));
  }

  const styles = {
    transform: `rotate(${get_rotation()}deg)`
  }
  
  return (
        <Box id={props.img} draggable="true" onClick={cardAction} className={'card ' + (props.variant === 'main' ? 'card-main' : 'card-message')} style={styles} >
          <Box className="card-inner">
            <img className="card-image" src={cardBack} alt="A Granatovych Card" />
            <Box className="card_filter" />
          </Box> 
        </Box>
    );
  }

export default Card;