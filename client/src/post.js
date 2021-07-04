import React from "react";
import "./post.css";
import image from "./assets/3125988.jpg";
import { Link } from "react-router-dom";
const Post = ({ categories, _id, titel, desc, photo, username, createdAt }) => {
  const pf = "http://localhost:5000/images/";

  return (
    <Link
      to={`/post/${_id}`}
      style={{ textDecoration: "none", color: "black" }}
    >
      <div className="mainpost">
        <img src={pf + photo || image} alt="mainimage" className="mainimage1" />
        <div className="info">
          <div className="postcategory">
            {categories.map((cat, index) => {
              return (
                <span key={index} className="postcat">
                  {cat}
                </span>
              );
            })}
          </div>
          <span className="posttitel">{titel}</span>
          <hr />
          <span className="postdate">{new Date(createdAt).toDateString()}</span>
        </div>
        <p className="post-description">{desc}</p>
      </div>
    </Link>
  );
};

export default Post;
