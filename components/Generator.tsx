import { useState, useEffect } from 'react';
import CopyField from './CopyField';

const userURL = (name: string) => `https://atcoder.jp/users/${name}`;
const dataLink = (name: string) => process.browser ? `${window.location.origin}/api/atcoder/json/${name}` : '';
const shieldsioLink = (url: string) => `https://img.shields.io/endpoint?url=${encodeURIComponent(url)}`;

export interface GeneratorProps {
    name: string,
}
export default function(props: GeneratorProps) {
    let [user, setUser] = useState('');
    let [image, setImage] = useState('');
    useEffect(() => {
        setUser(userURL(props.name));
        setImage(shieldsioLink(dataLink(props.name)));
    }, [props.name]);
    return (
        <>
            <CopyField title="HTML" value={`<a href="${user}" target="_blank" title="${props.name}"><img src="${image}" /></a>`} />
            <CopyField title="Markdown" value={`[![${props.name}](${image})](${user})`} />
            <h3>Preview</h3>
            <a href={user} target="_blank" title={props.name}><img src={image} /></a>
        </>
    );
}
