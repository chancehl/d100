import { useSession, signIn, signOut } from 'next-auth/react'

export const AuthButton = () => {
    const { data } = useSession()

    if (data && data.user) {
        return (
            <>
                Signed in as: {data.user.email} <button onClick={() => signOut()}>Sign out</button>
            </>
        )
    }

    return (
        <>
            Not signed in
            <button onClick={() => signIn()}>Sign in</button>
        </>
    )
}
