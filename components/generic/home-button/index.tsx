import { useRouter } from 'next/router'

export const HomeButton = () => {
    const router = useRouter()

    return <button onClick={() => router.push('/')}>Home</button>
}
