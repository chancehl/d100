import { useState } from 'react'
import { useSession } from 'next-auth/react'
import Router from 'next/router'
import axios from 'axios'

import { CreateCollectionForm, CreateCollectionFormData as Data } from '../components/create-collection-form/create-collection-form'

export const Create = () => {
    const session = useSession()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const onSubmit = async (data: Data) => {
        try {
            setLoading(true)

            const response = await axios.post('/api/collections/create', {
                ...data,
                owner: session.data?.user?.email,
            })

            Router.push(`/${response.data.collection.id}`)
        } catch (error: any) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex justify-center items-center h-full">
            <CreateCollectionForm onSubmit={onSubmit} loading={loading} />
        </div>
    )
}

export default Create
