import { Product } from "../types";
import AxiosClient from "./AxiosClient";

export const saveData = async (data: Product[]) => {
  const { data: returnedData } = await AxiosClient.post("/product", data, {
    responseType: "arraybuffer",
  });
  return returnedData;
};

export const getAllInvoice = async () => {
  const { data } = await AxiosClient.get("/product");
  return data;
};

export const generatePdf = async ({ id }: { id: string }) => {
  const { data: returnedData } = await AxiosClient.post(
    `/product/invoice/${id}`,
    {},
    {
      responseType: "arraybuffer",
    }
  );
  return returnedData;
};
