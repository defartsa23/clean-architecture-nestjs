export interface RedisConfig {  
    getRedisHost(): string;
    getRedisPort(): number;
    getRedisUser(): string;
    getRedisPassword(): string;
    getRedisDb(): number;
}