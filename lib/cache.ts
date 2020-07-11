import { getUserCache, registerUserCache, updateUserCache } from './db';
import { fetchAtCoderRate } from './atcoder';
import { fetchCodeforcesRate } from './codeforces';

export interface Rate {
    atcoder: number | null,
    codeforces: number | null,
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

async function fetchUserRate(name: string): Promise<Rate | null> {
    let atcoder = await fetchAtCoderRate(name);
    let codeforces = await fetchCodeforcesRate(name);
    if(atcoder === null && codeforces === null) return null;
    return { atcoder, codeforces };
}

export async function getUserRateWithCache(name: string): Promise<Rate | null> {
    let cache = await getUserCache(name);
    if(cache.user === null) {
        let rate = await fetchUserRate(name);
        if(rate === null) return null;
        await registerUserCache(name, rate.atcoder, rate.codeforces);
        return rate;
    } else {
        if(needUpdate(cache.user.timestamp)) {
            let rate = await fetchUserRate(name);
            if(rate !== null) {
                cache.user.atcoderRate = rate.atcoder;
                cache.user.codeforcesRate = rate.codeforces;
                await updateUserCache(cache.user);
            }
        }
        return { atcoder: cache.user.atcoderRate, codeforces: cache.user.codeforcesRate };
    }
}
