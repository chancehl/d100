import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'

import { HomeButton } from '../../components/home-button'

type Props = {
    results: string[]
}

export const SearchPage = ({ results }: Props) => {
    const router = useRouter()

    const { q } = router.query

    return (
        <>
            <h1>query {q}</h1>
            <ul>
                {results.map((result, index) => (
                    <li key={index}>{result}</li>
                ))}
            </ul>
            <HomeButton />
        </>
    )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    return { props: { results: ['foo', 'bar', 'baz'] } }
}

export default SearchPage
