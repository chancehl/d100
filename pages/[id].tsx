import { useEffect, useState } from 'react'
import axios from 'axios'
import { Collection } from '@prisma/client'
import { AiOutlineHeart, AiFillHeart, AiOutlineLoading3Quarters } from 'react-icons/ai'

import prisma from '../prisma/client'
import { Button } from '../components/button/button'
import { getSession, useSession } from 'next-auth/react'
import { GetServerSideProps } from 'next/types'

export const CollectionPage = ({ collection, user }: any) => {
    const [saved, setSaved] = useState<boolean>(user?.saved?.find((savedCollection: any) => savedCollection.id === collection.id) ?? false)
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

            setSaved(user?.saved?.find((savedCollection: any) => savedCollection.id === collection.id))
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
            <AiOutlineHeart className="cursor-pointer text-4xl" onClick={toggleSave} />
        )

    return (
        <div className="flex flex-col items-center h-full p-32">
            <h1 className="text-6xl font-black uppercase">{collection.name}</h1>
            <div>{renderSaveIcon()}</div>
            <ul>
                {collection?.collectionItems?.length &&
                    collection.collectionItems.map((item: any) => (
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
            user,
        },
    }
}

export default CollectionPage
