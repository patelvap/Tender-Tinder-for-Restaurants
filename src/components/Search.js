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
  ModalCardTitle
} from "bloomer";
import { PanelBlock } from "bloomer/lib/components/Panel/PanelBlock";
import { ModalBackground } from "bloomer/lib/components/Modal/ModalBackground";

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      latitude: "", //(required)
      longitude: "", //(required)
      categories: "", //delimited strong of categories (optional)
      radius: "", //(optional)
      term: "", //(optional)
      offset: "", //(optional)
      limit: "", //(optional)
      isActive: false
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
    e.preventDefault();
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
    this.setState({
      isActive: !this.state.isActive
    });
  }

  //need to add categories in this - combo box
  render() {
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
                        placeholder="Radius"
                        onChange={this.updateSearch}
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
