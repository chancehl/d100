import type { GetStaticProps, NextPage } from 'next'

import Head from 'next/head'
import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useState } from 'react'

import prismaClient from '../prisma/client'

const Home: NextPage = ({ users }: any) => {
    const router = useRouter()

    const [query, setQuery] = useState<string | null>(null)

    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value.length ? event.target.value : null)
    }

    const onSearchClick = () => {
        if (query) {
            router.push(`/search?q=${encodeURIComponent(query)}`)
        }
    }

    const onShuffleClick = () => {
        router.push(`/dwarf-names`)
    }

    useEffect(() => {
        console.log(users)
    }, [users])

    return (
        <>
            <Head>
                <title>D100</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h1 className="text-3xl font-bold underline">{query ?? 'Hello, world!'}</h1>
                <input onChange={onInputChange} />
                <button disabled={query == null || query.length === 0} onClick={onSearchClick}>
                    Search
                </button>
                <button onClick={onShuffleClick}>Shuffle</button>
            </main>
        </>
    )
}

// index.tsx
export const getStaticProps: GetStaticProps = async () => {
    const users = await prismaClient.user.findMany()

    return { props: { users: JSON.parse(JSON.stringify(users)) } }
}

export default Home
