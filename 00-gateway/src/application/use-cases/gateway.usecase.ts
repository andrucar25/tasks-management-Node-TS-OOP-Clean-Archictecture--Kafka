import { Result } from "neverthrow";
import { AuthTokens, GatewayRepository } from '../../domain/repositories/gateway.repository';

export type AuthLoginResult = Result<AuthTokens, Error>;

export class GatewayUseCase {
  constructor(private readonly repository: GatewayRepository) {}

  async endpointRequest(url: string, method: string, data: any) {
    return await this.repository.requestByType(url, method, data);
  }
}
