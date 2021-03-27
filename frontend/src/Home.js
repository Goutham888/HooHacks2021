import React from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import pencils from "./pencils.png"; // Tell Webpack this JS file uses this image

const useStyles = makeStyles((theme) => ({
  content: {
    height: "calc(100vh - 64px)",
  },
}));

export default function Transcribe() {
  const classes = useStyles();
  return (
    <Box my={12} mx={2}>
      <AppBar />
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item>
          <Box className="classes.content">
            <Typography variant="h1">
              Empower students
              <br />
              with ADHD
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <img src={pencils} alt="logo" width={340} />
        </Grid>
      </Grid>
    </Box>
  );
}
