import { Container } from "@mui/material";
import { useAuth } from "auth/auth";
import Toolbar from "components/Toolbar";
import { CreateDocumentPage } from "pages/CreateDocumentPage";
import { EditDocumentPage } from "pages/EditDocumentPage";
import { DashboardPage } from "pages/DashboardPage";
import LoginPage from "pages/LoginPage";
import RegisterPage from "pages/RegisterPage";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";

interface AppRouterProps {}

export const AppRouter: React.FC<AppRouterProps> = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<NonAuthGuard />}>
          <Route index element={<LoginPage />} />
        </Route>
        <Route path="/register" element={<NonAuthGuard />}>
          <Route index element={<RegisterPage />} />
        </Route>
        <Route path="/" element={<AuthGuard />}>
          <Route index element={<DashboardPage />} />
        </Route>
        <Route path="/create" element={<AuthGuard />}>
          <Route index element={<CreateDocumentPage />} />
        </Route>
        <Route path="/edit/:id" element={<AuthGuard />}>
          <Route index element={<EditDocumentPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

const LayoutWrapper: React.VFC = () => {
  return (
    <div className="App">
      <Toolbar />
      <Container maxWidth="md">
        <Outlet />
      </Container>
    </div>
  );
};

const NonAuthGuard: React.VFC = () => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated() ? <LayoutWrapper /> : <Navigate to="/" />;
};

const AuthGuard: React.VFC = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated() ? <LayoutWrapper /> : <Navigate to="/login" />;
};
