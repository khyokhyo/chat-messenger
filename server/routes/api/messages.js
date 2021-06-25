const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, sender, conversationId } = req.body;

    // find a conversation to validate or to make sure it doesn't already exist
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );

    if (conversation) {
      if (conversationId && conversationId !== conversation.id) {
        return res.sendStatus(403);
      } else {
        const message = await Message.create({
          senderId,
          text,
          conversationId,
        });
        return res.json({ message, sender });
      }
    } else {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
      });
      if (onlineUsers.includes(sender.id)) {
        sender.online = true;
      }
      const message = await Message.create({
        senderId,
        text,
        conversationId: conversation.id,
      });
      res.json({ message, sender });
    }
  } catch (error) {
    next(error);
  }
});

router.patch("/unread-messages", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const { conversationId, otherUserId, userId } = req.body;

    // find the conversation in database
    const conversation = await Conversation.findConversation(
      otherUserId,
      userId
    );

    if (conversation?.id === conversationId) {
      await Message.markMessagesAsRead(conversationId, otherUserId);
      res.json({ conversationId });
    } else {
      return res.sendStatus(403);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
