import { AppRouter } from "Router";
import { QueryClientProvider } from "react-query";
import { AuthProvider } from "auth/auth";
import { queryClient } from "api/queryClient";
import { NotificationContextProvider } from "context/NotificationContext";
import { NotificationSnackbar } from "components/NotificationSnackbar";
import { SnackbarProvider } from "notistack";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider
        content={(key, message) => (
          <NotificationSnackbar id={key} message={message} />
        )}
      >
        <NotificationContextProvider>
          <AuthProvider>
            <AppRouter />
          </AuthProvider>
        </NotificationContextProvider>
      </SnackbarProvider>
    </QueryClientProvider>
  );
}

export default App;
