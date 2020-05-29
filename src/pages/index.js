import React, { useState } from "react"
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Layout from "../components/layout"
import SEO from "../components/seo";
import Card from "../components/card";
import shuffleIcon from "../images/shuffle2.png";
import cardBack from "../../static/1m.jpg";

function IndexPage(props) {
  const [shuffledTimes, setShuffle] = useState(0);
  let variables = {
    numCards: 10,
    cardAction: 1,
    messageAction: 1,
    finishCardAction: false,
    finishMessageAction: false,
    cards: null,
    movedCardNodes: [],
    cardsBlocked: false,
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

  const _restartVariables = () => {
    variables = {
      numCards: 5,
      cardAction: 1,
      messageAction: 1,
      finishCardAction: false,
      finishMessageAction: false,
      cards: null,
      movedCardNodes: [],
      cardsBlocked: false
    }
  }

  

  // TODO: Move cards to original position and then shuffle
  const onClickShuffle = () => {
    let timeToWait = 0;
    variables.cardsBlocked = true;
    if ((variables.cardAction > 1) || (variables.messageAction > 1)) {
      let cardNode;
      timeToWait = Math.max(...variables.movedCardNodes.map(elem => (parseFloat(elem.dataset.cardTransition))));
      for (cardNode of variables.movedCardNodes) {
        // Let's remember here the time that must take the card to come back to the original position :)
        cardNode.style.left = '0px';
      }
    }
    // We wait for the farthest card to arrive to the original position
    setTimeout(() => {
      if ((variables.cardAction > 1) || (variables.messageAction > 1)) {
        let cardNode;
        for (cardNode of variables.movedCardNodes) {
          cardNode.style.zIndex = 0;
          cardNode.style.transition = null;
          cardNode.dataset.cardState = null;
          cardNode.dataset.cardTransition = null;
          cardNode.firstElementChild.firstElementChild.src = cardBack;
        }
      }
      _restartVariables();
      setShuffle(shuffledTimes + 1);
      variables.cardsBlocked = false;
    }, timeToWait * 1000);
  }

  const applyTransitionGo = (cardNode, actionType, destination) => {
    const position = destination.getBoundingClientRect()
    const timeTransition = variables[actionType] * 1.4;
    cardNode.style.transition = `left ${timeTransition}s, box-shadow ${timeTransition / 2}s`;
    cardNode.style.left = position.left + 'px';
    cardNode.classList.add("card-transition-shadow")
    cardNode.dataset.cardState = 'moved';
    cardNode.dataset.cardTransition = timeTransition;
    cardNode.style.zIndex = variables[actionType];
    setTimeout(() => {
      cardNode.classList.remove("card-transition-shadow");
    }, (timeTransition / 2) * 1000);
    // I'm going to remember the nodes I've mode, so later I can put them back to the original position
    variables.movedCardNodes.push(cardNode);
    setTimeout(() => {
      cardNode.style.zIndex = 0;
    }, timeTransition * 1000)
  }


  // Call back passed to Card components, it's returned with a html node representing the touched card and the action, which is for
  // main card or message card
  const onCardClick = (cardNode, actionType) => {
    // actionType are supposed to be 'cardAction' or 'messageAction'
    const finishType = 'finish' + actionType.charAt(0).toUpperCase() + actionType.slice(1);
    if (!variables[finishType] === true && !variables.cardsBlocked) {
      let destination;
      if (actionType === 'cardAction') {
        destination = document.getElementById(`pos${variables.cardAction}`);
      } else if (actionType === 'messageAction') {
        destination = document.getElementById(`mes${variables.messageAction}`);
      }
      applyTransitionGo(cardNode, actionType, destination);
      // Need to wait for the transitino to take place
      if (variables[actionType] !== 3) {
        variables[actionType] = variables[actionType] + 1;
      } else {
        variables[finishType] = true;
      }
    }
  }
  
  let Cards = [], Messages = [];
  let i;
  for (i = 1; i <= variables.numCards; i++) {
    Cards.push(<Card key={i} img={`${i}.jpg`} onClick={onCardClick} variant="main" />)
    Messages.push(<Card key={i} img={`${i}m.jpg`} onClick={onCardClick} variant="message" />)
  }
  variables.cards = Cards;
  shuffle(Cards);
  shuffle(Messages);

  return (
    <Layout>
      <SEO title="Home" spacing={4} />
      <Grid container justify="center" alignItems="center" style={{'height': '100vh', 'width': '100%', padding: '1.5rem'}}>
        <Grid item xs={3}>
          <img onClick={onClickShuffle} className="icon" src={shuffleIcon} alt="shuffle cards" />
          <Box position="relative" className="card-position">
            { Cards }
          </Box>
          <Box position="relative" className="message-position">
            { Messages }
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box id="pos1" className="card-position" />
          <Box id="mes1" className="message-position" />
        </Grid>
        <Grid item xs={3}>
          <Box id="pos2" className="card-position" />
          <Box id="mes2" className="message-position" />
        </Grid>
        <Grid item xs={3}>
          <Box id="pos3" className="card-position" />
          <Box id="mes3" className="message-position" />
        </Grid>
      </Grid>
    </Layout>
  )
  
}
  

export default IndexPage
