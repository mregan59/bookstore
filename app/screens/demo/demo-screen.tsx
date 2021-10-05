import React from "react"
import { Image, ImageStyle, Platform, TextStyle, View, } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Button, Text } from '@ui-kitten/components'
import { observer } from "mobx-react-lite"
import { Api } from "../../services/api"
import { save } from "../../utils/storage"
import { Swiper } from "../../components/Swipeable/Swipeable"

export const DemoScreen = observer(function DemoScreen() {
    const navigation = useNavigation()
    const goBack = () => navigation.goBack()

    return (
        <View testID="DemoScreen" >
            <Text>Hi there</Text>
            <Button onPress={goBack}>Press</Button>
            <Swiper></Swiper>
        </View >
    )
})
