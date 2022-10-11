import { Box, Paper } from "@mui/material";
import { useAuth } from "auth/auth";
import { LoginForm, LoginFormType, LoginProps } from "components/LoginForm";
import { useNotificationContext } from "context/NotificationContext";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const { displayErrorSnackbar, displaySuccessSnackbar } =
    useNotificationContext();

  const onSubmit: SubmitHandler<LoginProps> = async (data) => {
    try {
      await register(data);
      navigate("/login");
      displaySuccessSnackbar(
        "Account has been created. Please log in using provided credentials."
      );
    } catch (err) {
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
        <LoginForm onSubmit={onSubmit} type={LoginFormType.REGISTER} />
      </Paper>
    </Box>
  );
};

export default RegisterPage;
