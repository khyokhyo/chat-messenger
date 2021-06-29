import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { Grid, Typography, Button, FormControl } from "@material-ui/core";
import { useStyles, CssTextField } from "./loginSignupStyles.js";
import { login } from "./store/utils/thunkCreators";
import SideBanner from "./components/SideBanner";

export const Login = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container className={classes.root}>
      <SideBanner />
      <Grid container item xs={12} sm={6} className={classes.authContainer}>
        <Grid container item className={classes.authHeader}>
          <Button
            className={classes.headerButton}
            onClick={() => history.push("/register")}
          >
            Create account
          </Button>
          <Typography className={classes.headerText}>
            Don't have an account?
          </Typography>
        </Grid>

        <Grid container item className={classes.authFormContainer}>
          <form onSubmit={handleLogin}>
            <Typography className={classes.formTitleText}>
              Welcome back!
            </Typography>

            <Grid container item className={classes.authForm}>
              <FormControl margin="normal" required>
                <CssTextField
                  data-testid="user-name"
                  label="Username"
                  aria-label="username"
                  name="username"
                  type="text"
                  InputProps={{
                    classes: {
                      input: classes.formInput,
                    },
                  }}
                />
              </FormControl>
              <FormControl margin="normal" required>
                <CssTextField 
                  data-testid="password"
                  label="Password"
                  aria-label="password"
                  type="password"
                  name="password"
                  InputProps={{
                    classes: {
                      input: classes.formInput,
                    },
                  }}
                />
              </FormControl>
              <Button
                className={classes.formButton}
                type="submit"
                variant="contained"
                size="large"
              >
                Login
              </Button>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
