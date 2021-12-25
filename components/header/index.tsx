import { useSession } from 'next-auth/react'

import { AuthButton } from '../auth-button'
import { ProfilePicture } from '../profile-picture'

export const Header = () => {
    const { data } = useSession()

    return (
        <header className="flex items-center justify-between pt-2 pb-2 pl-4 pr-4">
            <div>D100</div>
            <div className="flex gap-2">
                {data?.user && data.user.image && <ProfilePicture src={data.user.image} name={data.user.name} />}
                <AuthButton />
            </div>
        </header>
    )
}
