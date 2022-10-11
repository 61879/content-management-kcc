import { Box, Button, Typography } from "@mui/material";
import DocumentList from "components/DocumentList";
import { Link } from "react-router-dom";

export const DashboardPage = () => {
  return (
    <Box sx={{ mt: 12 }}>
      <Box
        my={4}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h5">Your documents list</Typography>
        <Link to="create">
          <Button color="primary" variant="contained">
            Create New Document
          </Button>
        </Link>
      </Box>
      <DocumentList />
    </Box>
  );
};
