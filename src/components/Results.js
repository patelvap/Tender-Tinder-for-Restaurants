import React, { Component} from "react";
import { Column } from "bloomer";
import RestaurantCard from "./RestaurantCard";

class Results extends Component {
  static propTypes = {}

  constructor(props) {
    super(props)

    this.state = {
      restaurantName: '',
      index: 0,
      outOfResults: false
    };
  }

  updateIndex(newResultsPassed) { 
    if (this.state.index === newResultsPassed.length-1) {
      this.setState({outOfResults: true})
    }
    this.setState({ index: this.state.index+1 })
    this.render();
    
  };

  render() {
    if (this.state.outOfResults==true) {
      return(
        <Column isSize="1/2">
          <h1 className="title">Uh Oh! You have reached your swipe limit for today! If you are really that hungry, refresh and change your filters. Don't be a picky eater next time</h1>
        </Column>
      )
    }
    if (this.props.results !== undefined) {
      let newResults = this.props.results.filter(this.props.checkBlacklist)
      let result = newResults[this.state.index];
      if (newResults.length==0||result==undefined) {
        this.state.outOfResults=true
        return(
          <Column isSize="1/2">
            <h1 className="title">Uh Oh! You have reached your swipe limit for today! If you are really that hungry, refresh and change your filters. Don't be a picky eater next time</h1>
          </Column>
        )
      }
      return (
        <Column isSize="1/2">
          <RestaurantCard
            result={result}
            name={result.name}
            imageURL={result.image_url}
            phone={result.phone}
            address={result.location.display_address.join(" ")}
            distance={result.distance / 1609.344}
            category={result.categories[0].title}
            price={result.price}
            rating={result.rating}
            updateIndex={this.updateIndex.bind(this)}
            blacklist={this.props.blacklist}
            loggedIn={this.props.loggedIn}
            newResults={newResults}
          /><br/>
        </Column>
      );
    }
    else {
      return (
        null
      );
    }
  }
}

export default Results