import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

type ButtonType = 'primary' | 'secondary' | 'tertiary'

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    buttonType?: ButtonType
}

export const Button = (props: ButtonProps) => {
    const type = props.buttonType ?? 'primary'

    switch (type) {
        case 'primary':
            return <PrimaryButton {...props} />
        case 'secondary':
            return <PrimaryButton {...props} />
        case 'tertiary':
            return <PrimaryButton {...props} />
        default:
            return <PrimaryButton {...props} />
    }
}

export const PrimaryButton = (props: ButtonProps) => (
    <button {...props} className="text-center text-white font-semibold rounded-full pt-3 pb-3 pl-6 pr-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
)
