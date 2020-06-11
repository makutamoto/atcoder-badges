import { NextApiRequest, NextApiResponse } from 'next'

import { getUserRateWithCache } from '../../../lib/atcoder';

const colors = [
    "808080", // gray
    "804000", // brown
    "008000", // green
    "00C0C0", // cyan
    "0000FF", // blue
    "C0C000", // yellow
    "FF8000", // orange
    "FF0000", // red
];

const badge = (rate: number | null) => `\
<svg width="90" height="20" viewBox="0 0 90 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 3C0 1.34315 1.34315 0 3 0H51V20H3C1.34315 20 0 18.6569 0 17V3Z" fill="#343A40"/>
<path d="M51 0H87C88.6569 0 90 1.34315 90 3V17C90 18.6569 88.6569 20 87 20H51V0Z" fill="#${rate === null ? '000000' : colors[Math.floor(Math.min(2800, rate) / 400)]}"/>
<text fill="white" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="12" letter-spacing="0em"><tspan x="4" y="14.1016">AtCoder</tspan></text>
<text fill="white" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="12" letter-spacing="0em"><tspan x="57.0234" y="14.1016">${rate === null ? '   -' : rate.toString().padStart(4, ' ')}</tspan></text>
</svg>
`;

export default async function (req: NextApiRequest, res: NextApiResponse) {
    let username = req.query.id as string;
    let rate = await getUserRateWithCache(username);
    res.setHeader('Content-type', 'image/svg+xml');
    res.status(200).send(badge(rate));
}
