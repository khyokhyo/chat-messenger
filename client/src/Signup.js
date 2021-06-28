import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  Button,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import { useStyles, CssTextField } from "./loginSignupStyles.js";
import { register } from "./store/utils/thunkCreators";
import SideBanner from "./components/SideBanner";

const Login = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
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
            onClick={() => history.push("/login")}
          >
            Login
          </Button>
          <Typography className={classes.headerText}>
            Already have an account?
          </Typography>
        </Grid>

        <Grid container item className={classes.authFormContainer}>
          <form onSubmit={handleRegister}>
            <Typography className={classes.formTitleText}>
              Create an account.
            </Typography>

            <Grid container item className={classes.authForm}>
              <FormControl margin="normal" required>
                <CssTextField
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
                  label="E-mail address"
                  aria-label="e-mail address"
                  type="email"
                  name="email"
                  InputProps={{
                    classes: {
                      input: classes.formInput,
                    },
                  }}
                />
              </FormControl>
              <FormControl
                margin="normal"
                required
                error={!!formErrorMessage.confirmPassword}
              >
                <CssTextField
                  label="Password"
                  aria-label="password"
                  type="password"
                  inputProps={{ minLength: 6 }}
                  name="password"
                  InputProps={{
                    classes: {
                      input: classes.formInput,
                    },
                  }}
                />
                <FormHelperText>
                  {formErrorMessage.confirmPassword}
                </FormHelperText>
              </FormControl>
              <FormControl
                margin="normal"
                required
                error={!!formErrorMessage.confirmPassword}
              >
                <CssTextField
                  label="Confirm password"
                  aria-label="confirm password"
                  type="password"
                  inputProps={{ minLength: 6 }}
                  name="confirmPassword"
                  InputProps={{
                    classes: {
                      input: classes.formInput,
                    },
                  }}
                />
                <FormHelperText>
                  {formErrorMessage.confirmPassword}
                </FormHelperText>
              </FormControl>
              <Button
                className={classes.formButton}
                type="submit"
                variant="contained"
                size="large"
              >
                Create
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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
