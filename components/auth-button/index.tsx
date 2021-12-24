import { useEffect } from 'react'

import { useSession, signIn, signOut } from 'next-auth/react'

export const AuthButton = () => {
    const { data } = useSession()

    if (data && data.user) {
        return <button onClick={() => signOut()}>Sign out</button>
    }

    return <button onClick={() => signIn()}>Sign in</button>
}
