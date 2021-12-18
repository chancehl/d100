import { useRouter } from 'next/router'

import { HomeButton } from '../components/home-button'

export const ListPage = () => {
    const router = useRouter()

    const { id } = router.query

    return (
        <>
            <h1>id {id}</h1>
            <HomeButton />
        </>
    )
}

export default ListPage
