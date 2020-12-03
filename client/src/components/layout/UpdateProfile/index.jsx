import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import "./styles.css";

const user = localStorage.getItem("token");
export default class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      name: "",
      email: "",
      phone: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillMount() {
    axios.get("/api/profile_import", { params: { uid: user } }).then((res) => {
      this.setState({
        userData: res.data,
      });
    });
  }
  onChange(event) {
    switch (event.target.id) {
      case "name":
        this.setState({ name: event.target.value });
        break;
      case "phone":
        this.setState({ phone: event.target.value });
        break;
      case "email":
        this.setState({ email: event.target.value });
        break;
    }
  }
  onSubmit(event) {
    event.preventDefault();
    var inputData = [
      this.state.name,
      this.state.phone,
      this.state.email
    ];
    axios
      .post("/api/profile_update", {
        current: this.state.userData,
        update: inputData,
      })
      .then((res) => {
        alert("Account details updated succesfully!");
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
        alert("Unable to update records");
      });
  }
  render() {
    return (
      <div className="form">
        <h1 className="form_title">Account Data: </h1>
        <br />
        <p>Name: {this.state.userData.name}</p>
        <p>Phone: {this.state.userData.phone}</p>
        <p>Email: {this.state.userData.email}</p>
        <br />
        <h1 className="form_title">Update records below: </h1>
        <br />
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name:"
              defaultValue={this.state.userData.name}
              onChange={this.onChange}
            />
          </Form.Group>

          <Form.Group controlId="phone">
            <Form.Label>Mobile</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Mobile"
              defaultValue={this.state.userData.phone}
              onChange={this.onChange}
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Email:"
              defaultValue={this.state.userData.email}
              onChange={this.onChange}
            />
          </Form.Group>

          <Button id="submit-button" variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}
