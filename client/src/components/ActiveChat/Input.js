import React, { Component } from "react";
import { FormControl, FilledInput } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import {
  postMessage,
  patchUnreadMessages,
} from "../../store/utils/thunkCreators";

const styles = {
  root: {
    justifySelf: "flex-end",
    marginTop: 15,
  },
  input: {
    height: 70,
    backgroundColor: "#F4F6FA",
    borderRadius: 8,
    marginBottom: 20,
  },
};

export class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };
  }

  handleChange = (event) => {
    this.setState({
      text: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    if (event.target.text.value.trim() !== "") {
      const reqBody = {
        text: event.target.text.value.trim(),
        recipientId: this.props.otherUser.id,
        conversationId: this.props.conversationId,
        sender: this.props.conversationId ? null : this.props.user,
      };
      await this.props.postMessage(reqBody);
      await this.props.patchUnreadMessages({
        conversationId: this.props.conversationId,
        otherUserId: this.props.otherUser.id,
        userId: this.props.user.id,
      });
      this.setState({
        text: "",
      });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <form className={classes.root} onSubmit={this.handleSubmit}>
        <FormControl fullWidth hiddenLabel>
          <FilledInput
            classes={{ root: classes.input }}
            disableUnderline
            placeholder="Type something..."
            value={this.state.text}
            name="text"
            onChange={this.handleChange}
          />
        </FormControl>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversations: state.conversations,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postMessage: (message) => {
      dispatch(postMessage(message));
    },
    patchUnreadMessages: (conversation) => {
      dispatch(patchUnreadMessages(conversation));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Input));
