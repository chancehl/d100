import React from 'react'

import { ComponentMeta } from '@storybook/react'

import { ProfilePicture } from './'

export default {
    title: 'Profile picture',
    component: ProfilePicture,
} as ComponentMeta<typeof ProfilePicture>

const remoteSrc = 'https://archives.bulbagarden.net/media/upload/c/cd/113Chansey.png'

export const Default = () => <ProfilePicture src={remoteSrc} />

export const WithName = () => <ProfilePicture src={remoteSrc} name="Chancehl" />
