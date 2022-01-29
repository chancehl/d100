import { useEffect } from 'react'
import axios from 'axios'

import { Collection } from '@prisma/client'
import client from '../prisma/client'

import { HomeButton } from '../components/home-button'

export const CollectionPage = ({ collection }: any) => {
    useEffect(() => {
        try {
            // We don't need to await this. It can just happen in the background.
            axios.post(`/api/collections/views?id=${collection.id}`)
        } catch (error: any) {
            console.error('Encountered an error when updating view count for collection. Views may not be accurate.')
        }
    }, [])

    return (
        <>
            <h1 className="text-5xl font-bold">{collection.name}</h1>
            <ul>
                {collection?.collectionItems?.length &&
                    collection.collectionItems.map((item: any) => (
                        <li key={item.id}>
                            {item.value} {item.description ? `(${item.description})` : null}
                        </li>
                    ))}
            </ul>
            <HomeButton />
        </>
    )
}

export const getStaticProps = async ({ params }: any) => {
    const collection = await client.collection.findUnique({
        where: {
            id: params.id,
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

    return {
        props: {
            collection: collection ?? null,
        },
    }
}

export const getStaticPaths = async () => {
    const collections = await client.collection.findMany()

    return {
        paths: collections.map((collection: Collection) => ({ params: { id: collection.id } })),
        fallback: false,
    }
}

export default CollectionPage
