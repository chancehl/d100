import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

export const Button = (props: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => (
    <button {...props} className="text-center text-white font-semibold rounded-full pt-3 pb-3 pl-6 pr-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
)
