import { makeStyles, withStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
  },
  authContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "10vh",
    minWidth: "60vw",
    [theme.breakpoints.down("xs")]: {
      minWidth: "100vw",
    },
  },
  authHeader: {
    display: "flex",
    flexDirection: "row-reverse",
  },
  headerButton: {
    margin: "20px",
    padding: "15px",
    paddingLeft: "3vw",
    paddingRight: "3vw",
    color: "#3A8DFF",
    boxShadow: "2px 2px 5px 1px rgba(88,133,196,0.5)",
    fontSize: 18,
    [theme.breakpoints.down("md")]: {
      fontSize: 12,
    },
  },
  headerText: {
    marginTop: "35px",
    color: "#B0B0B0",
    fontWeight: "600",
    fontSize: 18,
    letterSpacing: -0.5,
    [theme.breakpoints.down("md")]: {
      fontSize: 12,
    },
  },
  authFormContainer: {
    minHeight: "80vh",
    [theme.breakpoints.down("xs")]: {
      minHeight: "10vh",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifySelf: "center",
    justifyContent: "center",
  },
  authForm: {
    flexDirection: "column",
    justifyContent: "center",
    justifySelf: "center",
    width: "30vw",
    [theme.breakpoints.down("xs")]: {
      width: "70vw",
    },
  },
  formTitleText: {
    fontWeight: "600",
    fontSize: 35,
    [theme.breakpoints.down("md")]: {
      fontSize: 24,
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: 18,
    },
  },
  formButton: {
    display: "grid",
    margin: "5vh",
    marginLeft: "10vw",
    marginRight: "10vw",
    padding: "15px",
    paddingLeft: "5vw",
    paddingRight: "5vw",
    color: "white",
    background: "#3A8DFF",
    fontFamily: "sans-serif",
    fontSize: 18,
    [theme.breakpoints.down("md")]: {
      fontSize: 12,
    },
    "&:hover": {
      background: "#86B9FF",
    },
  },
  formInput: {
    height: "5vh",
    padding: "5px",
    fontWeight: "600",
    fontSize: 20,
    letterSpacing: -0.2,
    [theme.breakpoints.down("md")]: {
      fontSize: 14,
    },
  },
}));

const CssTextField = withStyles((theme) => ({
  root: {
    "& .MuiFormLabel-root": {
      paddingLeft: "5px",
      color: "#B0B0B0",
      fontSize: 18,
      [theme.breakpoints.down("md")]: {
        fontSize: 14,
      },
    },
    "& label.Mui-focused": {
      paddingLeft: "5px",
      color: "#B0B0B0",
      fontWeight: "600",
      fontSize: 18,
      [theme.breakpoints.down("md")]: {
        fontSize: 14,
      },
    },
  },
}))(TextField);

export { useStyles, CssTextField };
