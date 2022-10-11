import { Box, Paper } from "@mui/material";
import { useAuth } from "auth/auth";
import { LoginForm, LoginFormType, LoginProps } from "components/LoginForm";
import { useNotificationContext } from "context/NotificationContext";
import { SubmitHandler } from "react-hook-form";

const LoginPage = () => {
  const { login } = useAuth();
  const { displayErrorSnackbar, displaySuccessSnackbar } =
    useNotificationContext();

  const onSubmit: SubmitHandler<LoginProps> = async (data) => {
    try {
      await login.mutate(data);
      displaySuccessSnackbar("Welcome, have fun managing your content!");
    } catch (_err) {
      displayErrorSnackbar();
    }
  };

  return (
    <Box
      sx={{ height: "100vh" }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Paper
        elevation={3}
        sx={{ p: 4, width: 500, maxWidth: "80%", textAlign: "left" }}
      >
        <LoginForm onSubmit={onSubmit} type={LoginFormType.LOGIN} />
      </Paper>
    </Box>
  );
};

export default LoginPage;
