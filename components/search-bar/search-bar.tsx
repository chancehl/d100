import { ChangeEventHandler, KeyboardEvent, MouseEventHandler } from 'react'

export type SearchBarProps = {
    value?: string
    disabled?: boolean
    onChange?: ChangeEventHandler<HTMLInputElement>
    onSearch?: (() => void) | (() => Promise<void>)
    placeholder?: string
}

export const SearchBar = ({ disabled, onChange, onSearch, placeholder = 'Search', value }: SearchBarProps) => {
    const onKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.code === 'Enter' && onSearch != null) {
            onSearch()
        }
    }

    return (
        <input
            disabled={disabled}
            onInput={onChange}
            onKeyPress={onKeyPress}
            className="flex flex-grow font-bold placeholder:font-normal focus:outline-none text-center rounded-full drop-shadow-lg pt-4 pb-4 pl-32 pr-32"
            onChange={onChange}
            placeholder={placeholder}
            value={value}
        />
    )
}
