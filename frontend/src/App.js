import TopBar from "./components/TopBar";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

import { Route, Switch } from "react-router-dom";
import Transcribe from "./Transcribe";
import Read from "./Read";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import Profile from "./Profile";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    flexGrow: 1,
  },
}));

const Main = () => {
  return (
    // The Switch decides which component to show based on the current URL.
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/transcribe" component={Transcribe} />
      <Route exact path="/read" component={Read} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/sign-in" component={Login} />
      <Route exact path="/sign-up" component={Signup} />
    </Switch>
  );
};

export default function App() {
  const classes = useStyles();

  return (
    <Box className={classes.root} bgcolor="primary.main">
      <TopBar />
      <Main />
    </Box>
  );
}
