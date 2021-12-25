import { useSession, signIn, signOut } from 'next-auth/react'

export const AuthButtons = () => {
    const { data } = useSession()

    if (data && data.user) {
        return <button onClick={() => signOut()}>Sign out</button>
    }

    return <button onClick={() => signIn()}>Sign in</button>
}
