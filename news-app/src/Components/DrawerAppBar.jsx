import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";

const drawerWidth = 240;
const navItems = [
  { NavItem: "General", NavURL: "/" },
  { NavItem: "Business", NavURL: "/Business" },
  { NavItem: "Education", NavURL: "/Education" },
  { NavItem: "Science", NavURL: "/Science" },
  { NavItem: "Technology", NavURL: "/Technology" },
  { NavItem: "Health", NavURL: "/Health" },
  { NavItem: "Entertainment", NavURL: "/Entertainment" },
];

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen); // Great Logic To Toggle The Boolean-Values
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        News App
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <NavLink
            key={item.NavItem}
            to={item.NavURL}
            style={{ textDecoration: "none", color: "black" }}
          >
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary={item.NavItem} />
              </ListItemButton>
            </ListItem>
          </NavLink>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", margin: "3rem", bgcolor: "green" }}>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            News App
          </Typography>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              flexWrap: "wrap",
              flexDirection: "row",
              gap: 1,
            }}
          >
            {navItems.map((item) => (
              <NavLink
                key={item.NavItem}
                style={{ textDecoration: "none" }}
                to={item.NavURL}
              >
                {/* <Button disableFocusRipple={false} sx={{ color: '#fff', px: 2 }}>
                  {item} 
                </Button> */}

                <Button
                  disableFocusRipple={true}
                  variant="text"
                  size="small"
                  sx={{
                    bgcolor: "primary.main",
                    color: "#fff",
                    fontSize: "0.8rem",
                  }}
                >
                  {item.NavItem}
                </Button>
              </NavLink>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
