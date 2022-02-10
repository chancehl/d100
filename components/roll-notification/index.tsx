type RollNotificationProps = {
    roll: number
}

export const RollNotification = ({ roll }: RollNotificationProps) => (
    <span>
        🎲 You rolled a <p className="font-bold inline-block">{roll}</p>!
    </span>
)
