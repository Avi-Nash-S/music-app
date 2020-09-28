import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getPlaylist,
  addSongsToPlaylist,
  removeSongsFromPlaylist,
} from "../../store/playlists/playlists.action";
import { getSongs } from "../../store/songs/songs.action";
import { debounceFunc, shuffleArray } from "../../utils/helper";
import MediaControlCard from "../SongCard/songCard-component";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import InfiniteScroll from "react-infinite-scroll-component";
import NoData from "../NoData/noData-component";

function PlaylistDetails({
  match,
  getPlaylist,
  selectedPlaylist,
  addSongsToPlaylist,
  removeSongsFromPlaylist,
  songs,
  getSongs,
  history,
  playlists,
}) {
  const [songsList, setSongsList] = useState(null);
  const [toggleSearch, setToggleSearch] = useState(false);
  const [allSongs, setAllSongs] = useState([]);
  const [count, setCount] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [current, setCurrent] = useState([]);
  const getMoreData = () => {
    if (current.length === allSongs.length) {
      setHasMore(false);
      return;
    }
    // Mock Loading...
    setTimeout(() => {
      setCurrent(
        current.concat(allSongs.slice(count.prev + 100, count.next + 100))
      );
    }, 1000);
    setCount((prevState) => ({
      prev: prevState.prev + 100,
      next: prevState.next + 100,
    }));
  };

  useEffect(() => {
    setCount({
      prev: 0,
      next: 100,
    });
    setHasMore(true);
    setCurrent(allSongs.slice(0, 100));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allSongs]);

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
    if (playlists && playlists.length > 0) {
      getPlaylist(match.params.id);
    } else {
      history.replace("/playlists");
    }
  }, [match.params.id, getPlaylist, playlists, history]);

  useEffect(() => {
    const temp = selectedPlaylist ? selectedPlaylist.playlistSongs : [];
    const sortedList = temp.sort((a, b) => a.addedAt - b.addedAt);
    setSongsList({ ...selectedPlaylist, playlistSongs: sortedList });
  }, [selectedPlaylist]);

  const localShuffle = (songslist) => {
    const temp = songsList.playlistSongs;
    const shuffledList = shuffleArray(temp);
    return { ...songslist, playlistSongs: shuffledList };
  };
  return (
    <>
      <div style={{ fontSize: "large", marginTop: "10px" }}>
        PlayList Details
      </div>
      <Button
        style={{ float: "right" }}
        onClick={() => setToggleSearch((prevState) => !prevState)}
      >
        {toggleSearch ? "Back" : "Add Songs"}
      </Button>
      {!toggleSearch ? (
        <>
          <Button
            style={{ float: "right" }}
            onClick={() => history.push("/playlists")}
          >
            {"Back"}
          </Button>
          <Button
            style={{ float: "right" }}
            onClick={() => setSongsList((prevState) => localShuffle(prevState))}
          >
            Shuffle
          </Button>
          <div style={{ clear: "both" }} />
          {songsList &&
          songsList.playlistSongs &&
          songsList.playlistSongs.length > 0 ? (
            songsList.playlistSongs.map((selectedSong, index) => (
              <MediaControlCard
                key={index}
                title={selectedSong.title}
                deleteSong={removeSongsFromPlaylist}
                song={selectedSong.id}
                type={"remove"}
              />
            ))
          ) : (
            <NoData placeHolder={"Add Songs to Enjoy!"} />
          )}
        </>
      ) : (
        <>
          <Input
            style={{ width: "100%" }}
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            placeholder="Search..."
            onChange={(e) => onSearch(e.target.value)}
            disabled={songs && !songs.length}
          />
          <div>
            <InfiniteScroll
              dataLength={current.length}
              next={getMoreData}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>}
            >
              <div>
                {current &&
                  current.map((song, index) => (
                    <MediaControlCard
                      key={index}
                      title={song.title}
                      addSong={addSongsToPlaylist}
                      song={song}
                      type={"add"}
                    />
                  ))}
              </div>
            </InfiniteScroll>
          </div>
        </>
      )}
    </>
  );
}

const mapStateToProps = (storeState) => ({
  playlists: storeState.playlists.playlists,
  selectedPlaylist: storeState.playlists.selectedPlaylist,
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
