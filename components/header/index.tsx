/* eslint-disable @next/next/no-img-element */
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

import { Button } from '../button/button'

export const Header = () => {
    const { data } = useSession()

    return (
        <header className="flex items-center justify-between pt-2 pb-2 pl-4 pr-4">
            <Link href="/">
                <a>D100</a>
            </Link>
            <div className="flex gap-2">
                <div className="flex flex-row items-center">
                    {data?.user?.name && <span className="mr-2 uppercase">{data.user.name}</span>}
                    {data?.user?.image && <img className="w-10 h-10 rounded-full" alt="profile-picture" src={data.user.image} />}
                </div>
                {data?.user == null ? <Button onClick={() => signIn()}>Sign in</Button> : <Button onClick={() => signOut()}>Sign out</Button>}
            </div>
        </header>
    )
}
