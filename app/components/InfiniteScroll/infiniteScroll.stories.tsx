import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { Card as ProfileCard } from '../../profile/card'
import { InfiniteScroll } from './InfiniteScroll'
const renderItem = ({ item }) => {
    return <ProfileCard profile={item} />
}
storiesOf('InfiniteScroll', module).add('example', () => <InfiniteScroll renderItem={renderItem} query="search" />).add('default', () => <InfiniteScroll renderItem={renderItem} query="search" />)
