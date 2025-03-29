import {ReactElement, useCallback, useEffect, useState} from 'react';
import ResetButton from './ResetButton.tsx';

export interface CounterProps {
    name?: string;
}

export default function Counter({
    name = 'counter',
}: CounterProps = {}): ReactElement {
    const [count, setCount] = useState(+(localStorage.getItem(name) ?? 0));
    const [incrementDisabled, setIncrementDisabled] = useState<boolean>(false);

    const incrementCount = useCallback(() => {
        if (incrementDisabled) {
            return;
        }

        setCount(count + 1);
        setIncrementDisabled(true);
        setTimeout(() => {
            setIncrementDisabled(false);
        }, 200);
    }, [count, setCount, incrementDisabled, setIncrementDisabled]);

    useEffect(() => {
        // const incrementCount = () => debouncedSetCount(count + 1);
        document.addEventListener('keyup', incrementCount, true);
        return () => {
            document.removeEventListener('keyup', incrementCount);
        };
    }, [incrementCount]);

    useEffect(() => {
        localStorage.setItem(name, count.toString());
    }, [name, count]);

    return (
        <div className="card">
            <p>Press any key on keyboard to increment the counter.</p>
            <button onClick={incrementCount}>
                { count }
            </button>
            <ResetButton onReset={() => setCount(0)} />
        </div>
    );
};
