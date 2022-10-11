import { Box, Button, TableCell } from "@mui/material";
import { queryKeys } from "api/queryClient";
import { useMutation, useQuery } from "react-query";
import {
  deleteDocument,
  downloadFile,
  getAllDocuments,
} from "services/document";
import { Buffer } from "buffer";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { SortButton, SortSetting } from "./SortButton";
import { DataTable } from "./DataTable";
import { useNotificationContext } from "context/NotificationContext";
import { Delete, Download, Edit } from "@mui/icons-material";

export interface DocumentsListDto {
  _id: string;
  name: string;
  file: any;
  fileId: string;
  category: string;
}

const DocumentList = () => {
  const [sortSettings, setSortSettings] = useState<SortSetting>();
  const { displayErrorSnackbar, displaySuccessSnackbar } =
    useNotificationContext();

  const {
    data: documents,
    isLoading,
    refetch: refetchDocuments,
  } = useQuery(queryKeys.documents.all, getAllDocuments);

  const sortedDocuments = useMemo(() => {
    if (documents) {
      return sortDocuments(documents, sortSettings);
    }
  }, [documents, sortSettings]);

  const fileDownloadMutation = useMutation(downloadFile, {
    onSuccess: (response) => {
      const base64ImageString = Buffer.from(response.data, "binary").toString(
        "base64"
      );
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.href = `data:${response.headers["content-type"]};base64,${base64ImageString}`;
      a.download = "example.jpg";
      a.click();
      displaySuccessSnackbar("File downloaded");
    },
    onError: (err) => {
      displayErrorSnackbar();
    },
  });

  const deleteMutation = useMutation(deleteDocument, {
    onSuccess: (reponse) => {
      displaySuccessSnackbar("Document has been deleted");
      refetchDocuments();
    },
    onError: (err) => {
      displayErrorSnackbar();
    },
  });

  return (
    <Box sx={{ height: 500, width: "100%" }}>
      {sortedDocuments && (
        <DataTable
          data={sortedDocuments}
          isFetching={isLoading}
          columnsNumber={5}
          head={
            <>
              <TableCell>
                <SortButton
                  fieldName="documentName"
                  value={sortSettings}
                  onChange={setSortSettings}
                >
                  Document Name
                </SortButton>
              </TableCell>
              <TableCell>
                <SortButton
                  fieldName="category"
                  value={sortSettings}
                  onChange={setSortSettings}
                >
                  Category
                </SortButton>
              </TableCell>
              <TableCell>
                <SortButton
                  fieldName="fileName"
                  value={sortSettings}
                  onChange={setSortSettings}
                >
                  Attached File
                </SortButton>
              </TableCell>
              <TableCell>Actions</TableCell>
            </>
          }
          renderRow={(document: DocumentsListDto) => {
            return (
              <>
                <TableCell>{document.name}</TableCell>
                <TableCell>{document.category}</TableCell>
                <TableCell>{document?.file?.filename}</TableCell>
                <TableCell>
                  {document?.file && (
                    <Button
                      onClick={() =>
                        fileDownloadMutation.mutate({ id: document?.fileId })
                      }
                      sx={{ minWidth: "unset" }}
                      disabled={fileDownloadMutation.isLoading}
                    >
                      <Download />
                    </Button>
                  )}
                  <Link to={`/edit/${document._id}`}>
                    <Button sx={{ minWidth: "unset" }}>
                      <Edit />
                    </Button>
                  </Link>
                  <Button
                    onClick={() => deleteMutation.mutate({ id: document._id })}
                    sx={{ minWidth: "unset" }}
                  >
                    <Delete />
                  </Button>
                </TableCell>
              </>
            );
          }}
        />
      )}
    </Box>
  );
};

const sortDocuments = (
  documents: DocumentsListDto[],
  sortSettings: SortSetting
) => {
  if (!sortSettings) {
    return documents;
  }
  const { fieldName, order } = sortSettings;
  const isReverse = order === "desc" ? -1 : 1;
  switch (fieldName) {
    case "fileName":
      return documents.sort(
        (a, b) =>
          (a?.file?.filename > b?.file?.filename
            ? 1
            : a?.file?.filename === b?.file?.filename
            ? a?.file?.filename > b?.file?.filename
              ? 1
              : -1
            : -1) * isReverse
      );
    case "documentName":
      return documents.sort(
        (a, b) =>
          (a.name > b.name
            ? 1
            : a.name === b.name
            ? a.name > b.name
              ? 1
              : -1
            : -1) * isReverse
      );
    default:
      return documents;
  }
};

export default DocumentList;
