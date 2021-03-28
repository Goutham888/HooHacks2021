import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    textTransform: "None",
  },
}));

export default function TopBar() {
  const classes = useStyles();
  const menuId = "account-menu";
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose} component={Link} to={"/sign-up"}>
        Sign up
      </MenuItem>
      <MenuItem onClick={handleMenuClose} component={Link} to={"/log-in"}>
        Log in
      </MenuItem>
      <MenuItem onClick={handleMenuClose} component={Link} to={"/profile"}>
        Profile
      </MenuItem>
    </Menu>
  );

  return (
    <div>
      <AppBar position="fixed" elevation={0}>
        <Toolbar>
          <Button color="inherit" component={Link} to={"/"}>
            <Typography variant="h6" className={classes.title}>
              PencilBuds
            </Typography>
          </Button>
          <Grid container justify="flex-end">
            {/* <Button color="inherit" component={Link} to={"/transcribe"}>
              <Typography variant="h7"> Transcribe</Typography>
            </Button>
            <Button color="inherit" component={Link} to={"/read"}>
              <Typography variant="h7"> Read</Typography>
            </Button> */}
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Grid>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
}
