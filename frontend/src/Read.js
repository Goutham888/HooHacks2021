import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import Chip from "@material-ui/core/Chip";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const drawerWidth = 320;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  title: {
    fontSize: 14,
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
    zIndex: theme.zIndex.appBar - 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    padding: theme.spacing(2),
    height: "100%",
  },
  closeMenuButton: {
    marginRight: "auto",
    marginLeft: 0,
  },
  error: {
    color: theme.palette.getContrastText(theme.palette.primary.main),
    backgroundColor: theme.palette.primary.main,
  },
  progress: {
    color: theme.palette.getContrastText(theme.palette.error.main),
    backgroundColor: theme.palette.error.main,
  },
}));

function PageContent() {
  const classes = useStyles();
  return (
    <div>
      Gregor Samsa wakes up one morning to find himself transformed into a
      "monstrous vermin". He initially considers the transformation to be
      temporary and slowly ponders the consequences of this metamorphosis.
      Unable to get up and leave the bed, Gregor reflects on his job as a
      traveling salesman and cloth merchant, which he characterizes as being
      full of "temporary and constantly changing human relationships, which
      never come from the heart". He sees his employer as a despot and would
      quickly quit his job had he not been his family's sole breadwinner and
      working off his bankrupt father's debts. While trying to move, Gregor
      finds that his office manager, the chief clerk, has shown up to check on
      him, indignant about Gregor's unexcused absence. Gregor attempts to
      communicate with both the manager and his family, but all they can hear
      from behind the door is incomprehensible vocalizations. Gregor laboriously
      drags himself across the floor and opens the door. The manager, upon
      seeing the transformed Gregor, flees the apartment. Gregor's family is
      horrified, and his father drives him back into his room under the threat
      of violence. Gregor Samsa wakes up one morning to find himself transformed
      into a "monstrous vermin". He initially considers the transformation to be
      temporary and slowly ponders the consequences of this metamorphosis.
      Unable to get up and leave the bed, Gregor reflects on his job as a
      traveling salesman and cloth merchant, which he characterizes as being
      full of "temporary and constantly changing human relationships, which
      never come from the heart". He sees his employer as a despot and would
      quickly quit his job had he not been his family's sole breadwinner and
      working off his bankrupt father's debts. While trying to move, Gregor
      finds that his office manager, the chief clerk, has shown up to check on
      him, indignant about Gregor's unexcused absence. Gregor attempts to
      communicate with both the manager and his family, but all they can hear
      from behind the door is incomprehensible vocalizations. Gregor laboriously
      drags himself across the floor and opens the door. The manager, upon
      seeing the transformed Gregor, flees the apartment. Gregor's family is
      horrified, and his father drives him back into his room under the threat
      of violence. Gregor Samsa wakes up one morning to find himself transformed
      into a "monstrous vermin". He initially considers the transformation to be
      temporary and slowly ponders the consequences of this metamorphosis.
      Unable to get up and leave the bed, Gregor reflects on his job as a
      traveling salesman and cloth merchant, which he characterizes as being
      full of "temporary and constantly changing human relationships, which
      never come from the heart". He sees his employer as a despot and would
      quickly quit his job had he not been his family's sole breadwinner and
      working off his bankrupt father's debts. While trying to move, Gregor
      finds that his office manager, the chief clerk, has shown up to check on
      him, indignant about Gregor's unexcused absence. Gregor attempts to
      communicate with both the manager and his family, but all they can hear
      from behind the door is incomprehensible vocalizations. Gregor laboriously
      drags himself across the floor and opens the door. The manager, upon
      seeing the transformed Gregor, flees the apartment. Gregor's family is
      horrified, and his father drives him back into his room under the threat
      of violence.
    </div>
  );
}

export default function Read(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [word, setWord] = useState("Init word");
  const [phonetic_symbols, setPhoneticSymbols] = useState("Init symbol");
  const [id, setId] = useState(0);

  useEffect(() => {
    // The config info for axios request
    const config = {
      method: "get",
      url: "http://127.0.0.1:8000/items/" + id,
      headers: {},
    };

    // request the data from server, using the word object ID
    axios(config)
      .then((response) => {
        console.log(response);
        // this.setState({
        //     word: response.data.word,
        //     phonetic_symbols: response.data.phonetic_symbols,
        //     // definition: response.data.definition,
        // })
        setWord(response.data.word);
        setPhoneticSymbols(response.data.phonetic_symbols);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Box my={8} mx={8} className={classes.content}>
        <h1>Summary</h1>
        <div className={classes.paragraph}>
          <Typography variant="body1">
            <PageContent />
          </Typography>
        </div>
      </Box>
      <nav className={classes.drawer}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <IconButton
              onClick={handleDrawerToggle}
              className={classes.closeMenuButton}
            >
              <CloseIcon />
            </IconButton>
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
            anchor="right"
          >
            <div className={classes.toolbar} />
            <Box mx={4}></Box>
          </Drawer>
        </Hidden>
      </nav>
      {/*<div className={classes.content}>*/}
      {/*    <div className={classes.toolbar}/>*/}
      {/*    /!*<VisibleItemList />*!/*/}
      {/*</div>*/}
    </div>
  );
}

Read.propTypes = {
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
};
