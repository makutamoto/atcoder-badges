import { NextApiRequest, NextApiResponse } from 'next';

import { getUserRateWithCache } from '../../../../lib/cache';

const colors = {
    unrated: '#000000',
    newbie: '#CCCCCC',
    pupil: '#77FF77',
    specialist: '#77DDBB',
    expert: '#AAAAFF',
    candidateMaster: '#F988FF',
    master: '#FBCC88',
    internationalMaster: '#F9BB55',
    grandMaster: '#F77677',
    internationalGrandMaster: '#F53334',
    legendaryGrandmaster: '#AA0300',
};

function getColor(rate: number | null): string {
    if(rate === null) return colors.unrated;
    else if(rate < 1200) return colors.newbie;
    else if(rate < 1400) return colors.pupil;
    else if(rate < 1600) return colors.specialist;
    else if(rate < 1900) return colors.expert;
    else if(rate < 2100) return colors.candidateMaster;
    else if(rate < 2300) return colors.master;
    else if(rate < 2400) return colors.internationalMaster;
    else if(rate < 2600) return colors.grandMaster;
    else if(rate < 3000) return colors.internationalGrandMaster;
    else return colors.legendaryGrandmaster;
}

const json = (rate: number | null) => ({
    schemaVersion: 1,
    label: 'Codeforces',
    message: rate === null ? 'Unrated' : rate.toString(),
    color: getColor(rate),
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
