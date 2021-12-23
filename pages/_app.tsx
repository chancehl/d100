import '../styles/globals.css'

import { useState } from 'react'
import type { AppProps } from 'next/app'

import { RollContext } from '../context/roll-context'
import { generateRandomNumber } from '../utils/generate-random-number'

function MyApp({ Component, pageProps }: AppProps) {
    const [roll, setRoll] = useState(1)
    
    return <RollContext.Provider value={{ roll, setRoll: () => setRoll(generateRandomNumber(100)) }}><Component {...pageProps} /></RollContext.Provider>
}

export default MyApp
