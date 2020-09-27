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

  const filterSongs = (query) => {
    const filteredSongs = songs.filter((song) =>
      song.title.includes(query || "")
    );
    setAllSongs(filteredSongs);
  };

  return (
    <>
      <div onClick={() => history.push("/playlists")}>All Songs</div>
      <input
        placeholder="Search..."
        onChange={(e) => filterSongs(e.target.value)}
      />
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
