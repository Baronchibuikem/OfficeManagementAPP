import React, { useState } from "react";

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Paper,
  Box,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import "../../../assets/css/Login.css";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registerUser } from "../../../store/actions/authActions";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";


const useStyles = makeStyles((theme) => ({
  root: {
    height: "25vh",
  },
  image: {
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(9, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "20%",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));



export default function Register() {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, errors, watch, reset } = useForm();

  const values = watch()

  // Here we are instantiating our dispatch action
  const dispatch = useDispatch();

  const history = useHistory()

  // This is used to dispatch a redux action with the needed registration data
  const regSubmit = (data) => {
    setLoading(true)
    dispatch(
      registerUser(data, history, (data, error) => {
          if(error){
            toast.error(
              error &&
                error.response &&
                error.response.data &&
                error.response.data.message
                ? error.response.data.message
                : "Error in connection"
            );
          }else{
            toast.success(data)
          }
        setLoading(false)
        reset()
      })
    );
  };

  const params = useSelector((state) => ({
    registered: state.authentication.registered
  }));
  // Here we are checking if our authenticated value from the state is true, it yes we redirect to the homepage
  if (params.registered) {
    history.push("/login")
  }

  return (
    <Grid container component="main">
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className="center-content">
        <h3 className="container text-center">
          <u>
            JotterNote is a powerful note and record keeping appplication,
            <br /> focused on helping you
          </u>
        </h3>
        <ul className="list-unstyled h4 my-3">
          <li className="my-2">
            <i className="fa fa-check mr-3" aria-hidden="true"></i>
            Organize your information
          </li>
          <li className="my-2">
            <i class="fa fa-check mr-3" aria-hidden="true"></i>Interact with
            others
          </li>
          <li className="my-2">
            <i class="fa fa-check mr-3" aria-hidden="true"></i>Share your notes
            with us
          </li>
          <li className="my-2">
            <i class="fa fa-check mr-3" aria-hidden="true"></i>Create and keep a
            record of everything
          </li>
        </ul>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square >
        <div className={classes.paper}>
        <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={handleSubmit(regSubmit)}
          >
            {/* Enter your first name */}

            <TextField
              id="outlined-basic"
              label="first name"
              variant="outlined"
              inputRef={register({ required: true })}
              name="firstName"
              fullWidth
            />
            <h6 className="text-left font-italic text-danger">
              {errors.name && errors.name.type === "required" && (
                <p>First name is required</p>
              )}
            </h6>

            {/* Enter your last name */}

            <TextField
              id="outlined-basic"
              label="last name"
              margin="normal"
              variant="outlined"
              inputRef={register({ required: true })}
              name="lastName"
              fullWidth
            />
            <h6 className="text-left font-italic text-danger">
              {errors.first_name && errors.first_name.type === "required" && (
                <p>Last name is required</p>
              )}
            </h6>

            {/* Enter your email */}

            <TextField
              id="outlined-basic"
              label="Enter your email here"
              variant="outlined"
              fullWidth
              inputRef={register({ required: true })}
              name="email"
              type="email"
            />
            <h6 className="text-left font-italic text-danger">
              {errors.email && errors.email.type === "required" && (
                <p>Email field is required</p>
              )}
            </h6>

            {/* Enter your password */}

            <TextField
              id="outlined-basic"
              label="Enter your password"
              variant="outlined"
              inputRef={register({ required: true })}
              name="password"
              type="password"
              fullWidth
              className="my-2"
            />
            <h6 className="text-left font-italic text-danger">
              {errors.password && errors.password.type === "required" && (
                <p>Password field is required</p>
              )}
            </h6>

            {/* password confirmation */}

            <h6 className="text-left font-italic text-danger">
              {errors.password2 && errors.password2.type === "validate" && (
                <p>Passwords don't match</p>
              )}
            </h6>
            <TextField
              id="outlined-basic"
              label="Confirm your password"
              variant="outlined"
              name="password2"
              fullWidth
              inputRef={register({
                required: true,
                validate: (value) => {
                  return value === watch("password");
                },
              })}
              type="password"
            />
            <h6 className="text-left font-italic text-danger">
              {errors.password2 && errors.password2.type === "required" && (
                <p>Please confirm your password</p>
              )}
            </h6>
            <Button
              disableElevation
              className="mx-auto px-5 col-sm-12 p-3 text-light"
              type="submit"
              style={{ backgroundColor: "green" }}
            >
              {/* {params.status ? (
                  <div>
                    <span>Loading</span>
                  </div>
                ) : (
                  "Register"
                )} */}
              Register
            </Button>

            <h6 className="text-center mt-3">
              <Link exact to="/login" variant="body2">
                Already registered? then click here to Login now
              </Link>
            </h6>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
