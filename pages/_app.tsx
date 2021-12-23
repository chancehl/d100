import '../styles/globals.css'

import { useState } from 'react'
import type { AppProps } from 'next/app'

import { RollContext } from '../context/roll-context'

function MyApp({ Component, pageProps }: AppProps) {
    const [roll, setRoll] = useState(1)

    const generateRandomValue = (max: number) => {
        return Math.floor(Math.random() * max)
    }
    
    return <RollContext.Provider value={{ roll, setRoll: () => setRoll(generateRandomValue(100)) }}><Component {...pageProps} /></RollContext.Provider>
}

export default MyApp
