import { useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import useAxios from './useAxios';
import {
  ExecuteParms,
  OnErrorParam,
  OnSuccessParam,
  UseFetchData
} from '@custom_types/hooks/useFetch.type';

export const useFetch = <T>(onSuccess?: OnSuccessParam<T>, onError?: OnErrorParam) => {
  const [hookData, setHookData] = useState<UseFetchData<T>>({
    isLoading: false,
    data: undefined,
    error: undefined
  });

  const axios = useAxios();

  useEffect(() => {
    const { isLoading, data, error } = hookData;

    if (isLoading) {
      return;
    }

    if (onSuccess && typeof onSuccess === "function" && !error && data) {
      onSuccess(data);

      return;
    }

    if (onError && typeof onError === "function" && error) {
      onError(error || "");
    }
  }, [hookData]);

  const execute = ({
    endpoint,
    requestData,
    method = 'GET',
    responseKey,
    headers,
    internalOnSuccessFN,
    ...options
  }: ExecuteParms) => {

    document.body.style.cursor = 'wait';

    setHookData(prevState => ({
      ...prevState,
      isLoading: true
    }));

    const config: AxiosRequestConfig = {
      url: endpoint,
      data: requestData,
      method,
      headers,
      withCredentials: false,
      ...options
    }

    axios(config)
      .then((response) => {
        document.body.style.cursor = 'default'
        setHookData({
          isLoading: false,
          data: responseKey ? response.data[responseKey] : response?.data,
          error: undefined
        });

        (typeof internalOnSuccessFN === "function") && internalOnSuccessFN();
      })
      .catch(error => {
        document.body.style.cursor = 'default'
        let errorMessage;

        if (error?.response?.status !== 401) {
          errorMessage = error?.response?.data?.errors || "Vuelve a intentar más tarde o contacta a un administrador";
        }

        if (Array.isArray(errorMessage)) {
          errorMessage = errorMessage.join(", ");
        }

        setHookData({
          isLoading: false,
          data: undefined,
          error: errorMessage
        })
      });
  }

  return { ...hookData, execute }

}
