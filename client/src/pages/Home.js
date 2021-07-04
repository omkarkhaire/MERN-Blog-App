import React from "react";
import axios from "axios";
import Header from "../Header";
import Posts from "../posts";
import Sidebar from "../sidebar";
import "./hone.css";
import { useLocation } from "react-router-dom";

const Home = () => {
  const [posts, setposts] = React.useState([]);
  console.log("useLocation=", useLocation());
  const { search } = useLocation();
  console.log(search);
  const fetchdata = async () => {
    var responce;
    if (search) {
      responce = await axios.get("/post" + search);
    } else {
      responce = await axios.get("/post");
      console.log("no search");
    }

    console.log("my responce=", responce);
    console.log("my actual responce=", responce.data);

    const actualdata = responce.data;
    setposts(actualdata);
  };

  React.useEffect(() => {
    fetchdata();
  }, [search]);

  return (
    <div className="mainhome">
      <Header />

      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </div>
  );
};

export default Home;
