import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getSongs } from "../../store/songs/songs.action";
import { debounceFunc } from "../../utils/helper";

const AllSongs = ({ history, songs, getSongs }) => {
  const [allSongs, setAllSongs] = useState([]);

  useEffect(() => {
    getSongs();
  }, [getSongs]);

  useEffect(() => {
    setAllSongs(songs);
  }, [songs]);

  const filterSongs = (value) => {
    const query = value ? value.toLowerCase() : "";
    const filteredSongs = songs.filter((song) => {
      const title = song && song.title ? song.title.toLowerCase() : "";
      return title.includes(query);
    });
    setAllSongs(filteredSongs);
  };

  const onSearch = debounceFunc(filterSongs, 500);

  return (
    <>
      <div onClick={() => history.push("/playlists")}>All Songs</div>
      <input
        placeholder="Search..."
        onChange={(e) => onSearch(e.target.value)}
        disabled={songs && !songs.length}
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
