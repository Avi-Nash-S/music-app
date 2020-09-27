import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getSongs } from "../../store/songs/songs.action";

const AllSongs = ({ history, songs, getSongs }) => {
  const [allSongs, setAllSongs] = useState([]);

  useEffect(() => {
    getSongs();
  }, [getSongs]);

  useEffect(() => {
    setAllSongs(songs);
  }, [songs]);

  return (
    <>
      <div onClick={() => history.push("/playlists")}>All Songs</div>
      <div>
        <ul>
          {allSongs.map((song, index) => (
            <li key={index}>{song.url}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

const mapStateToProps = (storeState) => ({
  songs: storeState.songs.songs,
  loading: storeState.songs.pending,
});

const mapDispatchToProps = (dispatch) => ({
  getSongs: () => dispatch(getSongs()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllSongs);
