import { RedisClientType, createClient } from 'redis';
const redis = require('redis');

const client: RedisClientType = redis.createClient(6379, '127.0.0.1');

client.on('error', err => console.log('Redis Client Error', err));
client.connect();

export default client;