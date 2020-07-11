import axios from 'axios';

export interface ContestResult {
    newRating: number,
}

export interface RatingHistory {
    result?: ContestResult[],
}

const ratingHistroyURL = (name: string) => `https://codeforces.com/api/user.rating?handle=${name}`;

export async function fetchCodeforcesRate(name: string): Promise<number | null> {
    let data: RatingHistory;
    console.log(`Fetching '${name}'...`);
    data = (await axios.get(ratingHistroyURL(name))).data;
    if(data.result === undefined || data.result.length === 0) return null;
    return data.result[data.result.length - 1].newRating;
}
