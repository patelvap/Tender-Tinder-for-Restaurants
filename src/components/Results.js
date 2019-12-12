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
    };
  }

  updateIndex() { 
    this.setState({ index: this.state.index+1 })
    this.render();
    if (this.state.index === 19) {

    }
  };

  render() {
    if (this.props.results !== undefined) {
      let result = this.props.results[this.state.index];
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