import React from "react";
import "./ProfileScreen.css";
import Navbar from "../../components/Navbar/Navbar";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import PlanScreen from "../PlanScreen/PlanScreen";

function ProfileScreen() {
  const user = useSelector(selectUser);
  return (
    <div className="profileScreen">
      <Navbar />
      <div className="profileScreen__body">
        <h1>Edit Profile</h1>
        <div className="profileScreen__info">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="Avatar"
          />
          <div className="profileScreen__details">
            <h2>{user.email}</h2>
            <div className="profileScreen__plans">
              <h3>Plans</h3>
              <PlanScreen/>
              <button
                onClick={() =>
                  signOut(auth)
                    .then(() => console.log("User Signed out"))
                    .catch((err) => alert(err.message))
                }
                className="profileScreen__signout"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
