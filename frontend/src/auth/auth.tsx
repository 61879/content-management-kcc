import { useNotificationContext } from "context/NotificationContext";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { login, logout, register } from "services/auth";

const isAuthenticated = () => {
  return !!getStoredToken();
};

export const getStoredToken = () => {
  return localStorage.getItem("CMS_AUTH_TOKEN");
};

const AuthContext =
  createContext<ReturnType<typeof useContextValue>>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
  const value = useContextValue();

  return value ? (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  ) : (
    <>loader</>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("Cannot find AuthProvider");
  }
  return value;
};

const useContextValue = () => {
  const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState<string | undefined>();
  const { displayErrorSnackbar, displaySuccessSnackbar } =
    useNotificationContext();

  const initialization = async () => {
    if (isAuthenticated()) {
      try {
        // const user = await getUser();
        // setUser(user);
        // console.log("set user", user);
      } catch {
        setUser(undefined);
        handleLogout();
      }
    }
    setIsReady(true);
  };

  useEffect(() => {
    initialization();
  }, []);

  const handleLogin = useMutation(
    async ({ email, password }: { email: string; password: string }) => {
      try {
        await login({ email, password });
        const user = email;
        // setUser(user);
        console.log("set user", user);
      } catch (error: any) {
        setUser(undefined);
        handleLogout();
        throw error;
      }
    }
  );

  const handleLogout = () => {
    logout();
    setUser(undefined);
  };

  return isReady
    ? {
        user,
        isAuthenticated,
        login: handleLogin,
        logout: handleLogout,
        register,
      }
    : undefined;
};
