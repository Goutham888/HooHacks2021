import React from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import pencils from "./pencils.png"; // Tell Webpack this JS file uses this image
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  content: {
    height: "calc(100vh - 64px)",
  },
  item: {
    marginY: theme.spacing(4),
  },
  searchbar: {
    padding: "4px 4px",
    display: "flex",
    alignItems: "center",
    width: 600,
    backgroundColor: theme.palette.background.default,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

export default function Transcribe() {
  const classes = useStyles();
  return (
    <Box bgcolor="primary.main" className="classes.content">
      <Box my={14} mx={2}>
        <AppBar />
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item className={classes.item}>
            <Box>
              <Typography variant="h1">
                Empower students
                <br />
                with ADHD
              </Typography>
            </Box>
          </Grid>
          <Grid item className={classes.item}>
            <img src={pencils} alt="logo" width={400} />
          </Grid>
        </Grid>
        <br />
        <Grid
          container
          direction="column"
          justify="space-between"
          alignItems="center"
        >
          <Typography variant="h3">Start using PencilBuds!</Typography>
          <Paper component="form" className={classes.searchbar}>
            <InputBase
              className={classes.input}
              placeholder="Enter YouTube link here"
              inputProps={{ "aria-label": "transcribe" }}
            />
            <IconButton
              type="submit"
              className={classes.iconButton}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
        <br />
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          spacing={4}
        >
          <Grid item className={classes.item}>
            <Box width="50%">
              <Typography variant="h3">
                Since COVID, much of the learning have turned online, and
                countless students learn by watching online video lectures.
                Video lectures on websites, like YouTube, not only are easy to
                access, but also provides quality education for free.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
