import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

export type ButtonType = 'primary' | 'secondary'

export type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    buttonType?: ButtonType
    text: string
}

export const Button = (props: ButtonProps) => {
    const type = props.buttonType ?? 'primary'

    switch (type) {
        case 'primary':
            return <PrimaryButton {...props} />
        case 'secondary':
            return <SecondaryButton {...props} />
        default:
            return <PrimaryButton {...props} />
    }
}

export const PrimaryButton = (props: ButtonProps) => {
    const { buttonType: _buttonType, text, ...rest } = props

    return (
        <button {...rest} className="text-center text-white font-semibold rounded-full pt-2 pb-2 pl-6 pr-6 bg-slate-900 hover:bg-slate-700">
            {text}
        </button>
    )
}

export const SecondaryButton = (props: ButtonProps) => {
    const { buttonType: _buttonType, text, ...rest } = props

    return (
        <button {...rest} className="text-center font-semibold rounded-full pt-2 pb-2 pl-6 pr-6 border-slate-900 border-solid border-2 hover:bg-slate-900 hover:text-white">
            {text}
        </button>
    )
}
