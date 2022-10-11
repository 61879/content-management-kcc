import { Box, Button, Typography } from "@mui/material";
import DocumentForm, { DocumentFormInputProps } from "components/DocumentForm";
import { useNotificationContext } from "context/NotificationContext";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { createDocument } from "services/document";

export const CreateDocumentPage = () => {
  const navigate = useNavigate();
  const { displayErrorSnackbar, displaySuccessSnackbar } =
    useNotificationContext();

  const { mutate: create } = useMutation(createDocument, {
    onSuccess: () => {
      navigate("/");
      displaySuccessSnackbar("Document has been created");
    },
    onError: () => {
      displayErrorSnackbar();
    },
  });

  const onSubmit = async ({
    name,
    category,
    description,
    fileId,
  }: DocumentFormInputProps) => {
    await create({ name, category, description, fileId });
  };

  return (
    <Box sx={{ mt: 12 }}>
      <Box
        my={4}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h5">Create new document</Typography>
        <Link to="/">
          <Button color="primary" variant="contained">
            Back To List
          </Button>
        </Link>
      </Box>
      <DocumentForm handleOnSubmit={onSubmit} />
    </Box>
  );
};
