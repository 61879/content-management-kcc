import { QueryClient } from "react-query";

export const queryClient = new QueryClient();

export const queryKeys = {
  documents: {
    all: ["allDocuments"],
  },
};
