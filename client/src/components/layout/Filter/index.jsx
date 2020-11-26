import React, { Component } from "react";
import {Spinner} from "react-bootstrap"

export default class Filter extends Component {
  render() {
    return (
      <container>
        <div className="row">
          <div className="col-md-4">
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
          </div>
          <div className="col-md-4">
            <label>
              Filter by City
              <select
                className="form-control"
                value={this.props.category}
                onChange={this.props.handleChangeCategory}
              >
                <option value="">ALL</option>
                <option value="Kolkata">Kolkata</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Manali">Manali</option>
                <option value="Udaipur">Udaipur</option>
              </select>
            </label>
          </div>
        </div>
        <hr />
        <div>{this.props.count? this.props.count+' hotels found' : <Spinner animation="border" role="status" size="lg" variant="info" style={{marginLeft:"800px",width:"200px",height:"200px", marginTop:"-400px", position:"absolute"}}><span className="sr-only">Loading...</span></Spinner>}</div>
      </container>
    );
  }
}
