import { NextApiRequest, NextApiResponse } from 'next';

import { getUserRateWithCache } from '../../../../lib/cache';

const colors = [
    '#808080', // gray
    '#804000', // brown
    '#008000', // green
    '#00C0C0', // cyan
    '#0000FF', // blue
    '#C0C000', // yellow
    '#FF8000', // orange
    '#FF0000', // red
];

const json = (rate: number | null) => ({
    schemaVersion: 1,
    label: 'Codeforces',
    message: rate === null ? 'Unrated' : rate.toString(),
    color: rate === null ? '000000' : colors[Math.floor(Math.min(2800, rate) / 400)],
    cacheSeconds: 1800,
});

export default async function (req: NextApiRequest, res: NextApiResponse) {
    let username = req.query.id as string;
    let cache = await getUserRateWithCache(username);
    let rate: number | null = null;
    if(cache !== null) rate = cache.codeforces;
    res.setHeader('Content-type', 'application/json');
    res.status(200).send(JSON.stringify(json(rate)));
}
