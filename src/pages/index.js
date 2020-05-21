import React, { useState } from "react"
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Layout from "../components/layout"
import SEO from "../components/seo";
import Card from "../components/card";
import shuffleIcon from "../images/shuffle2.png";

function IndexPage(props) {
  const [shuffledTimes, setShuffle] = useState(0);
  let variables = {
    numCards: 5,
    position: 1,
    finish: false,
    cards: null,
  }
  
  const shuffle = (a) => {
      var j, x, i;
      for (i = a.length - 1; i > 0; i--) {
          j = Math.floor(Math.random() * (i + 1));
          x = a[i];
          a[i] = a[j];
          a[j] = x;
      }
      return a;
  }

  // TODO: Move cards to original position and then shuffle
  const onClickShuffle = () => {
    setShuffle(shuffledTimes + 1)
  }

  const onCardClick = (cardNode) => {
    if (!variables.finish === true) {
      const destination = document.getElementById(`pos${variables.position}`);
      const position = destination.getBoundingClientRect()
      const timeTransition = variables.position * 1.5;
      cardNode.style.zIndex = 1;
      cardNode.style.transition = `left ${timeTransition}s`;
      cardNode.style.left = position.left + 'px';
      setTimeout(() => {
        cardNode.style.zIndex = 0;
      }, timeTransition * 1000)
      // Need to wait for the transitino to take place
      if ( variables.position !== 3) {
        variables.position = variables.position + 1;
      } else {
        variables.finish= true;
      }
    }
  }

  let Cards = [];
  let i;
  for (i = 1; i <= variables.numCards; i++) {
    Cards.push(<Card key={i} img={`${i}.jpg`} onClick={onCardClick}/>)
  }
  variables.cards = Cards;
  shuffle(Cards);

  return (
    <Layout>
      <SEO title="Home" spacing={4} />
      <Grid container justify="center" alignItems="center" style={{'height': '100vh', 'width': '100%', padding: '1.5rem'}}>
        <Grid item xs={3} className="card-position">
          <img onClick={onClickShuffle} className="icon" src={shuffleIcon} alt="shuffle cards" />
          { Cards }
        </Grid>
        <Grid item xs={3}>
          <Box id="pos1" className="card-position" />
        </Grid>
        <Grid item xs={3}>
          <Box id="pos2" className="card-position" />
        </Grid>
        <Grid item xs={3}>
          <Box id="pos3" className="card-position" />
        </Grid>
      </Grid>
    </Layout>
  )
  
}
  

export default IndexPage
