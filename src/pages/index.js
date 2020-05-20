import React from "react"
import Grid from '@material-ui/core/Grid';
import Layout from "../components/layout"
import SEO from "../components/seo";
import Card from "../components/card";

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numCards: 5,
    };
  }

  render() {
    let Cards = [];
    let i;
    for (i = 1; i <= this.state.numCards; i++) {
      Cards.push(<Card img={`${i}.jpg`} />)
    }

    return (
      <Layout>
        <SEO title="Home" spacing={4} />
        <Grid container justify="center" alignItems="center">
          <Grid item xs={6}>
            yasfs
          </Grid>
          <Grid item xs={6}>
            { Cards }
            {/* <Card />
            <Card /> */}
            {/* <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card /> */}
          </Grid>
        </Grid>
      </Layout>
    )
  }
}
  

export default IndexPage
