import { Button, FormControl, InputGroup } from 'react-bootstrap';
import copy from 'copy-text-to-clipboard';

import styles from './CopyField.module.css';

export interface CopyFieldProps {
    title: string,
    value: string,
}
export default function(props: CopyFieldProps) {
    return (
        <InputGroup className="mb-3">
            <InputGroup.Prepend>
                <InputGroup.Text className={styles.title}>{props.title}</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl value={props.value} />
            <InputGroup.Append>
                <Button variant="secondary" onClick={() => copy(props.value)}>Copy</Button>
            </InputGroup.Append>
        </InputGroup>
    );
}
