import { useState } from 'react'
import { useSession } from 'next-auth/react'
import Router from 'next/router'
import axios from 'axios'

import { Button } from '../components/button/button'

export const MAX_ITEMS = 100
export const MAX_TITLE_LENGTH = 50
export const MAX_DESCRIPTION_LENGTH = 250

export const Create = () => {
    const session = useSession()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const [item, setItem] = useState<string | null>(null)
    const [mode, setMode] = useState<'freeform' | 'csv'>('freeform')
    const [title, setTitle] = useState<string | null>(null)
    const [description, setDescription] = useState<string | null>(null)
    const [items, setItems] = useState<string[]>([])

    // prettier-ignore
    const canSubmit = title != null 
        && description != null 
        && items.length > 0

    const onSubmit = async () => {
        try {
            setLoading(true)

            const response = await axios.post('/api/collections/create', {
                title,
                description,
                items,
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
            <div className="flex flex-col space-y-8 border-2 border-slate-900 p-16 ">
                <h1 className="font-black text-6xl">Create a list</h1>
                <div className="flex flex-col">
                    <label htmlFor="title" className="font-extrabold text-xs uppercase">
                        Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        className="border-2 border-slate-900 p-2 font-bold"
                        placeholder="Magical items"
                        onChange={(event) => setTitle(event.target.value)}
                        value={title ?? undefined}
                        maxLength={MAX_TITLE_LENGTH}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="description" className="font-extrabold text-xs uppercase">
                        Description
                    </label>
                    <textarea
                        id="description"
                        className="border-2 border-slate-900 p-2 font-bold"
                        placeholder="100 magical items you would find in a graveyard or crypt"
                        maxLength={MAX_DESCRIPTION_LENGTH}
                        onChange={(event) => setDescription(event.target.value)}
                        value={description ?? undefined}
                    />
                </div>
                <div className="flex flex-col">
                    <div className="flex flex-col">
                        <span className="font-extrabold text-xs uppercase">Mode</span>
                        <p className="mr-4">
                            <input type="radio" name="size" id="mode" value="freeform" checked={mode === 'freeform'} onChange={() => setMode('freeform')} />
                            <label htmlFor="freeform" className="ml-2">
                                Free-form
                            </label>
                        </p>
                        <p>
                            <input type="radio" name="size" id="mode" value="csv" checked={mode === 'csv'} onChange={() => setMode('csv')} disabled />
                            <label htmlFor="csv" className="ml-2">
                                CSV
                            </label>
                        </p>
                    </div>
                </div>
                <div className="flex flex-col">
                    <span className="font-extrabold text-xs uppercase">Items</span>
                    {items.length === 0 ? (
                        <span className="font-bold">No list items</span>
                    ) : (
                        <ul>
                            {items.map((item, index) => (
                                <li key={index} className="hover:text-slate-600 cursor-pointer" onClick={() => setItems((items) => [...items.filter((val) => val != item)])}>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    )}
                    <div className="flex mt-4">
                        <input
                            placeholder="An ugly wand"
                            className="border-2 border-slate-900 p-2 font-bold mr-4"
                            onChange={(event) => setItem(event.target.value)}
                            onKeyPress={(event) => {
                                if (event.code === 'Enter' && item != null) {
                                    setItems([...items, item])

                                    setItem(null)
                                }
                            }}
                            value={item ?? ''}
                        />
                        {items.length < MAX_ITEMS && (
                            <Button
                                onClick={() => {
                                    if (item != null) {
                                        setItems((items) => [...items, item])
                                        setItem(null)
                                    }
                                }}
                                text="Add item"
                                buttonType="secondary"
                                className="flex flex-grow"
                                type="button"
                                disabled={item == null || item.length < 1 || items.includes(item)}
                            />
                        )}
                    </div>
                </div>
                <Button buttonType="primary" type="button" text="Submit" onClick={onSubmit} disabled={!canSubmit} loading={loading} />
            </div>
        </div>
    )
}

export default Create
