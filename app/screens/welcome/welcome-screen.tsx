import React from "react"
import { observer } from "mobx-react-lite"
import { Button, Text, Layout } from "@ui-kitten/components"
import { Card as ProfileCard } from '../../profile/card'
import { InfiniteScroll } from '../../components/InfiniteScroll'
import { Profiles as Swiper } from '../../components/Swipeable/Swipeable'
import { useStores } from '../../models'
import { useQuery, useInfiniteQuery, useMutation } from 'react-query'
import Reactotron from "reactotron-react-native"
import { concat } from 'lodash'
import { useNavigation } from "@react-navigation/native"
export const WelcomeScreen = observer((props) => {
    const navigation = useNavigation()
    const renderItem = ({ item }) => {
        return <ProfileCard profile={item} />
    }

    const navigate = () => {
        navigation.navigate('demo')
    }

    return (
        <Layout>
            <Button onPress={navigate}>Press</Button>
            <InfiniteScroll renderItem={renderItem} />
            {/* <Swiper /> */}
            <Text category="h3">Hi there</Text>

        </Layout>
    )
})
