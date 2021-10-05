import React, { Component } from "react";

import { Navigation, Footer } from "../Navigation";

export default class Layout extends Component {
  render() {
    return (
      <div>
        <Navigation />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}
