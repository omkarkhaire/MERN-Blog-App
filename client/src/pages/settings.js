import React from "react";
import Sidebar from "../sidebar";
import "./settings.css";
import image from "../assets/user.png";
import { FaUser } from "react-icons/fa";
import { context } from "../context/context";
import axios from "axios";

const Settings = () => {
  const { user, dispatch } = React.useContext(context);
  const [file, setfile] = React.useState(null);
  const [username, setusername] = React.useState(user.username);
  const [email, setemail] = React.useState(user.email);
  const [password, setpassword] = React.useState("");
  const [success, setsuccess] = React.useState(false);
  console.log(user);
  const handelsubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "update_start" });
    var updateduserinfo = {
      username,
      email,
      password,
      userid: user._id,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updateduserinfo.profilepicture = filename;
      try {
        await axios.post("/upload", data);
      } catch (error) {
        console.log("error in uploading userphoto" + error);
      }
    }
    try {
      const responce = await axios.put(`/user/${user._id}`, updateduserinfo);
      setsuccess(true);
      dispatch({ type: "update_success", payload: responce.data });

      console.log(responce);
    } catch (error) {
      dispatch({ type: "update_fail" });
    }
  };
  console.log("user=", user);
  const pf = "http://localhost:5000/images/";
  return (
    <div className="maincontainer">
      <div className="settingswrapper">
        <div className="settingstitle">
          <span className="settingtitelitem">Update Your Account</span>
          <span className="settingtitelitem2" style={{ fontSize: "1.3vw" }}>
            Delete Account
          </span>
        </div>

        <div className="actualsettings">
          <form className="settingform" onSubmit={handelsubmit}>
            <label>Profile Picture</label>
            <div className="settingpp">
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    : user.profilepicture > 1
                    ? pf + user.profilepicture
                    : image
                }
                alt="username"
                className="myimg"
              />

              <label htmlFor="filedata" className="ii">
                <FaUser className="myiconsselect" />
              </label>
              <input
                type="file"
                id="filedata"
                style={{ display: "none" }}
                onChange={(e) => setfile(e.target.files[0])}
              />
            </div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder={user.username}
              value={username}
              onChange={(e) => setusername(e.target.value)}
            />
            <label htmlFor="Email">Email</label>
            <input
              type="Email"
              id="Email"
              placeholder={user.email}
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
            <label htmlFor="Pass">Password</label>
            <input
              type="password"
              id="pass"
              placeholder="Type here"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
            <button type="submit" className="submitdata">
              Update
            </button>
            {success && (
              <div style={{ textAlign: "center", margin: "5px auto" }}>
                <h3 style={{ color: "green", textAlign: "center" }}>
                  Updated Successfully
                </h3>
              </div>
            )}
          </form>
        </div>
      </div>
      <Sidebar className="sidebar" />
    </div>
  );
};

export default Settings;
