import React from "react"
import { observer } from "mobx-react-lite"
import { Button, Text, Layout } from "@ui-kitten/components"
import { Card as ProfileCard } from '../../profile/card'
import { InfiniteScroll } from '../../components/InfiniteScroll'
import { Profiles as Swiper } from '../../components/Swipeable/Swipeable'
export const WelcomeScreen = observer((props) => {
    const renderItem = ({ item }) => {
        return <ProfileCard profile={item} />
    }
    return (
        <Layout>
            {/* <InfiniteScroll renderItem={renderItem} query="search" /> */}
            <Swiper />
            <Text category="h3">Hi there</Text>
            <Button >Press</Button>
        </Layout>
    )
})
