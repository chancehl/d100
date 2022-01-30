import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Button, ButtonProps } from './button'

export default {
    title: 'Button',
    component: Button,
} as ComponentMeta<typeof Button>

export const Primary: ComponentStory<typeof Button> = (props: ButtonProps) => {
    const onClick = () => alert('You clicked the button')

    return <Button onClick={onClick} buttonType="primary" text="Primary button" />
}

export const Secondary: ComponentStory<typeof Button> = (props: ButtonProps) => {
    const onClick = () => alert('You clicked the button')

    return <Button onClick={onClick} buttonType="secondary" text="Secondary button" />
}
