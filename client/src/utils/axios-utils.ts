import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const client = axios.create({ baseURL: "http://localhost:8080" });

export const request = <T>({ ...options }: AxiosRequestConfig) => {
  client.defaults.headers.common.Authorization = `Bearer token`;

  const onSuccess = (response: AxiosResponse<T>) => response;
  const onError = (error: AxiosError<T>) => {
    return error;
  };

  return client(options).then(onSuccess).catch(onError);
};

export const BASE_URL = "http://localhost:8080";
