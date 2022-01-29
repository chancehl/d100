import { ChangeEvent, useState } from 'react'
import axios from 'axios'

import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

import client from '../prisma/client'

const Home: NextPage = ({ popularCollections }: any) => {
    const router = useRouter()

    const [query, setQuery] = useState<string | null>(null)
    const [results, setResults] = useState<any[] | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value.length ? event.target.value : null)
    }

    const onSearchClick = async () => {
        if (query == null) {
            return
        }

        try {
            setLoading(true)

            const response = await axios.get(`/api/search?q=${encodeURIComponent(query)}`)

            const collections = response.data.collections

            setResults(collections.length ? collections : [])
        } catch (error: any) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Head>
                <title>D100</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="flex justify-center items-center h-screen">
                <input className="text-center" onChange={onInputChange} placeholder="Male dwarf names" />
                {loading && <span>Searching...</span>}
                {results == null ? null : results.length ? (
                    <ul>
                        {results.map((result: any) => (
                            <li key={result.id} onClick={() => router.push(`/${result.id}`)}>
                                {result.name}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <span>No results</span>
                )}
                <button disabled={query == null || query.length === 0} onClick={onSearchClick}>
                    Search
                </button>
            </main>
        </>
    )
}

export const getStaticProps = async ({ params }: any) => {
    const popularCollections = await client.collection.findMany({
        take: 25,
        orderBy: { views: 'desc' },
        select: {
            id: true,
            name: true,
            views: true,
        },
    })

    return {
        props: {
            popularCollections: popularCollections ?? [],
        },
    }
}

export default Home
