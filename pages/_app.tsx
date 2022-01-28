import '../styles/globals.css'

import { useState } from 'react'

import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'

import { RollContext } from '../context/roll-context'
import { generateRandomNumber } from '../utils/generate-random-number'

import { Header } from '../components/page/header'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    const [roll, setRoll] = useState(1)

    return (
        <SessionProvider session={session}>
            <RollContext.Provider value={{ roll, setRoll: () => setRoll(generateRandomNumber(100)) }}>
                <Header />
                <Component {...pageProps} />
            </RollContext.Provider>
        </SessionProvider>
    )
}

export default MyApp
