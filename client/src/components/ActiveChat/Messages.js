import { React, useMemo } from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const Messages = (props) => {
  const { messages, otherUser, userId } = props;
  const sortedMessages = useMemo(() => sortMessages(messages), [otherUser]);
  return (
    <Box>
      {sortedMessages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
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
