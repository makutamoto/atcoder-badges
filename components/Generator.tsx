import CopyField from './CopyField';

export interface GeneratorProps {
    title: string,
    tip: string,
    link: string,
    badge: string,
}
export default function(props: GeneratorProps) {
    return (
        <>
            <div className="my-4">
                <h2>{props.title}</h2>
                <CopyField title="HTML" value={`<a href="${props.link}" target="_blank" title="${props.tip}"><img src="${props.badge}" /></a>`} />
                <CopyField title="Markdown" value={`[![${props.tip}](${props.badge})](${props.link})`} />
                <h3>Preview</h3>
                <a href={props.link} target="_blank" title={props.tip} rel="noreferrer"><img src={props.badge} /></a>
            </div>
        </>
    );
}
