import {useCallback, useState} from 'react';

export interface ResetButtonProps {
    onReset: () => void;
}

export default function ResetButton({
    onReset,
}: ResetButtonProps) {
    const [confirmation, setConfirmation] = useState<boolean>(false);
    const [confirmationTimeout, setConfirmationTimeout] = useState<number>(0);

    const handleClick = useCallback(() => {
        if (!confirmation) {
            setConfirmation(true);
            setConfirmationTimeout(setTimeout(() => setConfirmation(false), 10_000));
        } else {
            clearTimeout(confirmationTimeout);
            setConfirmation(false);
            onReset();
        }
    }, [confirmation, confirmationTimeout, onReset, setConfirmation, setConfirmationTimeout]);

    return (
        <button className="reset" onClick={handleClick}>
            {confirmation ? 'Are you sure ???' : 'Reset'}
        </button>
    );
}
