import { Create } from "@mui/icons-material";
import { Grid, TextField, Button, CircularProgress, Box } from "@mui/material";
import { useNotificationContext } from "context/NotificationContext";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { uploadFile } from "services/document";

interface DocumentFormProps {
  handleOnSubmit: (props: DocumentFormEditProps) => Promise<void>;
  values?: DocumentFormEditProps;
}

export interface DocumentFormEditProps extends DocumentFormInputProps {
  file?: {
    filename: string;
  };
}

export interface DocumentFormInputProps {
  name: string;
  category: string;
  description: string;
  fileId: string;
}

const DocumentForm = ({ handleOnSubmit, values }: DocumentFormProps) => {
  const { control, handleSubmit, setValue } = useForm<DocumentFormInputProps>();
  const { displayErrorSnackbar, displaySuccessSnackbar } =
    useNotificationContext();
  useEffect(() => {
    if (values) {
      setValue("name", values.name);
      setValue("description", values.description);
      setValue("fileId", values.fileId);
    }
  }, [values]);

  const fileMutation = useMutation(uploadFile, {
    onSuccess: (response) => {
      const id = response.data.id;
      setValue("fileId", id);
      displaySuccessSnackbar("File has been uploaded successfully");
    },
    onError: () => {
      displayErrorSnackbar();
    },
  });

  const handleUploadFile = (e: any) => {
    const file = e.currentTarget.files[0];
    if (file) {
      fileMutation.mutate({ file });
    }
  };

  const fileName = fileMutation.data?.data.filename || values?.file?.filename;

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <>
                <TextField
                  {...field}
                  fullWidth
                  label="Name"
                  InputLabelProps={{ shrink: !!values?.name }}
                  color="primary"
                />
                {fieldState.error && <small>required</small>}
              </>
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="category"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <>
                <TextField
                  {...field}
                  fullWidth
                  label="Category"
                  InputLabelProps={{ shrink: !!values?.name }}
                  color="primary"
                />
                {fieldState.error && <small>required</small>}
              </>
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="description"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <>
                <TextField
                  {...field}
                  fullWidth
                  label="Description"
                  multiline
                  rows={5}
                  InputLabelProps={{ shrink: !!values?.name }}
                  color="primary"
                />
                {fieldState.error && <small>required</small>}
              </>
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <input
            accept="*"
            style={{ display: "none" }}
            id="file-input"
            type="file"
            onChange={handleUploadFile}
          />
          <label htmlFor="file-input">
            <Button
              color="primary"
              disabled={fileMutation.isLoading}
              component="span"
              fullWidth
              variant="outlined"
            >
              {fileMutation.isLoading && <CircularProgress />}
              {fileName ? "Change File" : "Upload File"}
            </Button>
          </label>
          <Box mt={2}>{fileName}</Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          display="flex"
          justifyContent={{ sm: "center", md: "flex-start" }}
        >
          <Button
            color="primary"
            type="submit"
            startIcon={<Create />}
            variant="contained"
          >
            {fileName ? "Save changes" : "Create"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default DocumentForm;
