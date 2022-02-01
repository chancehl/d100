import React, { useState } from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { CreateCollectionForm, CreateCollectionFormData } from './create-collection-form'

export default {
    title: 'CreateCollectionForm',
    component: CreateCollectionForm,
} as ComponentMeta<typeof CreateCollectionForm>

export const Primary: ComponentStory<typeof CreateCollectionForm> = () => {
    const [formData, setFormData] = useState<CreateCollectionFormData | null>(null)

    return <CreateCollectionForm onSubmit={(data: CreateCollectionFormData) => setFormData(data)} {...formData} />
}
