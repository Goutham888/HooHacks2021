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
  button: {
    padding: 10,
    backgroundColor: theme.palette.secondary.main,
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
          <Grid item>
            <Box>
              <Typography variant="h1">
                Empower students
                <br />
                with ADHD
              </Typography>
            </Box>
          </Grid>
          <Grid item>
            <img src={pencils} alt="logo" width={400} />
          </Grid>
        </Grid>
        <Box mt={8} display="flex" justifyContent="center" alignItems="center">
          <Paper component="form" className={classes.searchbar}>
            <InputBase
              className={classes.input}
              placeholder="YouTube link here"
              inputProps={{ "aria-label": "transcribe" }}
            />
            <Button
              type="submit"
              className={classes.button}
              aria-label="search"
            >
              Transcribe
            </Button>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
