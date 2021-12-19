import { HomeButton } from '../components/home-button'
import client from '../prisma/client'

export const ListPage = ({ collection }: any) => {
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
            createdAt: true,
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
            collection: JSON.parse(JSON.stringify(collection)) ?? null,
        },
    }
}

export const getStaticPaths = async () => {
    const collections = await client.collection.findMany()

    return {
        paths: collections.map((collection: any) => ({ params: { id: collection.id } })),
        fallback: false,
    }
}

export default ListPage
