import React, { Component } from "react";

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
                <option value="Lazio">Lazio</option>
                <option value="North Holland Province">
                  North Holland Province
                </option>
                <option value="Community of Madrid">Community of Madrid</option>
                <option value="Ile-de-France">Ile-de-France</option>
                <option value="Catalonia">Catalonia</option>
                <option value="Hesse">Hesse</option>
                <option value="Veneto">Veneto</option>
                <option value="Tuscany">Tuscany</option>
                <option value="Illinois">Illinois</option>
                <option value="Ontario">Ontario</option>
                <option value="Tennessee">Tennessee</option>
              </select>
            </label>
          </div>
        </div>
        <hr />
        <div>{this.props.count} products found.</div>
      </container>
    );
  }
}
