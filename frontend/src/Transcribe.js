import React from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  content: {
    height: "calc(100vh - 64px)",
  },
}));

export default function Transcribe() {
  const classes = useStyles();
  return (
    <Box my={12} mx={9} className="classes.content">
      <h1>This is the Transcribe page!</h1>
    </Box>
  );
}
