/* eslint-disable @next/next/no-img-element */
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

export const Header = () => {
    const { data } = useSession()

    return (
        <header className="flex items-center justify-between pt-2 pb-2 pl-4 pr-4">
            <Link href="/">
                <a>D100</a>
            </Link>
            <nav>
                <ul className="flex flex-row gap-[128px]">
                    <li>
                        <Link href="/popular">
                            <a>Most popular</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/saved">
                            <a>Saved</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/blog/hello-world">
                            <a>Blog Post</a>
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className="flex gap-2">
                <div className="flex flex-row items-center">
                    {data?.user?.name && <span className="mr-2 uppercase">{data.user.name}</span>}
                    {data?.user?.image && <img className="w-10 h-10 rounded-full" alt="profile-picture" src={data.user.image} />}
                </div>
                {data?.user == null ? <button onClick={() => signIn()}>Sign in</button> : <button onClick={() => signOut()}>Sign out</button>}
            </div>
        </header>
    )
}
