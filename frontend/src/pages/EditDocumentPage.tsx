import { Box, Typography, Button } from "@mui/material";
import DocumentForm, { DocumentFormInputProps } from "components/DocumentForm";
import { useNotificationContext } from "context/NotificationContext";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate, Link, useParams } from "react-router-dom";
import { editDocument, findDocument } from "services/document";

export const EditDocumentPage = () => {
  const [values, setValues] = useState<DocumentFormInputProps>();
  const navigate = useNavigate();
  const { displayErrorSnackbar, displaySuccessSnackbar } =
    useNotificationContext();
  const { id } = useParams();

  const { mutate: edit } = useMutation(editDocument, {
    onSuccess: (response) => {
      navigate("/");
      displaySuccessSnackbar("Document updated successfully");
    },
    onError: () => {
      displayErrorSnackbar();
    },
  });

  const { mutate: find } = useMutation(findDocument, {
    onSuccess: (response) => {
      setValues(response.data);
    },
    onError: () => {
      displayErrorSnackbar("Document with provided id des not exist");
      navigate("/");
    },
  });

  useEffect(() => {
    if (id) return find({ id });
    navigate("/");
  }, [id]);

  const onSubmit = async ({
    name,
    category,
    description,
    fileId,
  }: DocumentFormInputProps) => {
    if (id) {
      await edit({
        name,
        category,
        description,
        fileId,
        documentId: id,
      });
    }
  };

  return (
    <Box sx={{ mt: 12 }}>
      <Box
        my={4}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h5">
          Edit document: <b>{values?.name}</b>
        </Typography>
        <Link to="/">
          <Button color="primary" variant="contained">
            Back To List
          </Button>
        </Link>
      </Box>
      <DocumentForm values={values} handleOnSubmit={onSubmit} />
    </Box>
  );
};
