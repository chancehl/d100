import Link from 'next/link'

const NAV_ITEMS = []
export const Nav = () => (
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
)
