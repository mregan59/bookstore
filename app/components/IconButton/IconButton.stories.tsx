import React from 'react'
import { storiesOf } from '@storybook/react-native'

import { IconButton } from './IconButton'
import { FlexBox } from '../FlexBox'
import {
    ChevronBackIcon,
} from '../../assets/icons'

storiesOf('IconButton', module)
    .add('Sizes', () => (
        <FlexBox row gutter={3} aligncenter>
            <IconButton size="tiny" Icon={ChevronBackIcon}></IconButton>
            <IconButton size="small" Icon={ChevronBackIcon}></IconButton>
            <IconButton size="medium" Icon={ChevronBackIcon}></IconButton>
            <IconButton size="large" Icon={ChevronBackIcon}></IconButton>
            <IconButton size="giant" Icon={ChevronBackIcon}></IconButton>
        </FlexBox>

    ))
    .add('Status', () => (
        <FlexBox row gutter={3} aligncenter>
            <IconButton status="primary" size="medium" Icon={ChevronBackIcon}></IconButton>
            <IconButton status="success" size="medium" Icon={ChevronBackIcon}></IconButton>
            <IconButton status="info" size="medium" Icon={ChevronBackIcon}></IconButton>
            <IconButton status="warning" size="medium" Icon={ChevronBackIcon}></IconButton>
            <IconButton status="danger" size="medium" Icon={ChevronBackIcon}></IconButton>
            <IconButton status="basic" size="medium" Icon={ChevronBackIcon}></IconButton>
            <IconButton status="control" size="medium" Icon={ChevronBackIcon}></IconButton>
        </FlexBox>
    ))
