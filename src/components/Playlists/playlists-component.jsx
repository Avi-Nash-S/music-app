import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { addPlaylist } from "../../store/playlists/playlists.action";
import AddIcon from "@material-ui/icons/Add";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import NoData from "../NoData/noData-component";

const PlayLists = ({ history, match, playlists, addPlaylist }) => {
  const [displayPlaylist, setDisplayPlaylist] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  useEffect(() => {
    setDisplayPlaylist(playlists);
  }, [playlists, setDisplayPlaylist]);
  return (
    <>
      <div style={{ fontSize: "large", marginTop: "10px" }}>PlayLists</div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Input
          style={{ width: "90%" }}
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <AddIcon />
            </InputAdornment>
          }
          placeholder="Name"
          onChange={(e) => setPlaylistName(e.target.value)}
          value={playlistName}
        />
        <Button
          style={{ marginLeft: "10px" }}
          color="primary"
          onClick={() => {
            addPlaylist(playlistName);
          }}
        >
          Add
        </Button>
      </div>
      <div>
        {displayPlaylist.length > 0 ? (
          displayPlaylist.map((playlist, index) => (
            <Paper
              style={{ margin: "10px", padding: "40px", cursor: "pointer" }}
              key={index}
              onClick={() => history.push(`${match.path}/${playlist.id}`)}
            >
              <div elevation={3}>Playlist Name: {playlist.name || ""}</div>
              <div elevation={3}>Created At: {playlist.createdAt || ""}</div>
            </Paper>
          ))
        ) : (
          <NoData placeHolder={"Add Playlist to Enjoy!"} />
        )}
      </div>
    </>
  );
};

const mapStateToProps = (storeState) => ({
  playlists: storeState.playlists.playlists,
  loading: storeState.songs.pending,
});

const mapDispatchToProps = (dispatch) => ({
  addPlaylist: (name) => dispatch(addPlaylist(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayLists);
