import { AppBar, Toolbar } from "@material-ui/core";
import Favorites from "./Favorites";
import Logo from "../components/Logo";
import SearchBar from "../components/SearchBar";

const Header = ({ testing = false }) => (
  <AppBar position="static">
    <Toolbar>
      <Logo />
      <SearchBar testing={testing} />
      <Favorites />
    </Toolbar>
  </AppBar>
);

export default Header;
