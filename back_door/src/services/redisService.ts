import { RedisClientType, createClient } from 'redis';

const client: RedisClientType = createClient();

client.on('error', err => console.log('Redis Client Error', err));
client.connect();

export default client;