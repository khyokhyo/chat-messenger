import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 14,
    color: "#9CADC8",
    letterSpacing: -0.17,
    fontWeight: "bold",
  },
  previewTextUnread: {
    fontSize: 14,
    letterSpacing: -0.17,
    fontWeight: "bold",
  },
  notification: {
    float: "right",
    height: 20,
    width: "fit-content",
    padding: 8,
    backgroundColor: "#3F92FF",
    marginRight: 10,
    color: "white",
    fontSize: 12,
    letterSpacing: -0.5,
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: "1vh",
    textShadow: ".3px .3px .3px",
  },
}));

const ChatContent = (props) => {
  const classes = useStyles();

  const { conversation } = props;
  const { latestMessageText, otherUser, unreadMessageCount } = conversation;

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        {unreadMessageCount ? (
          <Typography className={classes.previewTextUnread}>
            {latestMessageText}
          </Typography>
        ) : (
          <Typography className={classes.previewText}>
            {latestMessageText}
          </Typography>
        )}
      </Box>
      {unreadMessageCount ? (
        <Typography className={classes.notification}>
          {unreadMessageCount}
        </Typography>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default ChatContent;
