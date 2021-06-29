import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import bgImage from "../assets/img/bg-img.png";
import bubbleImage from "../assets/img/bubble.svg";

const useStyles = makeStyles((theme) => ({
  sideBanner: {
    paddingBottom: "10vh",
    maxWidth: "40vw",
    [theme.breakpoints.down("xs")]: {
      maxWidth: "0px",
    },
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage:
      "linear-gradient(to bottom, rgba(58, 141, 255, .85), rgba(134, 185, 255, 0.85)), url(" +
      bgImage +
      ")",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "top",
  },
  bannerText: {
    paddingTop: "2vh",
    color: "white",
    fontWeight: "600",
    lineHeight: "1",
    letterSpacing: 0.2,
    fontSize: 35,
    [theme.breakpoints.down("md")]: {
      fontSize: 20,
    },
  },
  bannerIcon: {
    paddingBottom: "2vh",
    width: "85px",
    [theme.breakpoints.down("md")]: {
      width: "60px",
    },
  },
}));

const SideBanner = (props) => {
  const classes = useStyles();

  return (
    <Grid container item xs={false} sm={6} className={classes.sideBanner}>
      <Grid item>
        <img
          src={bubbleImage}
          alt="bubble icon"
          className={classes.bannerIcon}
        ></img>
      </Grid>
      <Grid item>
        <Typography className={classes.bannerText}>
          Converse with anyone
        </Typography>
      </Grid>
      <Grid item>
        <Typography className={classes.bannerText}>
          with any language
        </Typography>
      </Grid>
    </Grid>
  );
};

export default SideBanner;
