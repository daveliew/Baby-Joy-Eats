import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { green, blue } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    background: `linear-gradient(45 deg, #FE6B8B, #FF8ES3)`,
    padding: `0 30px`,
  },
  container: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  icon: {
    marginRight: `1rem`,
  },
  buttons: {
    marginTop: `1rem`,
  },
}));

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: green[500],
    },
    seconday: {
      main: blue[500],
    },
  },
});

export default useStyles;
