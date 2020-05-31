import React, { useState } from "react"
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Layout from "../components/layout";
import Table from "../components/table";
import Info from "../components/info";
import SEO from "../components/seo";
import Card from "../components/card";
import cardBack from "../../static/1m.jpg";
import ExpandMoreRounded from '@material-ui/icons/ExpandMoreRounded';
import RefreshRounded from '@material-ui/icons/RefreshRounded';

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
      cardsBlocked: false,
      isVerticalScreen: false,
    }
  }

  // Moves the cards to their original position and then shuffle the deck
  const onClickShuffle = () => {
    let timeToWait = 0;
    variables.cardsBlocked = true;
    if ((variables.cardAction > 1) || (variables.messageAction > 1)) {
      let cardNode;
      // Take the transion time for the farthest card at right
      timeToWait = Math.max(...variables.movedCardNodes.map(elem => (parseFloat(elem.dataset.cardTransition))));
      for (cardNode of variables.movedCardNodes) {
        cardNode.style.left = '0px';
      }
    }
    // We wait for the farthest card to arrive to the original position
    setTimeout(() => {
      if ((variables.cardAction > 1) || (variables.messageAction > 1)) {
        let cardNode;
        // Restart the values for those moved cards
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

  // This function moves the card to one of the three possitions in the grid
  const moveCard = (cardNode, actionType, destination) => {
    const position = destination.getBoundingClientRect()
    const timeTransition = variables[actionType] * 1.4;
    cardNode.style.transition = `left ${timeTransition}s , box-shadow ${timeTransition / 2}s`;
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

  const flipCard = (card) => {
    const cardOriginalWidth = card.offsetWidth;
    card.firstElementChild.style.width = 0;
    card.firstElementChild.children[1].style.opacity = 1;
    card.firstElementChild.classList.add('card-transition-flip');
    setTimeout(() => {
      card.firstElementChild.classList.remove('card-transition-flip');
      card.firstElementChild.firstElementChild.src = card.id;
      card.firstElementChild.style.width = cardOriginalWidth + 'px';
      card.firstElementChild.children[1].style.opacity = 0;
    }, 0.4 * 1000);
    card.dataset.cardState = 'flipped';
  }

  // Call back passed to Card components, it's returned with a html node representing the touched card and the action, which is for
  // main card or message card
  const onCardClick = (card, actionType) => {
    // actionType are 'cardAction' or 'messageAction'
    const finishType = 'finish' + actionType.charAt(0).toUpperCase() + actionType.slice(1);
    if (variables.isVerticalScreen === true) {
      if (!variables[finishType] === true && !variables.cardsBlocked) {
        flipCard(card);
        variables[finishType] = true;
      }
    // Otherwise, in width big screens use the three column card positions to move
    } else {
      if (card.dataset.cardState === 'moved') {
        flipCard(card);
      } else {
        if (!variables[finishType] === true && !variables.cardsBlocked) {
          let destination;
          if (actionType === 'cardAction') {
            destination = document.getElementById(`pos${variables.cardAction}`);
          } else if (actionType === 'messageAction') {
            destination = document.getElementById(`mes${variables.messageAction}`);
          }
          moveCard(card, actionType, destination);
          if (variables[actionType] !== 3) {
            variables[actionType] = variables[actionType] + 1;
          } else {
            variables[finishType] = true;
          }
        }
      }
    } 
  }

  if (window.innerHeight >= window.innerWidth) {
    variables.isVerticalScreen = true;
  }
  let Cards = [], Messages = [];
  let i;
  for (i = 1; i <= variables.numCards; i++) {
    Cards.push(<Card key={i} img={`${i}.jpg`} onCardClick={onCardClick} variant="main" isVerticalScreen={variables.isVerticalScreen}/>)
    Messages.push(<Card key={i} img={`${i}m.jpg`} onCardClick={onCardClick} variant="message" />)
  }
  variables.cards = Cards;
  shuffle(Cards);
  shuffle(Messages);
  
  return (
    <Layout>
      <SEO title="Home" spacing={4} />
      <Table>
        <Grid container justify="center" className="card-table">
          {variables.isVerticalScreen === true ? 
          (
            <Grid item xs={12} style={{height: '100%'}}>
              <img onClick={onClickShuffle} className="icon" src={shuffleIcon} alt="shuffle cards" />
              {/* <Box position="relative" className="card-position" style={variables.isVerticalScreen === true ? {margin: 'auto'} : {}}> */}
              <Box position="relative" className="card-position">
                { Cards }
              </Box>
              <Box position="relative" className="message-position">
                { Messages }
              </Box>
            </Grid>
          ) : (
            <>
              <Grid item xs={3} style={{height: '97%'}}>
                {/* <img onClick={onClickShuffle} className="icon" src={shuffleIcon} alt="Shuffle all the cards" /> */}
                <RefreshRounded id="shuffle-cards" onClick={onClickShuffle} alt="Shuffle all the cards"/>
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
              <ExpandMoreRounded id="expand-more" onClick={() => window.scrollTo({top: 100, left: 1000, behavior: 'smooth'})}/>
            </>)}
        </Grid> 
      </Table>
      <Info />
    </Layout>
    
  )
  
}
  

export default IndexPage
