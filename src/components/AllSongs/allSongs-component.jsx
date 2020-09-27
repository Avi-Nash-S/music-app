import React, { useEffect } from "react";
import axios from "axios";

const AllSongs = ({ history }) => {
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/photos")
      .then((response) => console.log("Data :", response.data))
      .catch((err) => console.log("Error :", err));
  }, []);

  return <div onClick={() => history.push("/playlists")}>All Songs</div>;
};

export default AllSongs;
