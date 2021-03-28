import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import React, {useEffect, useState} from "react";
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
  const {id} = this.props.location;
  const classes = useStyles();
  const [title, setTitle] = useState("TITLE HERE");
  const [content, setContent] = useState("CONTENT HERE");
  let paragraphs = 0;
  let words = 0;
  let pages = 0;
  let readingTime = 0;

  useEffect(() => {
    // Make a GET request with a shorthand method
    const config = {
      method: "post",
      // put the backend endpoint here
      url: `http://127.0.0.1:8000/summarize/${id}`,
      headers: {},
    };


    axios(config)
        .then((response) => {
          console.log(id);
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
        <CssBaseline/>
        <Box my={4} mx={8} className={classes.content}>
          <div className={classes.toolbar}/>
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
            <div className={classes.toolbar}/>
            <Box mx={4} my={4}>
              {/* video title */}
              <Typography variant="h5">{title}</Typography>
              <hr/>
              <Typography variant="h5">Notes Info</Typography>
              <Typography variant="body1">{paragraphs} paragraphs</Typography>
              <Typography variant="body1">
                {words} words, {pages} pages
              </Typography>
              <Typography variant="body1">
                Reading time est.: {readingTime} minutes
              </Typography>
            </Box>
          </Drawer>
        </nav>
      </div>
  );
}
