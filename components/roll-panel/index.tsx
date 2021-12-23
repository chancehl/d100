type Props = {
    roll: number
    setRoll: () => void
}

export const RollPanel = ({ roll, setRoll }: Props) => (
    <>
        <div>
            Roll: {roll} <button onClick={setRoll}>Set roll</button>
        </div>
    </>
)
