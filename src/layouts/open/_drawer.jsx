import React from "react";
import Link from "next/link";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

export default function DrawerOpen() {
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <div>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer("left", true)}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        anchor="left"
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
      >
        <ul>
          <li>
            <Link href="/">
              <a>
                <label>Home</label>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a>
                <label>About</label>
              </a>
            </Link>
          </li>
        </ul>
      </Drawer>
    </div>
  );
}
