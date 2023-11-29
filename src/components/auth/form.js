import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Container,
  Paper,
  Typography,
  Grid,
  Input,
  Button,
} from "@material-ui/core";

import makeStyles from "./styles.js";
import { signIn, signUp } from "../../actions/auth";
import { useMethod } from "../../context/index.js";

const Form = (props) => {
  const { user, setUser } = useMethod();

  const classess = makeStyles();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setformData] = useState({});
  const [error, setError] = useState(false);


  const dispatch = useDispatch();

  const handleChange = e => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };
  const switchMode = () => {
    setError(false);
    setIsSignUp(!isSignUp);
  };

  const handleConfirmPasswordChange = e => {
    if (e.target.value !== formData.password) {
      setError(true);
    } else {
      setError(false);
    }
  };
  const register = async (e) => {
    e.preventDefault();
    let res = await signUp(formData)
    if (res.status == 200) {
      setIsSignUp(false)
      alert(res.data.msg)
      return
    }
    alert(res.data.msg)
    setIsSignUp(false)
    return
  }

  const login = async (e) => {
    e.preventDefault();
    const res = await signIn(formData)

    if (res.status === 200) {
      props.setOpen(false)
      alert(res.data.msg)
      return
    }
    console.log("eerror", res)
    alert(res.data.msg)
    return
  };

  return (
    <Container className={classess.container}>
      <Paper className={classess.paper}>
        <Typography className={classess.heading} variant="h4">
          {isSignUp ? "Register" : "Login"}
        </Typography>
        <form className={classess.form} onSubmit={(e) => isSignUp ? register(e) : login(e)}>
          <Grid className={classess.input}>
            {isSignUp &&
              <>
                <Input
                  name="firstName"
                  placeholder="First Name"
                  onChange={handleChange}
                  autoFocus
                  className={classess.input}
                />
                <Input
                  name="lastName"
                  placeholder="Last Name"
                  onChange={handleChange}
                  autoFocus
                  className={classess.input}
                />
              </>
            }

            <Input
              name="email"
              placeholder="Email"
              onChange={handleChange}
              autoFocus
              className={classess.input}
            />
            <Input
              name="password"
              placeholder="Password"
              type="password"
              onChange={handleChange}
              autoFocus
              className={classess.input}
            />
            {isSignUp &&
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Passoword"
                onChange={handleConfirmPasswordChange}
                autoFocus
                className={classess.input}
              />}
            {error &&
              <span style={{ color: "red" }}>
                Password does not matched !{" "}
              </span>}

            {isSignUp &&
              <Input
                name="username"
                placeholder="Username"
                onChange={handleChange}
                autoFocus
                className={classess.input}
              />}

          </Grid>
          <Grid className={classess.footer1}>
            <Button className={classess.btnSubmit} type="submit">
              {isSignUp ? "Register" : "Log In"}
            </Button>
          </Grid>
        </form>
        <Grid className={classess.footer}>
          <Grid item>
            <Button onClick={switchMode} className={classess.btnSwitch}>
              {isSignUp
                ? "Already have a account ? Sign in"
                : "Dont have account? Sign up"}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Form;
