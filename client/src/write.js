import React from "react";
import { FaImage } from "react-icons/fa";
import "./write.css";
// import image from "./assets/3125988.jpg";
import axios from "axios";
import { context } from "./context/context";
// var image;
const Write = () => {
  const { user } = React.useContext(context);
  const [file, setfile] = React.useState(null);
  const [titel, settitel] = React.useState("");
  const [cat, setcat] = React.useState("");

  const [desc, setdesc] = React.useState("");
  const handelsubmit = async (e) => {
    e.preventDefault();
    var newpost = {
      titel,
      desc,
      username: user.username,
      categories: cat,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newpost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (error) {
        console.log("error in uploading photo" + error);
      }
    }
    try {
      const responce = await axios.post("/post/create", newpost);
      window.location.replace(`/post/${responce.data._id}`);
    } catch (error) {}
  };

  return (
    <div className="mainwrite">
      <h3>Write Your Blog</h3>
      <div className="imagediv">
        {file && (
          <img
            src={URL.createObjectURL(file)}
            alt="loading..."
            className="myimage"
          />
        )}
      </div>
      <form className="writeform" onSubmit={handelsubmit}>
        <div className="writeformgroup">
          <label htmlFor="image">
            <FaImage className="iconimg" />
            Add Image
          </label>
          <input
            type="file"
            name="image"
            id="image"
            onChange={(e) => setfile(e.target.files[0])}
            className="writeinput"
            style={{ display: "none" }}
          />
          <input
            type="text"
            placeholder="Add Titel"
            className="writeinput"
            value={titel}
            onChange={(e) => settitel(e.target.value)}
            autoFocus={true}
            required
          />
          <input
            type="text"
            placeholder="Add Category"
            className="writeinput"
            value={cat}
            required
            onChange={(e) => setcat(e.target.value)}
            autoFocus={true}
          />
        </div>
        <div className="writeformgroup desc">
          <textarea
            placeholder="tell your story"
            className="writeinput writetext"
            value={desc}
            onChange={(e) => setdesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writesubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
};

export default Write;
