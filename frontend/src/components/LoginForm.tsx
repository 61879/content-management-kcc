import { HowToReg, Login } from "@mui/icons-material";
import { Typography, Grid, TextField, Button } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

interface LoginFormProps {
  onSubmit: SubmitHandler<LoginProps>;
  type: LoginFormType;
}

export interface LoginProps {
  email: string;
  password: string;
}

export enum LoginFormType {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
}

interface LoginFormInputProps {
  email: string;
  password: string;
}

export const LoginForm = ({ onSubmit, type }: LoginFormProps) => {
  const { control, handleSubmit } = useForm<LoginFormInputProps>();

  const buttonAdornment = () => {
    switch (type) {
      case LoginFormType.LOGIN:
        return <Login />;
      case LoginFormType.REGISTER:
        return <HowToReg />;
      default:
        return <Login />;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography mb={2} variant="h6">
        {type === LoginFormType.LOGIN && "Log in to your account:"}
        {type === LoginFormType.REGISTER && "Create new account:"}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField {...field} fullWidth label="Email" color="primary" />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Password"
                type="password"
                color="primary"
              />
            )}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          display="flex"
          justifyContent={{ sm: "center", md: "flex-start" }}
        >
          <Button
            type="submit"
            startIcon={buttonAdornment()}
            variant="contained"
            color="primary"
          >
            {type === LoginFormType.LOGIN && "Login"}
            {type === LoginFormType.REGISTER && "Register"}
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          display="flex"
          justifyContent={{ sm: "center", md: "flex-end" }}
        >
          {type === LoginFormType.LOGIN && (
            <Link to="/register">
              <Button color="primary">Create an account</Button>
            </Link>
          )}
          {type === LoginFormType.REGISTER && (
            <Link to="/login">
              <Button color="primary">Go to login</Button>
            </Link>
          )}
        </Grid>
      </Grid>
    </form>
  );
};
