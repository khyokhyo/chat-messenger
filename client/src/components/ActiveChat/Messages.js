import { React, useMemo, useRef } from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const useStyles = makeStyles(() => ({
  messageEnd: {
    marginBottom: "40px",
  },
}));

const Messages = (props) => {
  const classes = useStyles();
  const { messages, otherUser, userId } = props;
  const sortedMessages = useMemo(() => sortMessages(messages), [otherUser]);

  const messagesEndRef = useRef();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  scrollToBottom();

  return (
    <Box>
      {sortedMessages.map((message, index, messageArray) => {
        const time = moment(message.createdAt).format("h:mm");
        const isLastMessage = index === messageArray.length - 1;
        return (
          <>
            {message.senderId === userId ? (
              <SenderBubble
                key={message.id}
                text={message.text}
                time={time}
                otherUser={otherUser}
                messageId={message.id}
              />
            ) : (
              <OtherUserBubble
                key={message.id}
                text={message.text}
                time={time}
                otherUser={otherUser}
              />
            )}
            {isLastMessage && (
              <div ref={messagesEndRef} className={classes.messageEnd} />
            )}
          </>
        );
      })}
    </Box>
  );
};

const sortMessages = (messages) => {
  const sortedMessages = messages.sort((a, b) =>
    a.createdAt > b.createdAt ? 1 : -1
  );
  return sortedMessages;
};

export default Messages;
