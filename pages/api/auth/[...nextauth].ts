import NextAuth from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'

import prisma from '../../../prisma/client'

export default NextAuth({
    secret: process.env.SECRET,
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ user }) {
            if (user.email) {
                await prisma.user.upsert({
                    where: {
                        email: user.email,
                    },
                    create: {
                        email: user.email,
                        name: user.name,
                        lastLogin: new Date().toISOString(),
                    },
                    update: {
                        lastLogin: new Date().toISOString(),
                    },
                })
            }

            return true
        },
    },
})
