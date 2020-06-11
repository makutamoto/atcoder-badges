import axios from 'axios';

import { deleteUserCache, getUserCache, registerUserCache, updateUserCache } from './db';

interface ContestResult {
    NewRating: number,
}

const userHistroyURL = (name: string) => `https://atcoder.jp/users/${name}/history/json`;

async function fetchUserRate(name: string) {
    let data: ContestResult[];
    console.log(`Fetching '${name}'...`);
    data = (await axios.get(userHistroyURL(name))).data;
    if(data.length == 0) return null;
    return data[data.length - 1].NewRating;
}

function needUpdate(timestamp: string) {
    let now = new Date();
    let date = new Date(timestamp);
    if(now.getFullYear() != date.getFullYear()
        || now.getMonth() != date.getMonth()
        || now.getDate() != date.getDate()
        || now.getHours() != date.getHours()) {
        return true;
    }
    return false;
}

export async function getUserRateWithCache(name: string) {
    let cache = await getUserCache(name);
    if(cache.user === null) {
        let rate = await fetchUserRate(name);
        if(rate === null) return null;
        await registerUserCache(name, rate);
        return rate;
    } else {
        if(needUpdate(cache.user.timestamp)) {
            let rate = await fetchUserRate(name);
            if(rate === null) {
                await deleteUserCache(cache.user._id);
                return null;
            }
            cache.user.rate = rate;
            await updateUserCache(cache.user);
        }
        return cache.user.rate;
    }
}
