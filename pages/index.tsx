import { useState, useCallback } from 'react';
import Head from 'next/head';
import { Container, Navbar } from 'react-bootstrap';

import UsernameInput from '../components/UsernameInput';
import Generator from '../components/Generator';

const API_ORIGIN = 'https://atcoder-badges.now.sh';

const AtCoderURL = (name: string) => `https://atcoder.jp/users/${name}`;
const CodeforcesURL = (name: string) => `https://codeforces.com/profile/${name}`;
const dataLink = (type: string, name: string) => API_ORIGIN + `/api/${type}/json/${name}`;
const shieldsioLink = (url: string) => `https://img.shields.io/endpoint?url=${encodeURIComponent(url)}`;

export default function() {
    const [username, setUsername] = useState('tourist');
    const onSubmit = useCallback((name) => setUsername(name), [setUsername]);
    return (
        <>
            <Head>
                <title>AtCoder Badges</title>
            </Head>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>AtCoder Badges</Navbar.Brand>
            </Navbar>
            <Container>
                <h1 className="mt-4">AtCoder Badges</h1>
                <p>
                    このサイトはAtCoderのレートと色を表示するバッジを生成します。
                    <br />
                    Codeforcesにも対応しました。
                </p>
                <p>バッジの情報は毎時０分に自動的に更新されます。</p>
                <p>
                    このサイトのGitHubリポジトリ: <a href="https://github.com/makutamoto/atcoder-badges" target="_blank">https://github.com/makutamoto/atcoder-badges</a>
                    <br />
                    作者Twitter: <a href="https://twitter.com/makutamoto" target="_blank">https://twitter.com/makutamoto</a>
                </p>
                <UsernameInput onSubmit={onSubmit} />
                <hr />
                <Generator title="AtCoder" tip={username} link={AtCoderURL(username)} badge={shieldsioLink(dataLink('atcoder', username))} />
                <Generator title="Codeforces" tip={username} link={CodeforcesURL(username)} badge={shieldsioLink(dataLink('codeforces', username))} />
            </Container>
        </>
    );
};
