import { useEffect, useState } from 'react'
import { getSession } from 'next-auth/react'
import { GetServerSideProps } from 'next/types'
import Router from 'next/router'
import axios from 'axios'
import { AiOutlineHeart, AiFillHeart, AiOutlineLoading3Quarters } from 'react-icons/ai'
import { BsHandIndexThumb, BsHandThumbsDownFill, BsHandThumbsUp, BsHandThumbsDown, BsHandThumbsUpFill } from 'react-icons/bs'
import { Collection, CollectionItem } from '@prisma/client'

import prisma from '../prisma/client'
import { Button } from '../components/button/button'

type CollectionPageProps = {
    collection: Collection & { items: CollectionItem[] }
    saved: boolean
    liked: boolean
    disliked: boolean
}

export const CollectionPage = ({ collection, saved: savedFromServer, liked: likedFromServer, disliked: dislikedFromServer }: CollectionPageProps) => {
    const [saved, setSaved] = useState<boolean>(savedFromServer ?? false)
    const [liked, setLiked] = useState<boolean>(likedFromServer ?? false)
    const [disliked, setDisliked] = useState<boolean>(dislikedFromServer ?? false)

    const [saving, setSaving] = useState(false)
    const [liking, setLiking] = useState(false)
    const [disliking, setDisliking] = useState(false)

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

    const toggleLike = async () => {
        try {
            setLiking(true)

            await axios.post(`/api/user/upvote?collectionId=${collection.id}`)

            setLiked((current) => !current)
        } catch (error: any) {
            console.error('Encountered an error when unsaving this collection', error.message)

            setLiked(likedFromServer)
        } finally {
            setLiking(false)
        }
    }

    const toggleDislike = async () => {
        try {
            setDisliking(true)

            await axios.post(`/api/user/downvote?collectionId=${collection.id}`)

            setDisliked((current) => !current)
        } catch (error: any) {
            console.error('Encountered an error when unsaving this collection', error.message)

            setDisliked(dislikedFromServer)
        } finally {
            setDisliking(false)
        }
    }

    const renderSaveIcon = () =>
        saving ? (
            <AiOutlineLoading3Quarters className="animate-spin text-xl" />
        ) : saved ? (
            <AiFillHeart className="text-4xl cursor-pointer" onClick={toggleSave} />
        ) : (
            <AiOutlineHeart className="text-4xl cursor-pointer" onClick={toggleSave} />
        )

    const renderThumbsUpIcon = () =>
        liking ? (
            <AiOutlineLoading3Quarters className="animate-spin text-xl" />
        ) : liked ? (
            <BsHandThumbsUpFill className="text-4xl cursor-pointer" onClick={toggleLike} />
        ) : (
            <BsHandThumbsUp className="text-4xl cursor-pointer" onClick={toggleLike} />
        )

    const renderThumbsDownIcon = () =>
        disliking ? (
            <AiOutlineLoading3Quarters className="animate-spin text-xl" />
        ) : disliked ? (
            <BsHandThumbsDownFill className="text-4xl cursor-pointer" onClick={toggleDislike} />
        ) : (
            <BsHandThumbsDown className="text-4xl cursor-pointer" onClick={toggleDislike} />
        )

    return (
        <div className="flex flex-col p-4 sm:p-16">
            <div>
                <h1 className="text-6xl font-black uppercase">{collection.name}</h1>
                <div className="flex flex-row justify-between items-center border-t-2 border-slate-900 pt-8 mt-8">
                    <span>{renderSaveIcon()}</span>
                    <span>{renderThumbsUpIcon()}</span>
                    <span>{renderThumbsDownIcon()}</span>
                </div>
            </div>
            <ul className="pt-16">
                {collection?.items?.length &&
                    collection.items.map((item) => (
                        <li key={item.id}>
                            <span className="text-4xl font-bold">{item.value}</span>
                            <p>{item.description ? `(${item.description})` : null}</p>
                        </li>
                    ))}
            </ul>
            <div className="mt-16">
                <Button text="Home" buttonType="secondary" onClick={() => Router.push('/')} />
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
                upvoted: true,
                downvoted: true,
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
            items: {
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
            downvoted: user?.downvoted?.find((downvotedCollection) => downvotedCollection.id === collection.id) != null,
            upvoted: user?.upvoted?.find((upvotedCollection) => upvotedCollection.id === collection.id) != null,
        },
    }
}

export default CollectionPage
