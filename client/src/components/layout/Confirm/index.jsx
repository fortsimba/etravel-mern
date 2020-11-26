import React, {Component} from 'react';
import axios from 'axios';
import { Link, useParams , useLocation } from "react-router-dom";
import * as QueryString from "query-string"

const user = localStorage.getItem('token');

// function



export default class Confirm extends Component{
    constructor(props){
        super(props);
        this.state = { hotel_id:'' ,hotel_name:'' , room_type: '' , no_room:'' , price:'' , name: '' , email:'' , phone:'' , checkin:'' , checkout:''};
        let query = QueryString.parse(this.props.location.search);
        console.log(query.hotel_id)
        this.setState({
            hotel_id: query.hotel_id,
            hotel_name: query.hotel_name,
            room_type: query.room_type,
            no_rooms : query.no_rooms,
            price : query.price,
            checkin: query.check_in,
            checkout: query.check_out
        })
    }

    componentWillMount(){
        axios.get("/api/profile_import", {params: {uid: user}}).then( (res) => {
            this.setState({
                name : res.data["name"],
                email : res.data["email"],
                phone : res.data["phone"],
              });
            }
        )
        let query = QueryString.parse(this.props.location.search);
        this.setState({
            hotel_id: query.hotel,
            hotel_name: query.hotel_name,
            room_type: query.room_type,
            no_rooms : query.no_rooms,
            price : query.price,
            checkin: query['check-in'],
            checkout: query['check-out']
        })
    }
    render() {
        // console.log(this.state)
        if (this.state.name && this.state.phone && this.state.email) {
            return(
                <div>
                <h3>Booking Details</h3>

            </div>
            )
        }

         else {
            return(
                <div>
                    Please Update user profile name, email and phone
                </div>
            )

        }
    }
}
