import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  generatePdf,
  getAllInvoice,
  saveData,
} from "../service/productServices";
import { Product } from "../types";

export const useSaveData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Product[]) => saveData(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoice"] });
    },
  });
};

export const useGetAllInvoiceData = () => {
  return useQuery({
    queryFn: () => getAllInvoice(),
    queryKey: ["invoice"],
    refetchOnWindowFocus: false,
    retry: false,
  });
};

export const useProductGeneratePdf = () => {
  return useMutation({
    mutationFn: (id: string) => generatePdf({ id }),
  });
};
