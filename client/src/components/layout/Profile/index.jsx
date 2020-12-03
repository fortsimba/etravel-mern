import React from "react";
import "./styles.css";

const Profile = () => {
  return (
    <div>
      <br />
      <ul>
        <li>
          <a href="/update_profile">
            <button id="profile_button" className="btn btn-info">
              Update Profile
            </button>
          </a>
        </li>
        <hr />
        <li>
          <a href="/orders">
            <button id="profile_button" className="btn btn-info">
              My Booking
            </button>
          </a>
        </li>
        <hr />
        <li>
          <a href="/wishlist">
            <button id="profile_button" className="btn btn-info">
              My Saves
            </button>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Profile;
