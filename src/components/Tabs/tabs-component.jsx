import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function CenteredTabs({ history }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    history.location.pathname.includes("/playlists")
      ? setValue(1)
      : setValue(0);
  }, [history.location.pathname]);

  const handleChange = (event, newValue) => {
    if (newValue) {
      history.push("/playlists");
    } else {
      history.push("/songs");
    }
  };

  return (
    <div className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Songs" />
        <Tab label="Playlists" />
      </Tabs>
    </div>
  );
}
