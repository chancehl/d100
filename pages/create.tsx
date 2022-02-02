import { useState, KeyboardEvent } from 'react'
import { useSession } from 'next-auth/react'
import Router from 'next/router'
import axios from 'axios'

import { Button } from '../components/button/button'
import { CollectionItem } from '@prisma/client'

export const MAX_ITEMS = 100
export const MAX_TITLE_LENGTH = 50
export const MAX_DESCRIPTION_LENGTH = 250

type FormItem = Pick<CollectionItem, 'value' | 'description'>

export const Create = () => {
    const session = useSession()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const [itemName, setItemName] = useState<string | null>(null)
    const [itemDescription, setItemDescription] = useState<string | null>(null)
    const [mode, setMode] = useState<'freeform' | 'csv'>('freeform')
    const [title, setTitle] = useState<string | null>(null)
    const [description, setDescription] = useState<string | null>(null)
    const [items, setItems] = useState<FormItem[]>([])

    // prettier-ignore
    const canSubmit = title != null 
        && description != null 
        && items.length > 0

    const addItem = () => {
        if (itemName != null) {
            setItems((items) => [...items, { value: itemName, description: itemDescription }])

            setItemName(null)

            setItemDescription(null)
        }
    }

    const onKeyPress = (event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (event.code === 'Enter' && itemName != null) {
            addItem()
        }
    }

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
            <div className="flex flex-col space-y-8 sm:border-2 sm:border-slate-900 p-8 sm:p-16 ">
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
                                <li
                                    key={index}
                                    className="hover:text-slate-600 cursor-pointer flex flex-col"
                                    onClick={() => setItems((items) => [...items.filter((val) => val.value != item.value)])}
                                >
                                    <span className="text-xl">{item.value}</span>
                                    <span className="italic text-sm">{item.description}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                    <div className="flex flex-col space-y-4 mt-4 sm:justify-between">
                        <input
                            placeholder="An ugly robe"
                            className="border-2 border-slate-900 p-2 font-bold mb-4 sm:mb-0"
                            onChange={(event) => setItemName(event.target.value)}
                            onKeyPress={onKeyPress}
                            value={itemName ?? ''}
                        />
                        <textarea
                            className="border-2 border-slate-900 p-2 font-bold mb-4 sm:mb-0"
                            placeholder={`An old, dusty robe that has the letters 'HT' embroidered on the back in fine, gold thread.`}
                            onChange={(event) => setItemDescription(event.target.value)}
                            onKeyPress={onKeyPress}
                            value={itemDescription ?? ''}
                        />
                        {items.length < MAX_ITEMS && (
                            <Button
                                onClick={addItem}
                                text="Add item"
                                buttonType="secondary"
                                className="flex flex-grow"
                                type="button"
                                disabled={itemName == null || itemName.length < 1 || items.some((item) => item.value === itemName)}
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
