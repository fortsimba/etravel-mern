import React, { Component } from "react";
import { Spinner } from "react-bootstrap";

export default class Filter extends Component {
  render() {
    return (
          <div>
            <label>
              Order by
              <select
                className="form-control"
                value={this.props.sort}
                onChange={this.props.handleChangeSort}
              >
                <option value="">Select</option>
                {/* <option value="lowest">lowest to highest Price</option>
              <option value="highest">highest to lowest Price</option> */}
                <option value="lowest">highest to lowest Price</option>
                <option value="highest">lowest to highest Price</option>
              </select>
            </label>
        <div>{this.props.count? this.props.count+' hotels found' : <Spinner animation="border" role="status" size="lg" variant="info" style={{marginLeft:"800px",width:"200px",height:"200px", marginTop:"-400px", position:"absolute"}}><span className="sr-only">Loading...</span></Spinner>}</div></div>
    );
  }
}
