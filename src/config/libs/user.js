import { AUTH_TOKEN } from "./constants";
const lscache = require("lscache");

export const getAccessToken = () => {
    var accessToken64 = lscache.get(AUTH_TOKEN);
    
    if (accessToken64){
        return atob(accessToken64);
    }
    return accessToken64;
}