import { useRouter } from 'next/router'

const allItems: Record<string, string[]> = {
    1: ['Banana', 'Cherry', 'Orange'],
    5: ['Tomato', 'Corn', 'Lettuce'],
}

export default function Items({ items }: any) {
    const router = useRouter()

    const { id } = router.query

    return (
        <h1>
            item id: {id}, items: {items.join(', ')}
        </h1>
    )
}

export async function getStaticPaths() {
    return {
        paths: [{ params: { id: '1' } }, { params: { id: '5' } }],
        fallback: false,
    }
}

export async function getStaticProps({ params }: any) {
    return { props: { items: allItems[params.id] } }
}
