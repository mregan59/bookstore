import React from 'react'
import { storiesOf } from '@storybook/react-native'

import { LikeButton } from './LikeButton'
import { FlexBox } from '../FlexBox'

storiesOf('LikeButton', module)
    .add('Sizes', () => (
        <FlexBox row gutter={3} aligncenter>
            <LikeButton size="tiny" ></LikeButton>
            <LikeButton size="small" ></LikeButton>
            <LikeButton size="medium" ></LikeButton>
            <LikeButton size="large" ></LikeButton>
            <LikeButton size="giant" ></LikeButton>
        </FlexBox>

    ))
    .add('Status', () => (
        <FlexBox row gutter={3} aligncenter>
            <LikeButton status="primary" size="medium" ></LikeButton>
            <LikeButton status="success" size="medium" ></LikeButton>
            <LikeButton status="info" size="medium" ></LikeButton>
            <LikeButton status="warning" size="medium" ></LikeButton>
            <LikeButton status="danger" size="medium" ></LikeButton>
            <LikeButton status="basic" size="medium" ></LikeButton>
            <LikeButton status="control" size="medium" ></LikeButton>
        </FlexBox>
    ))
