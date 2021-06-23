const { Sequelize, Op } = require("sequelize");
const db = require("../db");

const Message = db.define("message", {
  text: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  senderId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  readStatus: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: true,
  },
});

// mark all unread messages as read given conversationId and senderId

Message.markMessagesAsRead = async function (conversationId, senderId) {
  const messages = await Message.update(
    { readStatus: true },
    {
      where: {
        conversationId: {
          [Op.eq]: conversationId,
        },
        senderId: {
          [Op.eq]: senderId,
        },
        readStatus: {
          [Op.not]: true,
        },
      },
    }
  );

  return messages;
};

// count unread messages given conversationId and current userId

Message.countUnread = async function (conversationId, userId) {
  const unreadCount = await Message.count({
    where: {
      conversationId: {
        [Op.eq]: conversationId,
      },
      senderId: {
        [Op.not]: userId,
      },
      readStatus: {
        [Op.eq]: false,
      },
    },
  });

  return unreadCount;
};

// find last read message given conversationId and current userId

Message.getLastRead = async function (conversationId, userId) {
  const lastReadMessage = await Message.findOne({
    where: {
      conversationId: {
        [Op.eq]: conversationId,
      },
      senderId: {
        [Op.eq]: userId,
      },
      readStatus: {
        [Op.eq]: true,
      },
    },
    order: [["createdAt", "DESC"]],
  });

  return lastReadMessage;
};

module.exports = Message;
