import { Result } from "neverthrow";

export type AuthTokens = { accessToken: string; };
export type RequestResult = Result<any, Error>;

export interface GatewayRepository {
  requestByType(url: string, method: string, data: any): Promise<RequestResult>;
}