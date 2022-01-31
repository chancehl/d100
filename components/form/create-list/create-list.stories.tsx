import React, { useState } from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { CreateListForm, CreateListFormData } from './create-list'

export default {
    title: 'CreateListForm',
    component: CreateListForm,
} as ComponentMeta<typeof CreateListForm>

export const Primary: ComponentStory<typeof CreateListForm> = () => {
    const [formData, setFormData] = useState<CreateListFormData | null>(null)

    console.log({ formData })

    return <CreateListForm onSubmit={(data: CreateListFormData) => setFormData(data)} {...formData} />
}
