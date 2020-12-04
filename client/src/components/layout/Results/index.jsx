import React, { Component } from "react";
import Hotels from "../Hotels";
import axios from "axios";
import Filter from "../Filter";
import { Row } from "react-bootstrap";
import "./styles.css";
import FuzzySearch from "react-fuzzy";
import { LazyLoadImage } from 'react-lazy-load-image-component';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = { filteredHotels: [], hotels:[] };
    this.handleChangeSort = this.handleChangeSort.bind(this);
  }
  componentWillMount() {
    axios.get("/api/hotel_all").then((res) => {
      this.setState({
        hotels: res.data.hotels
      });
    });
    this.setState({filteredHotels: this.props.location.state.filteredHotels});
  }

  componentDidMount(){
    window.scrollTo(0,0);
  }

  handleChangeSort(e) {
    this.setState({ sort: e.target.value });
    this.listProducts();
  }

  listProducts(){
    this.setState((state) =>{
      if (state.sort !== "") {
        var arr = state.filteredHotels.sort(function(a,b){
          if(state.sort==="lowest"){}
              if( !isFinite(a['per_person_price']) && !isFinite(b['per_person_price']) ) {
                  return ( isNaN(a['per_person_price']) && isNaN(b['per_person_price']) || a['per_person_price']==null && b['per_person_price']==null)
                      ? 1
                      : a['per_person_price'] < b['per_person_price']
                          ? state.sort==="highest"? -1 : 1
                          : a['per_person_price'] === b['per_person_price']
                              ? 0
                              : state.sort==="highest"? 1: -1;
              }
              if( (a['per_person_price']) ==null) {
                  return 1;
              }
              if( (b['per_person_price']) ==null) {
                  return -1;
              }
              if( isNaN(a['per_person_price'])) {
                  return 1;
              }
              if( isNaN(b['per_person_price'])) {
                  return -1;
              }
              return state.sort==="highest"? a['per_person_price']-b['per_person_price']: b['per_person_price']-a['per_person_price'];
          });
        return { filteredHotels: arr };
      }
    })
  }

  render() {
    var list = this.state.hotels;
    if (this.state.hotels) {
      const list = this.state.hotels;
    }
    return (
      <div>
        <Row>
          <div>
            {(() => {
              if (this.state.hotels.length) {
                return (
                  <div>
                  <div
                    className="row"
                    style={{ marginBottom: "50px", marginTop: "20px" }}
                  >
                    <div className="col-md-8"></div>
                    <div className="col-md-4">
                      <FuzzySearch
                        list={list}
                        keys={["property_name", "address", "city"]}
                        width={430}
                        onSelect={() => {
                          console.log(this.state.hotels);
                        }}
                        resultsTemplate={(
                          props,
                          state,
                          styles,
                          clickHandler
                        ) => {
                          return state.results.map((val, i) => {
                            const style =
                              state.selectedIndex === i
                                ? styles.selectedResultStyle
                                : styles.resultsStyle;
                            return (
                              <div
                                style={style}
                                onClick={() =>
                                  window.location.replace(
                                    "/hotel/" + val["uniq_id"]
                                  )
                                }
                              >
                                <LazyLoadImage
                                  width="100"
                                  height="100"
                                  src={val["image_urls"]}
                                />
                                <p>{val["property_name"]}</p>
                              </div>
                            );
                          });
                        }}
                      />
                    </div>
                    </div>
                    <br /><br />
                    <Filter
                      category={this.state.category}
                      sort={this.state.sort}
                      handleChangeCategory={this.handleChangeCategory}
                      handleChangeSort={this.handleChangeSort}
                      handleFilterChild={this.handleFilterChild}
                      count={this.state.filteredHotels.length}
                    />
                    <hr />
                  </div>
                );
              }
            })()}
          </div>
        </Row>
        <Hotels
          hotels={this.state.filteredHotels}
          handleAddToCart={this.handleAddToCart}
          handleAddToWishlistt={this.handleAddToWishlist}
        />
      </div>
    );
  }
}

export default Landing;
