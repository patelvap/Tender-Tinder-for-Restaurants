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
      renderHasRun: false
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

  //need to add categories in this - combo box
  render() {
    if (!this.state.renderHasRun&&this.state.longitude!==""&&this.state.latitude!=="") {
      this.submit();
      this.setState({
        renderHasRun: true
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
