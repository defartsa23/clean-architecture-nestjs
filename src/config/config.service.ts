import { Injectable } from "@nestjs/common";
import { NestConfig } from "src/provider/config/nest.interface";
import { DatabaseConfig } from "src/provider/config/database.interface";
import { RedisConfig } from "src/provider/config/redis.interface";
import { ConfigService } from "@nestjs/config";
import { NodeEnvironmentEnum } from "src/delivery/enums/nodeEnvironment.enum";
import * as dotenv from 'dotenv';

dotenv.config();
@Injectable()
class EnvironmentConfigService implements NestConfig {
    private readonly configService: ConfigService = new ConfigService();

    constructor() {}
    
    getNodeEnv(): NodeEnvironmentEnum {
        return this.configService.get<NodeEnvironmentEnum>('NODE_ENV', NodeEnvironmentEnum.Development);
    }

    getNodePort(): number {
        return this.configService.get<number>('NODE_PORT', 3000);
    }
}

const environmentConfigService = new EnvironmentConfigService();
export { environmentConfigService };