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
  status: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: true,
  },
});

// mark all unread messages as read given conversationId and senderId

Message.markMessagesAsRead = async function (conversationId, senderId) {
  const messages = await Message.update(
    { status: true },
    {
      where: {
        conversationId: {
          [Op.eq]: conversationId,
        },
        senderId: {
          [Op.eq]: senderId,
        },
        status: {
          [Op.not]: true,
        },
      },
    }
  );

  return messages;
};

module.exports = Message;
