import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import { useWindowSize } from "@react-hook/window-size";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignContent: "center",
    justifyContent: "space-between",
    margin: "10px",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 151,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export default function MediaControlCard({
  title,
  media,
  addSong,
  deleteSong,
  song,
  type = false,
}) {
  const [width] = useWindowSize();
  const breakPoint = width > 500;
  const classes = useStyles();
  const theme = useTheme();
  const MAPPER_TYPE = {
    add: <AddIcon onClick={() => addSong(song)} />,
    remove: <DeleteIcon onClick={() => deleteSong(song)} />,
  };

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography
            component="h5"
            variant="h5"
            style={{
              textOverflow: "ellipsis",
              WebkitLineClamp: "1",
              overflow: "hidden",
              whiteSpace: "nowrap",
              width: "40vw",
            }}
          >
            <Tooltip title={title}>
              <span>{title}</span>
            </Tooltip>
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Stream Music
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          <IconButton aria-label="previous">
            {theme.direction === "rtl" ? (
              <SkipNextIcon />
            ) : (
              <SkipPreviousIcon />
            )}
          </IconButton>
          <IconButton aria-label="play/pause">
            <PlayArrowIcon className={classes.playIcon} />
          </IconButton>
          <IconButton aria-label="next">
            {theme.direction === "rtl" ? (
              <SkipPreviousIcon />
            ) : (
              <SkipNextIcon />
            )}
          </IconButton>
        </div>
      </div>
      {breakPoint && (
        <div
          style={{
            boxSizing: "initial",
            display: "flex",
            alignSelf: "center",
            marginRight: "10px",
          }}
        >
          {!type ? (
            <img
              style={{
                height: "150px",
                width: "150px",
                borderRadius: "5px",
                boxShadow: "2px 2px 8px 0px #00000070",
              }}
              src={`${media}`}
              alt="Img"
            />
          ) : (
            <span style={{ padding: "20px", cursor: "pointer" }}>
              {MAPPER_TYPE[type]}
            </span>
          )}
        </div>
      )}
    </Card>
  );
}
