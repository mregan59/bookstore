import React, { useEffect } from "react"
import {View} from "react-native"
import { observer } from "mobx-react-lite"
import { Button, Text, Layout } from "@ui-kitten/components"
import { Card as ProfileCard } from '../../profile/card'
import { Book } from '../../Book'
import { InfiniteScroll, CircleTabs, Scanner } from '../../components'
import { Profiles as Swiper } from '../../components/Swipeable/Swipeable'
import { useStores } from '../../models'
import { useQuery, useInfiniteQuery, useMutation } from 'react-query'
import Reactotron from "reactotron-react-native"
import { concat } from 'lodash'
import {useDidUpdateEffect} from '../../utils/hooks'
import { useNavigation } from "@react-navigation/native"

export const BookModal = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
       <Book></Book>
    </View>
  );
}


export const WelcomeScreen = observer((props) => {
    const navigation = useNavigation()

    const store = useStores()

    const scannedBook = store.bookList?.scannedBook;

    const navigate = () => {
        navigation.navigate('demo')
    }

    useEffect(() => {
        console.log(store)
       // store.bookList?.getBook(`0440335701`)
    }, [])
    useDidUpdateEffect(() => {
        if(scannedBook) {
            navigation.navigate("book")
        }
    }, [scannedBook])

    return (
        <Layout>
            <Scanner></Scanner>
        </Layout>
    )
})
