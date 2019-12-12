import React, { Component } from "react";
import {
  Label,
  Control,
  Input,
  Button,
  Panel,
  Modal,
  ModalCard,
  Container,
  ModalCardHeader,
  ModalCardBody,
  ModalCardFooter,
  ModalCardTitle,
  ModalBackground,
  PanelBlock,
} from "bloomer";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: "", //(required)
      longitude: "", //(required)
      categories: "", //delimited strong of categories (optional)
      radius: "", //(optional)
      term: "", //(optional) -> search term 
      offset: "", //(optional)
      limit: "", //(optional)
      isActive: false,
      renderHasRun: false,
      runTotal: 0
    };
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    });
  }

  updateSearch = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submit = e => {
    if (e!==undefined) {e.preventDefault();} //event will never be undefined?
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    });
    // this.props.history.push(`latitude=${this.state.latitude}&
    //                         longitude=${this.state.longitude}&
    //                         categories=${this.state.categories}&
    //                         radius=${this.state.radius}&
    //                         term=${this.state.term}&
    //                         offset=${this.state.offset}&
    //                         limit=${this.state.limit}`);
    const {
      latitude,
      longitude,
      categories,
      radius,
      term,
      offset,
      limit
    } = this.state;
    this.props.getTargets(
      latitude,
      longitude,
      categories,
      radius,
      term,
      offset,
      limit
    );
  };

  changeActive() {
    this.setState({ isActive: !this.state.isActive });
  }

  handleRadius = e => {
    e.preventDefault();
    let rad = e.target.value * 1609.344;
    if (rad > 40000) {
      rad = 40000;
    }
    this.setState({
      radius: Math.floor(rad)
    });
  };

  /**
   * Searches Yelp API for autocomplete suggestions, returns an object containing suggestions for business titles, key words, and categories.
   *
   * @param {string} text text to be completed by the autocomplete request, probably the contents of a search bar.
   * @param {number} latitude latitude of position about which to search (required) returns null when undefined
   * @param {number} longitude longitude of position about which to search (required) returns null when undefined
   * @param {boolean} needsCorsAnywhere boolean governing the use of cors-anywhere, cors-anywhere is enabled when true (optional)
   *
   *
   */
  yelpAutocomplete(text, latitude, longitude, needsCorsAnywhere) {
    let yelpKey = `pm8o9ejAV8iA0lnYN8fK4lEKdh6nVH3foW1CB76vo0kVN9IK6dqv6awLhlVSWpm81FeaXAgGyEOnycrvc6HdXlPtbcQv7vC1wvOjkJ4Ei7LLrhvH-K3xQHtxafbWXXYx`; //our yelp api key
    let finalResult;

    if (latitude == undefined || longitude == undefined) {
      return null;
    }
    let searchURL = ""; //intially empty URL
    if (
      needsCorsAnywhere == undefined ||
      needsCorsAnywhere == false ||
      needsCorsAnywhere == null
    ) {
      //decides on base URL, whether we need cors-anywhere or not. appends accordingly
      searchURL = searchURL + "https://api.yelp.com/v3/autocomplete?";
    } else {
      searchURL =
        searchURL +
        "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/autocomplete?";
    }

    searchURL =
      searchURL + `text=${text}&latitude=${latitude}&longitude=${longitude}`; //appends everything.

    async function makeRequest() {
      //actually makes request
      await fetch(`${searchURL}`, {
        headers: { Authorization: "Bearer " + yelpKey }
      }).then(res => res.json().then(setFin));
    }

    async function setFin(query) {
      //sets finalResult after the request returns
      finalResult = query;
    }

    makeRequest(); //makes function wait until end of request

    return finalResult;
  }

  runOnce() {
    console.log(
      this.yelpAutocomplete(
        "steak",
        this.state.latitude,
        this.state.longitude,
        true
      )
    );
  }

  //need to add categories in this - combo box
  render() {
    if (!this.state.renderHasRun&&this.state.longitude!==""&&this.state.latitude!=="") {
      this.submit();
      this.setState({
        renderHasRun: true
      });
    }
    if (this.state.runTotal < 1) {
      this.runOnce();
      console.log("ran");
      this.setState({
        runTotal: 1
      });
    }
    return (
      <Container>
        <Button onClick={this.changeActive.bind(this)}>
          Choose your filter!
        </Button>
        <form onSubmit={this.submit}>
          <Modal isActive={this.state.isActive}>
            <ModalBackground />
            <ModalCard>
              <ModalCardHeader>
                <ModalCardTitle>Filters!</ModalCardTitle>
              </ModalCardHeader>
              <ModalCardBody>
                <Panel>
                  <PanelBlock>
                    <Label>Search Term</Label>
                    <Control>
                      <Input
                        name="term"
                        type="text"
                        placeholder="Enter restaurant"
                        value={this.state.term}
                        onChange={this.updateSearch}
                      ></Input>
                    </Control>
                  </PanelBlock>
                  <PanelBlock>
                    <Label>Category</Label>
                    <Control>
                      <Input
                        name="category"
                        type="text"
                        placeholder="Enter Category"
                        value={this.state.categories}
                        onChange={this.updateSearch}
                      ></Input>
                    </Control>
                  </PanelBlock>
                  <PanelBlock>
                    <Label>Search Radius</Label>
                    <Control>
                      <Input
                        name="radius"
                        type="text"
                        placeholder="Radius in miles"
                        value={this.state.radius}
                        onChange={this.handleRadius}
                      ></Input>
                    </Control>
                  </PanelBlock>
                  <PanelBlock>
                    <Label>Offset Limit</Label>
                    <Control>
                      <Input
                        name="offset"
                        type="text"
                        placeholder="Offset the list of businesses"
                        onChange={this.updateSearch}
                      ></Input>
                    </Control>
                  </PanelBlock>
                  <PanelBlock>
                    <Label>Result Limit</Label>
                    <Control>
                      <Input
                        name="limit"
                        type="text"
                        placeholder="Limit"
                        onChange={this.updateSearch}
                      ></Input>
                    </Control>
                  </PanelBlock>
                </Panel>
              </ModalCardBody>
              <ModalCardFooter>
                <Button
                  isColor="primary"
                  type="submit"
                  onClick={this.changeActive.bind(this)}
                >
                  Search
                </Button>
                <Button
                  isColor="warning"
                  onClick={this.changeActive.bind(this)}
                >
                  Cancel
                </Button>
              </ModalCardFooter>
            </ModalCard>
          </Modal>
        </form>
      </Container>
    );
  }
}
