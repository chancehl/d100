import React, { useState } from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { SearchBar, SearchBarProps } from './search-bar'

export default {
    title: 'Search Bar',
    component: SearchBar,
} as ComponentMeta<typeof SearchBar>

export const Base: ComponentStory<typeof SearchBar> = (props: SearchBarProps) => {
    const [value, setValue] = useState<string | undefined>(undefined)

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    const onSearch = () => {
        alert(value)
    }

    return <SearchBar onChange={onChange} onSearch={onSearch} {...props} />
}
