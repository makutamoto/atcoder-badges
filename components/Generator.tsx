import { useState, useEffect } from 'react';
import CopyField from './CopyField';

const userURL = (name: string) => `https://atcoder.jp/users/${name}`;
const imageLink = (name: string) => process.browser ? `${window.location.origin}/api/atcoder/${name}` : '';

export interface GeneratorProps {
    name: string,
}
export default function(props: GeneratorProps) {
    let [user, setUser] = useState('');
    let [image, setImage] = useState('');
    useEffect(() => {
        setUser(userURL(props.name));
        setImage(imageLink(props.name));
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
