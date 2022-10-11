import { httpClient } from "api/httpClient";
import { urls } from "api/urls";
import { DocumentFormInputProps } from "components/DocumentForm";
import { DocumentsListDto } from "components/DocumentList";

export const getAllDocuments = async () => {
  const response = await httpClient.get<DocumentsListDto[]>(urls.document);
  return response.data;
};

export const createDocument = async ({
  name,
  category,
  description,
  fileId,
}: DocumentFormInputProps) => {
  const response = await httpClient.post(urls.document, {
    name,
    category,
    description,
    fileId,
  });
  return response;
};

export const editDocument = async ({
  name,
  category,
  description,
  fileId,
  documentId,
}: DocumentFormInputProps & { documentId: string }) => {
  const response = await httpClient.patch(`${urls.document}/${documentId}`, {
    name,
    category,
    description,
    fileId,
  });
  return response;
};

export const findDocument = async ({ id }: { id: string }) => {
  const response = await httpClient.get(`${urls.document}/${id}`);
  return response;
};

export const deleteDocument = async ({ id }: { id: string }) => {
  const response = await httpClient.delete(`${urls.document}/${id}`);
  return response;
};

export const uploadFile = async ({ file }: { file: File }) => {
  const formData = new FormData();
  formData.append("file", file, file.name);
  const response = await httpClient.post(urls.files, formData);
  return response;
};

export const downloadFile = async ({ id }: { id: string }) => {
  const response = await httpClient.get(`${urls.files}/${id}`, {
    responseType: "arraybuffer",
  });
  return response;
};
