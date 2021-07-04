import "./singlepost.css";
import React, { useContext } from "react";
import image from "../assets/3125988.jpg";
import { useParams } from "react-router";
import { FaEdit, FaEraser } from "react-icons/fa";
import { BsTrash } from "react-icons/bs";
import axios from "axios";
import { Link } from "react-router-dom";
import { context } from "../context/context";

const Singlepost = () => {
  const [data, setdata] = React.useState({});
  const { postId } = useParams();
  console.log("use Params()=", useParams());
  const { user } = useContext(context);

  // editing data
  const [titel, settitel] = React.useState("");
  const [desc, setdesc] = React.useState("");
  const [transform, settransform] = React.useState(false);

  React.useEffect(() => {
    const fetchdata = async () => {
      const responce = await axios.get(`/post/${postId}`);
      setdata(responce.data);
      settitel(responce.data.titel);
      setdesc(responce.data.desc);

      console.log(responce.data);
    };
    fetchdata();
  }, [postId]);

  console.log(postId);
  const pf = "http://localhost:5000/images/"; //for images
  const handeldelete = async () => {
    try {
      console.log("delete clicked");
      await axios.delete(`/post/${postId}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (error) {
      console.log("error in deleting");
    }
  };
  const updatedata = () => {
    try {
      axios.put(`/post/${postId}`, {
        ...data,
        titel,
        desc,
      });
      // window.location.replace(`/post/${postId}`);
      window.location.reload();
    } catch (error) {
      console.log("error in deletion");
    }
  };

  return (
    <div className="mainsinglepost">
      <div className="singlepostwrapper">
        <img src={pf + data.photo} alt="img loading" className="mainimage" />
      </div>
      {transform ? (
        <div className="edittitelbox">
          <button
            className="cancelbtn"
            onClick={() => settransform(!transform)}
          >
            cancel
          </button>
          <input
            type="text"
            value={titel}
            className="edittitelinput"
            onChange={(e) => settitel(e.target.value)}
          />
          <button className="updatebtn" onClick={() => updatedata()}>
            Update
          </button>
        </div>
      ) : (
        <h1 className="titel">
          {data.titel}

          {data.username === user.username && (
            <div className="edit">
              <FaEdit className="icon" onClick={() => settransform(true)} />
              <BsTrash
                className="icon"
                onClick={() => {
                  handeldelete();
                }}
              />
            </div>
          )}
        </h1>
      )}

      <div className="postinfo">
        <span className="author">
          Author:
          <Link
            to={`/?username=${data.username}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <b>{data.username}</b>
          </Link>
        </span>
        <span className="date">{new Date(data.createdAt).toDateString()}</span>
      </div>
      {transform ? (
        <textarea
          value={desc}
          className="descriptiontransformed"
          onChange={(e) => setdesc(e.target.value)}
        />
      ) : (
        <p className="description">{data.desc}</p>
      )}
    </div>
  );
};

export default Singlepost;
