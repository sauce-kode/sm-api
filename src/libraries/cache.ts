import redisClient from "./redis";

class RedisCache {

    private client;
    
    constructor() {
        this.client = redisClient
    }

    public getData(key:string) {
        return this.client.get(key)
    }

    public addData(key:string, data:string) : void {
        this.client.set(key, data, {EX: 60 * 60 * 15})
    }

    public updateData(key:string, data:string) :  void {
        this.client.set(key, data, {EX: 60 * 60 * 15})
    }

    public deleteData(key:string) : void {
        this.client.del(key)
    }

}

export default new RedisCache()