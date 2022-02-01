import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

export type ButtonType = 'primary' | 'secondary'

export type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    buttonType?: ButtonType
    text: string
    loading?: boolean
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
    const { buttonType: _buttonType, loading, text, ...rest } = props

    return (
        <button {...rest} className="flex items-center justify-center text-center text-white font-semibold rounded-full pt-2 pb-2 pl-6 pr-6 bg-slate-900 hover:bg-slate-700">
            {loading ? <AiOutlineLoading3Quarters className="animate-spin text-2xl" /> : text}
        </button>
    )
}

export const SecondaryButton = (props: ButtonProps) => {
    const { buttonType: _buttonType, loading, text, ...rest } = props

    return (
        <button {...rest} className="text-center font-semibold rounded-full pt-2 pb-2 pl-6 pr-6 border-slate-900 border-solid border-2 hover:bg-slate-900 hover:text-white">
            {loading ? <AiOutlineLoading3Quarters className="animate-spin text-3xl" /> : text}
        </button>
    )
}
