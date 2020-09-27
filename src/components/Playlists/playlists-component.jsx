import React from "react";

const PlayLists = ({ history }) => {
  return <div onClick={() => history.push("/songs")}>PlayList</div>;
};

export default PlayLists;
