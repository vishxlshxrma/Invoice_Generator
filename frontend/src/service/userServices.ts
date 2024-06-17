import { FormState } from "../types";
import AxiosClient from "./AxiosClient";

export const userSignup = async (user: FormState) => {
  const { data } = await AxiosClient.post("/user", user);
  return data;
};

export const getUser = async () => {
  const { data } = await AxiosClient.get("/user");
  return data;
};

export const userLogin = async (user: FormState) => {
  const { data } = await AxiosClient.post("/user/login", user);
  return data;
};

export const userUpdate = async (user: FormState) => {
  const { data } = await AxiosClient.put("/user", user);
  return data;
};

export const getSingeUser = async ({ id }: { id: string }) => {
  const { data } = await AxiosClient.get(`/user/${id}`);
  return data;
};
