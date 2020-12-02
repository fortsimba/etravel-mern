import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Results from "../Results";
import { Row } from "react-bootstrap";
import "./styles.css";
import FuzzySearch from "react-fuzzy";
import Banner from "./Banner.js";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = { hotels: [], filteredHotels: [], selected:[] };
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
    this.handleFilterChild = this.handleFilterChild.bind(this);
    this.handleFilterFamily = this.handleFilterFamily.bind(this);
    this.handleFilterBusiness = this.handleFilterBusiness.bind(this);
    this.handleFilterBreakfast = this.handleFilterBreakfast.bind(this);
    this.handleFilterSmoking = this.handleFilterSmoking.bind(this);
    this.handleFilterNoSmoke = this.handleFilterNoSmoke.bind(this);
  }
  componentWillMount() {
    axios.get("/api/hotel_all").then((res) => {
      this.setState({
        hotels: res.data.hotels.slice(0,100),
        filteredHotels: res.data.hotels.slice(0,100),
        category: "",
        child: "",
        family: "",
        business: "",
        breakfast: "",
        smoking: "",
        noSmoking: "",
        selected: ["filterButton","filterButton","filterButton","filterButton","filterButton","filterButton"]
      });
    });
  }

  handleChangeCategory(e) {
    this.setState({ category: e.target.value });
    this.listProducts();
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

  listProducts(){
    this.setState((state) =>{
      if (state.category !== "") {
        return {
          filteredHotels: state.filteredHotels.filter(
            (a) => a["city"].indexOf(state.category) >= 0
          ),
        };
      }
      if(state.child != ""){
          var mode = "child";
          console.log(mode)
          axios.get("/api/featureSearch",{ params: {mode: mode}}).then((res) =>{
            var a3 = state.filteredHotels.filter(
              a=>res.data.includes(a['uniq_id'])
            )
            console.log(a3)
            return{
              filteredHotels: a3
            }
          })
      }
      if (state.category !== "") {
        return {
          filteredHotels: state.product((a) => a["city"]),
        };
      }
    })
  }

  render() {
    return (
      <div>
        <Banner />
        <br/>
        <div className="filter-select">
            <button className={this.state.selected[0]} value="do" onClick={this.handleFilterChild}>Child Friendly</button>
            <button className={this.state.selected[1]} value="do" onClick={this.handleFilterFamily}>Family Friendly</button>
            <button className={this.state.selected[2]} value="do" onClick={this.handleFilterBusiness}>Business Oriented</button>
            <button className={this.state.selected[3]} value="do" onClick={this.handleFilterBreakfast}>Breakfast Available</button>
            <button className={this.state.selected[4]} value="do" onClick={this.handleFilterSmoking}>Smoking Allowed</button>
            <button className={this.state.selected[5]} value="do" onClick={this.handleFilterNoSmoke}>Non Smoking</button>
            <br /><br/>
            <Link to={{pathname:`/results`, state:this.state}}><button className="searchBtn">Find Hotels</button></Link>
        </div>
      </div>
    );
  }
}

export default Landing;
