import React from "react"
import Box from '@material-ui/core/Box';
import "./card.css";

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  get_rotation() {
    const num = Math.random() * 10;
    return (parseInt(num) % 2 === 0 ? '+' : '-') + num.toString();
  }

  moveCard = (event) => {
      document.getElementById(this.props.img).style.top = '24rem';
  }

  render() {
    const styles = {
      transform: `rotate(${this.get_rotation()}deg)`,
      backgroundImage: `url('${this.props.img}')`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
    }
    return (
        <Box position="relative">
          <Box id={this.props.img} position="absolute" onClick={this.moveCard} className="card" borderRadius="0.5rem" boxShadow={3} style={styles} />
        </Box>
      );
    } 
  }

export default Card;