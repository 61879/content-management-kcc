import React, { useContext } from "react";
import { useSnackbar } from "notistack";
import { ReactComponent as ErrorIcon } from "assets/icons/error.svg";
import { ReactComponent as SuccessIcon } from "assets/icons/success.svg";

const defaultHandler = () => {
  throw Error("cannot find NotificationContext Provider!");
};

interface NotificationContextType {
  displayErrorSnackbar: (text?: string) => void;
  displaySuccessSnackbar: (text: string) => void;
}

const NotificationContext = React.createContext<NotificationContextType>({
  displayErrorSnackbar: defaultHandler,
  displaySuccessSnackbar: defaultHandler,
});

export const NotificationContextProvider: React.FC = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();

  const displayErrorSnackbar = (text?: string) => {
    enqueueSnackbar(
      <>
        <ErrorIcon />
        {text || "Something went wrong"}
      </>
    );
  };

  const displaySuccessSnackbar = (text: string) => {
    enqueueSnackbar(
      <>
        <SuccessIcon />
        {text}
      </>
    );
  };

  return (
    <NotificationContext.Provider
      value={{ displayErrorSnackbar, displaySuccessSnackbar }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => useContext(NotificationContext);
