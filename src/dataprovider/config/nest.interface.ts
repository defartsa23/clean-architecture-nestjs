import { NodeEnvironmentEnum } from "src/delivery/enums/nodeEnvironment.enum";


export interface NestConfig {
    getNodeEnv(): NodeEnvironmentEnum;
    getNodePort(): number;
}