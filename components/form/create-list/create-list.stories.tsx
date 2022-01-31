import React, { useState } from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { CreateListForm } from './create-list'

export default {
    title: 'CreateListForm',
    component: CreateListForm,
} as ComponentMeta<typeof CreateListForm>

export const Primary: ComponentStory<typeof CreateListForm> = () => {
    const [formData, setFormData] = useState(1)

    return <CreateListForm />
}
