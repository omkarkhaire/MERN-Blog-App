import React from "react";
import "./sidebar.css";
import image from "./assets/user.png";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";
import { context } from "./context/context";

const Sidebar = () => {
  const [cats, setcat] = React.useState([]);
  const [myposts, setmyposts] = React.useState([]);
  const { user, dispatch } = React.useContext(context);
  const pf = "http://localhost:5000/images/";

  React.useEffect(() => {
    const getcat = async () => {
      const responce = await axios.get("/categories");
      setcat(responce.data);
      console.log(responce.data);
    };
    getcat();
    const getmemydata = async () => {
      try {
        const mydata = await axios.get(`/post/myposts/${user.username}`);
        setmyposts(mydata.data);
      } catch (error) {
        console.log("error in fetching my posts");
      }
    };
    getmemydata();
  }, [user]);
  console.log("picture=", user.profilepicture.length);
  return (
    <div className="mainsidebar">
      <div className="sidebaritem cat">
        <span className="sidebartitel">CATEGORIES</span>
        <ul className="sidebarlist">
          {cats.map((cat, index) => {
            return (
              <Link
                to={`/?category=${cat.name}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <li key={index} className="sidebarlistitem">
                  {cat.name}
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
      <div className="myinfosection">
        <div className="sidebaritem">
          <span className="sidebartitel">ABOUT ME</span>
          <img
            src={user.profilepicture > 1 ? pf + user.profilepicture : image}
            alt="imageloading"
          />

          {/* // <img src={pf + user.profilepicture || image} alt="imageloading" /> */}
        </div>
        <div
          className="sidebaritem "
          style={{ marginBottom: "10px", marginTop: "5px" }}
        >
          <h4>{user.username}</h4>
        </div>
        <div className="sidebaritem">
          <span className="sidebartitel followus">MY BLOGS</span>
          <div className={myposts.length <= 1 ? "singlepost" : "mypoststitels"}>
            {myposts.length <= 0 ? (
              <h4 className="mypostitem" style={{ textAlign: "center" }}>
                NO BLOGS
              </h4>
            ) : (
              myposts.map((post, index) => {
                return (
                  <Link
                    to={`/post/${post._id}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <h4 className={"mypostitem"} key={index}>
                      {post.titel.substring(0, 10) + ".."}
                    </h4>
                  </Link>
                );
              })
            )}
          </div>
        </div>
        <div className="sidebaritem">
          <span className="sidebartitel followus">MY ACCOUNTS</span>
          <div className="sidebarsocial">
            <FaInstagram className="socialicon" style={{ color: "red" }} />
            <FaFacebook className="socialicon" />
            <FaLinkedin className="socialicon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
