import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getSongs } from "../../store/songs/songs.action";
import { debounceFunc } from "../../utils/helper";
import MediaControlCard from "../SongCard/songCard-component";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import InfiniteScroll from "react-infinite-scroll-component";

const AllSongs = ({ songs, getSongs }) => {
  const [allSongs, setAllSongs] = useState([]);
  const [count, setCount] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [current, setCurrent] = useState([]);
  const getMoreData = () => {
    if (current.length === allSongs.length) {
      setHasMore(false);
      return;
    }


    setCurrent(
      current.concat(allSongs.slice(count.prev + 100, count.next + 100))
    );

    setCount((prevState) => ({
      prev: prevState.prev + 100,
      next: prevState.next + 100,
    }));
  };

  useEffect(() => {
    getSongs();
  }, [getSongs]);

  useEffect(() => {
    setAllSongs(songs);
  }, [songs]);

  useEffect(() => {
    setCount({
      prev: 0,
      next: 100,
    });
    setHasMore(true);
    setCurrent(allSongs.slice(0, 100));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allSongs]);

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
      <div style={{ fontSize: "large", marginTop: "10px" }}>All Songs</div>
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
                media={song.thumbnailUrl}
              />
            ))}
        </div>
      </InfiniteScroll>
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
