import axios from 'axios';

export interface ContestResult {
    NewRating: number,
}

const userHistroyURL = (name: string) => `https://atcoder.jp/users/${name}/history/json`;

export async function fetchAtCoderRate(name: string): Promise<number | null> {
    let data: ContestResult[];
    console.log(`Fetching '${name}'...`);
    data = (await axios.get(userHistroyURL(name))).data;
    if(data.length == 0) return null;
    return data[data.length - 1].NewRating;
}
