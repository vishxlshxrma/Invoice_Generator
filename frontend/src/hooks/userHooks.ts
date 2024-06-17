import { FormState } from "../types";
import { getUser, userLogin, userSignup } from "./../service/userServices";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useUserSignup = () => {
  return useMutation({
    mutationFn: (data: FormState) => userSignup(data),
  });
};

export const useUserGet = () => {
  return useQuery({
    queryFn: () => getUser(),
    queryKey: ["user"],
    refetchOnWindowFocus: false,
    retry: false,
  });
};

export const useUserLogin = () => {
  return useMutation({
    mutationFn: (data: FormState) => userLogin(data),
  });
};
