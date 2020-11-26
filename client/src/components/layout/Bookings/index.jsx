import React, { Component } from "react";
import { Link } from "react-router-dom";
import currency from "../../data/currency";
import axios from "axios";

const user = localStorage.getItem("token");

export default class Bookings extends Component{
    constructor(props){
        super(props);
        this.state = { bookings : [] }
    }

    componentWillMount(){
        axios.get("/api/booking" , { params: {uid : user}}).then((res) => {
            
            this.setState({
                bookings: res.data[1]
            })
            
        }
        )
    }

    books(){
        console.log(this.state.bookings)
        if(this.state.bookings){
            var ht = this.state.bookings.hotel
            var rm = this.state.bookings.room_type
            var no = this.state.bookings.no_rooms
            var ci = this.state.bookings.checkin
            var co = this.state.bookings.checkout
            var tl = this.state.bookings.total

            var ind = []
            for (var i=0; i< ht.length; i++)
            
            var bks = ind.map((indx)=>(
                <div>
                    <h3>{ht[i]}</h3>
                    <center>
                        <table>
                            <tr>
                                <th>Room Type: </th>
                                <td>{rm[i]}</td>
                            </tr>
                            <tr>
                                <td>Number of Rooms: </td>
                                <td>{no[i]}</td>
                            </tr>
                            <tr>
                                <th>Check in: </th>
                                <td> 2:oo pm {ci[i]}</td>
                            </tr>
                            <tr>
                                <th>Check out: </th>
                                <td> 12:oo pm {co[i]}</td>
                            </tr>
                            <tr>
                                <th>Amount Paid: </th>
                                <td> {tl[i]}</td>
                            </tr>
                        </table>
                    </center>
                </div>
            ))
            return(
                {bks}
            )
        }
        else{
            return(
            <div>
                <h3>You have no bookings</h3>
            </div>
        )
    }}

    render(){
        return(
            <div>
                {this.books()}
            </div>
        )
    }
}

