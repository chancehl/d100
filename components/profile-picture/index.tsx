/* eslint-disable @next/next/no-img-element */
type Props = {
    src: string
    name?: string | null
}

export const ProfilePicture = ({ src, name }: Props) => (
    <div className="flex flex-row items-center">
        {name && <span className="mr-2 uppercase">{name}</span>}
        <img className="w-10 h-10 rounded-full" alt="profile-picture" src={src} />
    </div>
)
