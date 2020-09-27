import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getPlaylist,
  addSongsToPlaylist,
  removeSongsFromPlaylist,
} from "../../store/playlists/playlists.action";
import { getSongs } from "../../store/songs/songs.action";
import { debounceFunc, shuffleArray } from "../../utils/helper";

function PlaylistDetails({
  match,
  getPlaylist,
  playlist,
  history,
  addSongsToPlaylist,
  removeSongsFromPlaylist,
  songs,
  getSongs,
}) {
  const [songsList, setSongsList] = useState(null);
  const [toggleSearch, setToggleSearch] = useState(false);
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

  useEffect(() => {
    getPlaylist(match.params.id);
  }, [match.params.id, getPlaylist]);

  useEffect(() => {
    setSongsList(playlist);
  }, [playlist]);

  const localShuffle = (songslist) => {
    const temp = songsList.playlistSongs;
    const shuffledList = shuffleArray(temp);
    return { ...songslist, playlistSongs: shuffledList };
  };
  return (
    <>
      <div onClick={() => history.push("/playlists")}>
        PlayList Details of {match.params.id}
      </div>
      <button onClick={() => setToggleSearch((prevState) => !prevState)}>
        Toggle
      </button>
      <button
        onClick={() => setSongsList((prevState) => localShuffle(prevState))}
      >
        Shuffle
      </button>
      {!toggleSearch ? (
        <>
          <>{songsList ? songsList.id : ""}</>
          {songsList && songsList.playlistSongs ? (
            songsList.playlistSongs.map((selectedSong, index) => (
              <ul key={index}>
                <li
                  id={selectedSong.id}
                  onClick={(e) => removeSongsFromPlaylist(e.target.id)}
                >
                  {selectedSong ? selectedSong.title : ""}
                </li>
              </ul>
            ))
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          <input
            placeholder="Search..."
            onChange={(e) => onSearch(e.target.value)}
            disabled={songs && !songs.length}
          />
          <div>
            <ul>
              {allSongs.map((song, index) => (
                <li key={index} onClick={() => addSongsToPlaylist(song)}>
                  {song.url}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
}

const mapStateToProps = (storeState) => ({
  playlist: storeState.playlists.selectedPlaylist,
  songs: storeState.songs.songs,
  loading: storeState.playlists.pending,
});

const mapDispatchToProps = (dispatch) => ({
  getPlaylist: (id) => dispatch(getPlaylist(id)),
  addSongsToPlaylist: (song) => dispatch(addSongsToPlaylist(song)),
  removeSongsFromPlaylist: (id) => dispatch(removeSongsFromPlaylist(id)),
  getSongs: () => dispatch(getSongs()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistDetails);
