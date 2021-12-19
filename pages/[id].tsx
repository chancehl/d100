import { Collection } from '@prisma/client'
import client from '../prisma/client'

import { HomeButton } from '../components/home-button'

type Props = {
    collection: Collection
}

export const CollectionPage = ({ collection }: any) => {
    return (
        <>
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
