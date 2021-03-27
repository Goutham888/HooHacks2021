import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import axios from "axios";

const drawerWidth = 400;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  title: {
    fontSize: 14,
  },
  drawerPaper: {
    width: 400,
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
    zIndex: theme.zIndex.appBar - 1,
  },
  toolbar: theme.mixins.toolbar,
}));

export default function Read(props) {
  const classes = useStyles();
  const [title, setTitle] = useState("TITLE HERE");
  const [content, setContent] = useState("CONTENT HERE");
  let paragraphs = 0;
  let words = 0;
  let pages = 0;
  let readingTime = 0;

  useEffect(() => {
    // The config info for axios request
    const config = {
      method: "get",
      // put the backend endpoint here
      url: "END_POINT_HERE",
      headers: {},
    };

    axios(config)
      .then((response) => {
        // get things from API
        setTitle(response.data.title);
        setContent(response.data.content);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Box my={8} mx={8} className={classes.content}>
        <Typography variant="h2">Notes: {title}</Typography>
        <div className={classes.paragraph}>
          <Typography variant="body1">{content}</Typography>
        </div>
      </Box>
      <nav className={classes.drawer}>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="right"
        >
          <div className={classes.toolbar} />
          <Box mx={4} my={4}>
            {/* video title */}
            <Typography variant="h5">{title}</Typography>
            <hr />
            <Typography variant="h5">Notes Info</Typography>
            <Typography variant="body1">{paragraphs} paragraphs</Typography>
            <Typography variant="body1">
              {words} words, {pages} pages
            </Typography>
            <Typography variant="body1">
              Reading time est.: {readingTime} min
            </Typography>
          </Box>
        </Drawer>
      </nav>
    </div>
  );
}
