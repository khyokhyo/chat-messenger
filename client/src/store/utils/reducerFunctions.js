export const addMessageToStore = (state, payload) => {
  const { message, sender, isSender } = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
    };
    newConvo.latestMessage = message;
    newConvo.unreadMessageCount = 1;
    return [newConvo, ...state];
  }

  return state.map((convo) => {
    if (convo.id === message.conversationId) {
      const convoCopy = { ...convo };
      convoCopy.messages.push(message);
      // if current user is the receiver of this message and current user is the sender of latest message so far,
      // then the other user must have read the lastest message in the conversation
      if (!isSender) {
        convoCopy.lastReadMessage =
          convoCopy.latestMessage?.senderId ===
          convoCopy.lastReadMessage?.senderId
            ? convoCopy.latestMessage
            : convoCopy.lastReadMessage;
      }

      // should not update lastest message before updating the last read message
      convoCopy.latestMessage = message;

      // if current user is the sender, then unread message count is cleared,
      // otherwise the value is increased by 1 (or set to 1 if doesn't exist already)
      convoCopy.unreadMessageCount = isSender
        ? null
        : convoCopy.unreadMessageCount
        ? convoCopy.unreadMessageCount + 1
        : 1;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = true;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = false;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      const newConvo = { ...convo };
      newConvo.id = message.conversationId;
      newConvo.messages.push(message);
      newConvo.latestMessage = message;
      return newConvo;
    } else {
      return convo;
    }
  });
};

export const clearUnreadMessageCountInStore = (state, id) => {
  return state.map((convo) => {
    if (convo.id === id) {
      const convoCopy = { ...convo };
      convoCopy.unreadMessageCount = null;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const setLastReadMessageToStore = (state, payload) => {
  return state.map((convo) => {
    if (convo.id === payload.message.conversationId) {
      const convoCopy = { ...convo };
      convoCopy.lastReadMessage = payload.message;
      return convoCopy;
    } else {
      return convo;
    }
  });
};
