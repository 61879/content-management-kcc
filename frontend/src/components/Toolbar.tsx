import { LogoutOutlined } from "@mui/icons-material";
import {
  AppBar,
  Typography,
  Toolbar as MUIToolbar,
  Box,
  ButtonBase,
} from "@mui/material";
import { useAuth } from "auth/auth";
import { useNavigate } from "react-router";

const Toolbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <AppBar color="primary">
      <MUIToolbar>
        <Typography
          variant="h6"
          sx={{ width: "100%" }}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          {isAuthenticated() && user && <Box>Howdy, {user}</Box>}
          <Box>Content Management</Box>
          {isAuthenticated() && (
            <Box>
              <ButtonBase onClick={handleLogout}>
                <LogoutOutlined />
              </ButtonBase>
            </Box>
          )}
        </Typography>
      </MUIToolbar>
    </AppBar>
  );
};

export default Toolbar;
