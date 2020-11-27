import React, {Component} from 'react';
import axios from 'axios';
import { Link, useParams , useLocation } from "react-router-dom";
import * as QueryString from "query-string";
import currency from "../../data/currency";


const user = localStorage.getItem('token');

// function



export default class Confirm extends Component{
    constructor(props){
        super(props);
        this.state = { user_id:'', hotel_id:'' ,hotel_name:'' , address:'', room_type: '' , no_rooms:'' , price:'' , name: '' , email:'' , phone:'' , checkin:'' , checkout:''};
        this.book = this.book.bind(this)
    }

    componentWillMount(){
        axios.get("/api/profile_import", {params: {uid: user}}).then( (res) => {
            console.log(res.data)
            this.setState({
                user_id: res.data._id,
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
            checkout: query['check-out'],
            address: query.address
        })
    }

    book(ttl){
            const id         = this.state.user_id;
            const hotel_name = this.state.hotel_name;
            const hotel_id   = this.state.hotel_id;
            const room_type  = this.state.room_type;
            const no_rooms   = this.state.no_rooms;
            const checkin     = this.state.checkin;
            const checkout   = this.state.checkout;
            const total      = ttl

        axios
            .post("/api/booking" ,{
                 id, hotel_name, hotel_id, room_type, no_rooms, checkin, checkout, total
            }).then((res)=>{
                alert("Booking Confirmed");
                window.location.assign("http://localhost:3000/bookings")
            }).catch((err)=> {
                alert("Booking Not Confirmed ")
                let str="http://localhost:3000/hotel/"+this.state.hotel_id
                window.location.assign(str)
            })
        
        }


    render() {
        const d1 = new Date(this.state.checkin).getTime();
        const d2 = new Date(this.state.checkout).getTime();
        let diff = Math.floor((d2-d1)/(1000*60*60*24))
        let tl = diff * this.state.price * this.state.no_rooms
        let total = "Pay "+ currency.formatCurrency( tl)
        console.log(total,this.state)


        if (this.state.name && this.state.phone && this.state.email) {
            return(
                <div>
                <h3>Booking Details</h3>
                <center>
                    <table>
                        <tr>
                            <th>Name: </th>
                            <td>{this.state.name}</td>
                        </tr>
                        <tr>
                            <th>Phone: </th>
                            <td>{this.state.phone}</td>
                        </tr>
                        <tr>
                            <th>Email:</th>
                            <td>{this.state.email}</td>
                        </tr>
                        <tr>
                            <th>Hotel: </th>
                            <td>{this.state.hotel_name}</td>
                        </tr>
                        <tr>
                            <th>Adress: </th>
                            <td>{this.state.address}</td>
                        </tr>
                        <tr>
                            <th>Room Type: </th>
                            <td>{this.state.room_type}</td>
                        </tr>
                        <tr>
                            <th>Number of Rooms:</th>
                            <td>{this.state.no_rooms}</td>
                        </tr>
                        <tr>
                            <th>Check in: </th>                    
                            <td>2:00 pm, {this.state["checkin"]}</td>    
                        </tr>
                        <tr>
                            <th>Check out: </th>                    
                            <td>12:00 pm, {this.state["checkout"]}</td>    
                        </tr>
                        
                    </table>
                    <input type="button" value={total} onClick={()=>this.book(tl)}/>
                </center>
            </div>
            )
        }

         else {
            return(
                <div>
                    <Link to="/profile">
                    Please Update user profile name, email and phone
                    </Link>
                </div>
            )

        }
    }
}
