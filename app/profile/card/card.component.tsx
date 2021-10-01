import React, { useEffect } from 'react'
import { View, Image, TouchableWithoutFeedback } from 'react-native'
import { Layout, Text, Button } from '@ui-kitten/components'
import { useStores } from '../../store'
import { observer } from 'mobx-react-lite'
import Reactotron from 'reactotron-react-native'

export const Card = observer(({ profile }) => {
    useEffect(() => {
        //  Reactotron.log(profile)
    }, [])
    if (!profile) {
        return null
    }

    return (
        <View style={{ height: 250, width: 120 }}>
            <Image style={{ height: 200, width: 120 }} source={{ uri: profile.photo }} />
            <Text>{profile.first_name}</Text>
            <Text>{profile.location}</Text>
            <Text>{profile.age}</Text>
        </View>
    )
})
