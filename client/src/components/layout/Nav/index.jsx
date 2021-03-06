import React, { useState } from "react";
import { StyledNav } from "./styles";
import SignupLoginModal from "../SignupLoginModal";
import { LoginButton } from "./styles";
import { NavDropdown } from "react-bootstrap";
import { Row } from "react-bootstrap";
import axios from "axios";
import "./styles.css";
import { Link } from "react-router-dom";

const Nav = () => {
  const [show, setShow] = useState(false);
  const Dropdown = () => (
    <NavDropdown className="border" title="Welcome!" id="collapsible-nav-dropdown">
      <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
      <NavDropdown.Item href="/wishlist">My Saves</NavDropdown.Item>
      <NavDropdown.Item href="/orders">Bookings</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item
        onClick={() => {
          localStorage.setItem("token", "");
          axios.get("/api/auth/logout").catch((err) => console.log(err));
          window.location.reload(false);
        }}
      >
        Logout
      </NavDropdown.Item>
    </NavDropdown>
  );
  return (
    <StyledNav className="nav_edits">
      <StyledNav.Brand className="mr-auto" href="/">
        <Row>
          <img
            className="logo_icon"
            // src="https://www.flaticon.com/premium-icon/icons/svg/3060/3060137.svg"
            src="https://www.flaticon.com/svg/static/icons/svg/2111/2111615.svg"
          ></img>
          <h1 className="logo">goHotels</h1>
        </Row>
        {/* <p id="subtitle">
          <i>We prioritize your comfort.</i>
        </p> */}
      </StyledNav.Brand>
      {/* <Link to="/">
        <img
          className="header_icon"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH6nlNdcKYq2ZM_oh8T3TTozUCz297xEuiXQ&usqp=CAU"
          atl=""
        />
      </Link> */}
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <LoginButton size="lg" className="mr-auto" href="/landing">
            View Hotels
          </LoginButton>
        </li>

        <li className="nav-item">
          {(() => {
            if (localStorage.getItem("token") === "") {
              return (
                <LoginButton
                  className="ml-auto"
                  size="lg"
                  onClick={() => {
                    setShow(true);
                  }}
                >
                  Login/Signup{" "}
                </LoginButton>
              );
            } else {
              return <Dropdown className="ml-auto" />;
            }
          })()}
          <SignupLoginModal show={show} setShow={setShow} />
        </li>
      </ul>
    </StyledNav>
  );
};

export default Nav;
