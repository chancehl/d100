import { useEffect, useState } from 'react'
import axios from 'axios'
import { AiOutlineHeart, AiFillHeart, AiOutlineLoading3Quarters } from 'react-icons/ai'
import { Collection, CollectionItem } from '@prisma/client'

import prisma from '../prisma/client'
import { Button } from '../components/button/button'
import { getSession } from 'next-auth/react'
import { GetServerSideProps } from 'next/types'

type CollectionPageProps = {
    collection: Collection & { collectionItems: CollectionItem[] }
    saved: boolean
}

export const CollectionPage = ({ collection, saved: savedFromServer }: CollectionPageProps) => {
    const [saved, setSaved] = useState<boolean>(savedFromServer ?? false)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        try {
            // We don't need to await this. It can just happen in the background.
            axios.post(`/api/collections/views?id=${collection.id}`)
        } catch (error: any) {
            console.error('Encountered an error when updating view count for collection. Views may not be accurate.')
        }
    }, [])

    const toggleSave = async () => {
        try {
            setSaving(true)

            await axios.post(`/api/user/saved?collectionId=${collection.id}`)

            setSaved((current) => !current)
        } catch (error: any) {
            console.error('Encountered an error when unsaving this collection', error.message)

            setSaved(savedFromServer)
        } finally {
            setSaving(false)
        }
    }

    const renderSaveIcon = () =>
        saving ? (
            <AiOutlineLoading3Quarters className="animate-spin text-2xl" />
        ) : saved ? (
            <AiFillHeart className="text-4xl cursor-pointer" onClick={toggleSave} />
        ) : (
            <AiOutlineHeart className="text-4xl cursor-pointer" onClick={toggleSave} />
        )

    return (
        <div className="flex flex-col items-center h-full p-32">
            <h1 className="text-6xl font-black uppercase">{collection.name}</h1>
            <div className="flex flex-row justify-between">{renderSaveIcon()}</div>
            <ul>
                {collection?.collectionItems?.length &&
                    collection.collectionItems.map((item) => (
                        <li key={item.id}>
                            {item.value} {item.description ? `(${item.description})` : null}
                        </li>
                    ))}
            </ul>
            <div>
                <Button text="Home" buttonType="secondary" />
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession({ req: context.req })

    const collectionId = context.params?.id

    let user = null

    if (session && session.user?.email) {
        user = await prisma.user.findUnique({
            where: {
                email: session.user.email,
            },
            include: {
                saved: true,
            },
        })
    }

    const collection = await prisma.collection.findUnique({
        where: {
            id: collectionId as string,
        },
        select: {
            id: true,
            name: true,
            description: true,
            views: true,
            collectionItems: {
                select: {
                    id: true,
                    value: true,
                    description: true,
                },
            },
        },
    })

    if (collection == null) {
        return {
            redirect: {
                destination: '/home',
                permanent: false,
            },
        }
    }

    return {
        props: {
            collection,
            saved: user?.saved?.find((savedCollection) => savedCollection.id === collection.id) != null,
        },
    }
}

export default CollectionPage
