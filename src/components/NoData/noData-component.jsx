import React from "react";
import NoDataImage from "../../static/play.svg";

function NoData({ placeHolder }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "150px",
        flexDirection: "column",
      }}
    >
      <img
        src={NoDataImage}
        style={{ height: "150px", width: "150px" }}
        alt="No Playlist Found"
      />
      <div style={{ marginTop: "10px" }}>{placeHolder}</div>
    </div>
  );
}

export default NoData;
