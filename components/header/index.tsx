import { useSession } from 'next-auth/react'

import { AuthButtons } from '../auth-buttons'
import { ProfilePicture } from '../profile-picture'
import { Nav } from '../nav'
import { Logo } from '../logo'

export const Header = () => {
    const { data } = useSession()

    return (
        <header className="flex items-center justify-between pt-2 pb-2 pl-4 pr-4">
            <Logo />
            <Nav />
            <div className="flex gap-2">
                {data?.user && data.user.image && <ProfilePicture src={data.user.image} name={data.user.name} />}
                <AuthButtons />
            </div>
        </header>
    )
}
