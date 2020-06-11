import { useState, useCallback } from 'react';
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap';

export interface UsernameInputProps {
    onSubmit: (value: string) => void,
}
export default function(props: UsernameInputProps) {
    let [username, setUsername] = useState('tourist');
    let onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.currentTarget.value);
    }, [setUsername]);
    let onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.onSubmit(username);
    }, [props.onSubmit, username]);
    return (
        <Form onSubmit={onSubmit}>
            <Form.Group>
                <InputGroup className="mb-3">
                    <FormControl placeholder="Username" value={username} onChange={onChange} />
                    <InputGroup.Append>
                        <Button type="submit" variant="secondary">生成</Button>
                    </InputGroup.Append>
                </InputGroup>
            </Form.Group>
        </Form>
    )
}
