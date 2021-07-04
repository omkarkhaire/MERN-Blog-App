import React from "react";
import Post from "./post";
import "./posts.css";

export const Posts = ({ posts }) => {
  if (posts.length <= 0) {
    return (
      <div
        className="mainposts"
        style={{ marginTop: "2rem", fontSize: "1rem" }}
      >
        <h4> Sorry! No Posts found</h4>
      </div>
    );
  }
  return (
    <div className="mainposts">
      {posts.map((post, index) => {
        return <Post key={index} {...post} />;
      })}
    </div>
    // { categories, _id, titel, desc, photo, username }
  );
};
export default Posts;
