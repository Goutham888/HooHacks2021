import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";

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

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Box my={8} mx={8} className={classes.content}>
        <Typography variant="h2">
          Notes: MIT 6.042, Discrete Mathematics
        </Typography>
        <div className={classes.paragraph}>
          <Typography variant="body1">
            <PageContent />
          </Typography>
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
            <Typography variant="h5">MIT 6.042 Discrete Mathematics</Typography>

            <hr />
            <Typography variant="h5">Notes Info</Typography>
            <Typography variant="body1">11 paragraphs</Typography>
            <Typography variant="body1">659 words, 2 pages</Typography>
            <Typography variant="body1">Reading time est.: 3 min</Typography>
          </Box>
        </Drawer>
      </nav>
    </div>
  );
}
