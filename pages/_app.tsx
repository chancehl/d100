import '../styles/globals.css'

import { useState } from 'react'

import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'

import { ToastContainer, toast } from 'react-toastify'

import { RollContext } from '../context/roll-context'
import { generateRandomNumber } from '../utils/generate-random-number'
import { RollNotification } from '../components/roll-notification'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    const [roll, setRoll] = useState(1)

    const setRollAndNotify = () => {
        const newRoll = generateRandomNumber(100)

        // set in state
        setRoll(newRoll)

        // notify
        toast(<RollNotification roll={newRoll} />, { autoClose: 7500 })
    }

    return (
        <SessionProvider session={session}>
            <RollContext.Provider value={{ roll, setRoll: setRollAndNotify }}>
                <ToastContainer />
                <Component {...pageProps} />
            </RollContext.Provider>
        </SessionProvider>
    )
}

export default MyApp
