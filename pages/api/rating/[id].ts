import { NextApiRequest, NextApiResponse } from 'next';

import { getUserRateWithCache } from '../../../lib/cache';

export default async function (req: NextApiRequest, res: NextApiResponse) {
    let username = req.query.id as string;
    let rating = await getUserRateWithCache(username);
    res.setHeader('Content-type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({ rating });
}
