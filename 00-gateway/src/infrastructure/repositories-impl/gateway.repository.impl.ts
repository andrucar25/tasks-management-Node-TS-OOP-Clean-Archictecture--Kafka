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
      const objError: IError = new Error(error.response.data.message);
      objError.status = error.response.status;
      objError.stack = error.response.data.stack;
      return err(objError);
    }
  }

}