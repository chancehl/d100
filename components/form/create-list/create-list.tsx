import { ChangeEvent, ChangeEventHandler, useState } from 'react'
import { useDebounce } from '../../../hooks/use-debounce'
import { Button } from '../../button/button'

type CreateListFormProps = {
    title: string | null
    description: string | null
    items: string[]
}

export const MAX_ITEMS = 100
export const MAX_DESCRIPTION_LENGTH = 250

export const CreateListForm = ({ title, description, items = [] }: CreateListFormProps) => {
    const [item, setItem] = useState('')
    const [mode, setMode] = useState<'freeform' | 'csv'>('freeform')
    const [formData, setFormData] = useState({ title, description, items })

    // prettier-ignore
    const canSubmit = formData.title != null 
        && formData.description != null 
        && formData.items.length > 0

    const resetForm = () => {
        setFormData({ title: null, description: null, items: [] })
    }

    const onSubmit = () => {
        console.log({ formData })

        resetForm()
    }

    return (
        <form className="flex flex-col space-y-8 border-2 border-slate-900 p-16 ">
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
                    onChange={(event) => {
                        setFormData((current) => ({ ...current, title: event.target.value }))
                    }}
                    value={formData.title ?? undefined}
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
                    onChange={(event) => {
                        setFormData((current) => ({ ...current, description: event.target.value }))
                    }}
                    value={formData.description ?? undefined}
                />
            </div>
            <div className="flex flex-col">
                <fieldset className="flex">
                    <legend className="font-extrabold text-xs uppercase">Mode</legend>
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
                </fieldset>
            </div>
            <div className="flex flex-col">
                <span className="font-extrabold text-xs uppercase">Items</span>
                {formData.items == null || formData.items.length === 0 ? (
                    <span className="font-bold">No list items</span>
                ) : (
                    <ul>
                        {formData.items.map((item) => (
                            <li
                                className="hover:text-slate-600 cursor-pointer"
                                onClick={() => setFormData((current) => ({ ...current, items: current.items.filter((val) => val != item) }))}
                            >
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
                            if (event.code === 'Enter') {
                                setFormData((current) => ({ ...current, items: [...formData.items, item] }))

                                setItem('')
                            }
                        }}
                        value={item}
                    />
                    {formData.items.length < MAX_ITEMS && (
                        <Button
                            onClick={() => {
                                setFormData((current) => ({ ...current, items: [...formData.items, item] }))

                                setItem('')
                            }}
                            text="Add item"
                            buttonType="secondary"
                            className="flex flex-grow"
                            type="button"
                            disabled={item == null || item.length < 1 || formData.items.includes(item)}
                        />
                    )}
                </div>
            </div>
            <Button buttonType="primary" type="button" text="Submit" onClick={onSubmit} disabled={!canSubmit} />
        </form>
    )
}
