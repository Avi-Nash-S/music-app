import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { addPlaylist } from "../../store/playlists/playlists.action";

const PlayLists = ({ history, match, playlists, addPlaylist }) => {
  const [displayPlaylist, setDisplayPlaylist] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  useEffect(() => {
    setDisplayPlaylist(playlists);
  }, [playlists, setDisplayPlaylist]);
  return (
    <>
      <div onClick={() => history.push("/songs")}>PlayList</div>
      <input
        placeholder="Name"
        onChange={(e) => setPlaylistName(e.target.value)}
        value={playlistName}
      />
      <button
        onClick={() => {
          addPlaylist(playlistName);
        }}
      >
        Add
      </button>
      <div>
        {displayPlaylist.map((playlist, index) => (
          <ul
            key={index}
            onClick={() => history.push(`${match.path}/${playlist.id}`)}
          >
            <li>{playlist.name || ""}</li>
            <li>{playlist.createdAt || ""}</li>
          </ul>
        ))}
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
