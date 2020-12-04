import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Results from "../Results";
import { Row } from "react-bootstrap";
import "./styles.css";
import FuzzySearch from "react-fuzzy";
import Banner from "./Banner.js";
import { LazyLoadImage } from 'react-lazy-load-image-component';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = { hotels: [], filteredHotels: [], selected:[] };
    this.handleChangeCity = this.handleChangeCity.bind(this);
    this.handleFilterChild = this.handleFilterChild.bind(this);
    this.handleFilterFamily = this.handleFilterFamily.bind(this);
    this.handleFilterBusiness = this.handleFilterBusiness.bind(this);
    this.handleFilterBreakfast = this.handleFilterBreakfast.bind(this);
    this.handleFilterSmoking = this.handleFilterSmoking.bind(this);
    this.handleFilterNoSmoke = this.handleFilterNoSmoke.bind(this);
    this.handleChangeCity = this.handleChangeCity.bind(this);
    this.filterCities = this.filterCities.bind(this);
  }
  componentWillMount() {
    axios.get("/api/hotel_all").then((res) => {
      this.setState({
        hotels: res.data.hotels,
        filteredHotels: res.data.hotels,
        category: "",
        child: "",
        family: "",
        business: "",
        breakfast: "",
        smoking: "",
        noSmoking: "",
        city: "",
        selected: ["filterButton","filterButton","filterButton","filterButton","filterButton","filterButton"]
      });
    });
  }

  handleChangeCity(e) {
    this.setState({ city: e.target.value });
    this.filterCities();
  }

  async handleFilterChild(e){
    if(this.state.child=="set"){
      var sel = this.state.selected;
      sel[0] = "filterButton"
      await this.setState({child: "no", selected: sel})
    }
    else{
      var sel = this.state.selected;
      sel[0] = "selectedFilter"
      await this.setState({child: "set", selected: sel});
    }
    this.doFilter();
  }
  async handleFilterFamily(e){
    if(this.state.family=="set"){
      var sel = this.state.selected;
      sel[1] = "filterButton"
      await this.setState({family: "no", selected:sel})
    }
    else{
      var sel = this.state.selected;
      sel[1] = "selectedFilter"
      await this.setState({family: "set", selected:sel});
    }
    this.doFilter();
  }


  async handleFilterBusiness(e){
    if(this.state.business=="set"){
      var sel = this.state.selected;
      sel[2] = "filterButton"
      await this.setState({business: "no", selected:sel})
    }
    else{
      var sel = this.state.selected;
      sel[2] = "selectedFilter"
      await this.setState({business: "set", selected:sel});
    }
    this.doFilter();
  }


  async handleFilterBreakfast(e){
    if(this.state.breakfast=="set"){
      var sel = this.state.selected;
      sel[3] = "filterButton"
      await this.setState({breakfast: "no", selected:sel})
    }
    else{
      var sel = this.state.selected;
      sel[3] = "selectedFilter"
      await this.setState({breakfast: "set", selected:sel});
    }
    this.doFilter();
  }


  async handleFilterSmoking(e){
    if(this.state.smoking=="set"){
      var sel = this.state.selected;
      sel[4] = "filterButton"
      await this.setState({smoking: "no", selected:sel})
    }
    else{
      var sel = this.state.selected;
      sel[4] = "selectedFilter"
      await this.setState({smoking: "set", selected:sel});
    }
    this.doFilter();
  }


  async handleFilterNoSmoke(e){
    if(this.state.noSmoking=="set"){
      var sel = this.state.selected;
      sel[5] = "filterButton"
      await this.setState({noSmoking: "no", selected:sel})
    }
    else{
      var sel = this.state.selected;
      sel[5] = "selectedFilter"
      await this.setState({noSmoking: "set", selected:sel});
    }
    this.doFilter();
  }


  doFilter() {
    if(this.state.child == "set"){
      var mode = "child";
      axios.get("/api/featureSearch",{ params: {mode: mode}}).then((res) =>{
        var a3 = this.state.filteredHotels.filter(
          a=>res.data.includes(a['uniq_id'])
        )
      this.setState({filteredHotels: a3});
      });
    }
    else if(this.state.child=="no"){
      this.setState({filteredHotels: this.state.hotels, child:""});
      this.doFilter();
    }


    if(this.state.family == "set"){
      var mode = "family";
      axios.get("/api/featureSearch",{ params: {mode: mode}}).then((res) =>{
        var a3 = this.state.filteredHotels.filter(
          a=>res.data.includes(a['uniq_id'])
        )
      this.setState({filteredHotels: a3});
      });
    }
    else if(this.state.family=="no"){
      this.setState({filteredHotels: this.state.hotels, family:""});
      this.doFilter();
    }

    if(this.state.business == "set"){
      var mode = "business";
      axios.get("/api/featureSearch",{ params: {mode: mode}}).then((res) =>{
        var a3 = this.state.filteredHotels.filter(
          a=>res.data.includes(a['uniq_id'])
        )
      this.setState({filteredHotels: a3});
      });
    }
    else if(this.state.business=="no"){
      this.setState({filteredHotels: this.state.hotels, business:""});
      this.doFilter();
    }

    if(this.state.breakfast == "set"){
      var mode = "breakfast";
      axios.get("/api/featureSearch",{ params: {mode: mode}}).then((res) =>{
        var a3 = this.state.filteredHotels.filter(
          a=>res.data.includes(a['uniq_id'])
        )
      this.setState({filteredHotels: a3});
      });
    }
    else if(this.state.breakfast=="no"){
      this.setState({filteredHotels: this.state.hotels, breakfast:""});
      this.doFilter();
    }

    if(this.state.smoking == "set"){
      var mode = "smoking";
      axios.get("/api/featureSearch",{ params: {mode: mode}}).then((res) =>{
        var a3 = this.state.filteredHotels.filter(
          a=>res.data.includes(a['uniq_id'])
        )
      this.setState({filteredHotels: a3});
      });
    }
    else if(this.state.smoking=="no"){
      this.setState({filteredHotels: this.state.hotels, smoking:""});
      this.doFilter();
    }

    if(this.state.noSmoking == "set"){
      var mode = "noSmoking";
      axios.get("/api/featureSearch",{ params: {mode: mode}}).then((res) =>{
        var a3 = this.state.filteredHotels.filter(
          a=>res.data.includes(a['uniq_id'])
        )
      this.setState({filteredHotels: a3});
      });
    }
    else if(this.state.noSmoking=="no"){
      this.setState({filteredHotels: this.state.hotels, noSmoking:""});
      this.doFilter();
    }
  }

  filterCities(){
    this.setState((state) =>{
      if (state.city !== "") {
        return {
          filteredHotels: state.filteredHotels.filter(
            (a) => a["city"].indexOf(state.city) >= 0
          ),
        };
      }
    })
  }

  render() {
    console.log(this.state.filteredHotels)
    return (
      <div>
        <Banner />
        <br/>
        <div className="filter-select">
        <div className="center-search">
        <FuzzySearch
          list={this.state.hotels}
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
            <br/><br/>
            <label>
              City
              <select
                className="form-control"
                value={this.state.city}
                onChange={this.handleChangeCity}
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
            <br /><br/>
            <button className={this.state.selected[0]} value="do" onClick={this.handleFilterChild}>Child Friendly</button>
            <button className={this.state.selected[1]} value="do" onClick={this.handleFilterFamily}>Family Friendly</button>
            <button className={this.state.selected[2]} value="do" onClick={this.handleFilterBusiness}>Business Oriented</button>
            <button className={this.state.selected[3]} value="do" onClick={this.handleFilterBreakfast}>Breakfast Available</button>
            <button className={this.state.selected[4]} value="do" onClick={this.handleFilterSmoking}>Smoking Allowed</button>
            <button className={this.state.selected[5]} value="do" onClick={this.handleFilterNoSmoke}>Non Smoking</button>
            <br /><br/>
            <Link to={{pathname:`/results`, state:{filteredHotels: this.state.filteredHotels}}}><button className="searchBtn">Find Hotels</button></Link>
        </div>
      </div>
    );
  }
}

export default Landing;
