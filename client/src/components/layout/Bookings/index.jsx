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
                bookings: res.data[0]
            })

        }
        )
    }

    books(){

    }

    render(){
      if(this.state.bookings){
        if(this.state.bookings.hotel){
          var ht = this.state.bookings.hotel
          var rm = this.state.bookings.room_type
          var no = this.state.bookings.no_rooms
          var ci = this.state.bookings.checkin
          var co = this.state.bookings.checkout
          var tl = this.state.bookings.total
          var ind = []
          ind.push(<div><h2> Your previous bookings: </h2><br /></div>)
          for (var i=0; i< ht.length; i++){
            ind.push(<div>
                <h3>{ht[i]}</h3>
                <center>
                    <table>
                        <tr>
                            <th>Room Type: </th>
                            <td>{rm[i]}</td>
                        </tr>
                        <tr>
                            <th>Number of Rooms: </th>
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
                <hr />
            </div>)
          }

          // var bks = ind.map((i)=>(
          //     <div>
          //         <h3>{ht[i]}</h3>
          //         <center>
          //             <table>
          //                 <tr>
          //                     <th>Room Type: </th>
          //                     <td>{rm[i]}</td>
          //                 </tr>
          //                 <tr>
          //                     <td>Number of Rooms: </td>
          //                     <td>{no[i]}</td>
          //                 </tr>
          //                 <tr>
          //                     <th>Check in: </th>
          //                     <td> 2:oo pm {ci[i]}</td>
          //                 </tr>
          //                 <tr>
          //                     <th>Check out: </th>
          //                     <td> 12:oo pm {co[i]}</td>
          //                 </tr>
          //                 <tr>
          //                     <th>Amount Paid: </th>
          //                     <td> {tl[i]}</td>
          //                 </tr>
          //             </table>
          //         </center>
          //     </div>
          // ))
          return(
              ind
          )
        }
        else{
            return(
            <div>
                <h3>You have no bookings</h3>
            </div>
        )
      }
      }
      else{
        return null
      }


        // return(
        //     <div>
        //         {this.books()}
        //     </div>
        // )
    }
}
