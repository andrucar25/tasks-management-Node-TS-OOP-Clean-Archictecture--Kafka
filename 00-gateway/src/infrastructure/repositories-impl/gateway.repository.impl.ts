import axios, { AxiosRequestConfig } from "axios";
import { err, ok } from "neverthrow";

import { GatewayRepository, RequestResult } from '../../domain/repositories/gateway.repository';
import { IError } from '../../core/helpers/error.interface';

export class GatewayRepositoryImpl implements GatewayRepository {
  async requestByType(url: string, method: string, data: any): Promise<RequestResult> {
    const request: AxiosRequestConfig<any> = {
      method,
      url,
      responseType: "json",
      data,
    };

    try {
      const result = await axios.request(request);
      return ok(result.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const objError: IError = new Error(error.response.data?.message || "Unknown error");
        objError.status = error.response.status;
        objError.stack = error.response.data?.stack || error.stack;
        return err(objError);
      }

      // const objError: IError = new Error(error.response.data.message);
      // objError.status = error.response.status;
      // objError.stack = error.response.data.stack;
      // return err(objError);
      const objError: IError = new Error(error.message || "Unknown request error");
      objError.status = error.status || 500;
      objError.stack = error.stack;
      return err(objError);
    }
  }

}