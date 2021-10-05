import React, { useEffect } from 'react'
import { View, Image, TouchableWithoutFeedback, StyleSheet, Dimensions } from 'react-native'
import { Layout, Text, Button } from '@ui-kitten/components'
import { useStores } from '../../store'
import { observer } from 'mobx-react-lite'
import Reactotron from 'reactotron-react-native'
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useDerivedValue } from 'react-native-reanimated'
import { dimensions } from '../../theme/variables'
import { usePrevious } from '../../utils/hooks'
const { width } = Dimensions.get("window")

const MemoizedImage = React.memo(({ photo }) => {
    return <Image style={{ height: 200, width: 120 }} source={{ uri: photo }} />
}, (prevProps, nextProps) => {
    console.log('prevProps HERE')
    console.log(prevProps)
    console.log(nextProps)
    if (prevProps.photo == nextProps.photo) {
        return true
    }
    return false
})

export const SwipeableCard = observer(({ profile, onTop, translateX }) => {
    const x = useDerivedValue(() => (translateX.value))
    useEffect(() => {
        //  Reactotron.log(profile)
    }, [])
    if (!profile) {
        return null
    }

    const nope = useAnimatedStyle(() => ({
        opacity: onTop ? interpolate(x.value, [-width / 4, 0], [1, 0]) : 0,
    }))
    const like = useAnimatedStyle(() => ({
        opacity: onTop ? interpolate(x.value, [0, width / 4], [0, 1], Extrapolate.CLAMP) : 0,
    }))

    return (
        <View style={{ height: 300, width: 250, backgroundColor: 'green', borderRadius: 10 }}>
            <View style={styles.overlay}>
                <View style={styles.header}>
                    <Animated.View style={[styles.like, like]}>
                        <Text style={styles.likeLabel}>LIKE</Text>
                    </Animated.View>
                    <Animated.View style={[styles.nope, nope]}>
                        <Text style={styles.nopeLabel}>NOPE</Text>
                    </Animated.View>
                </View>
            </View>
            <MemoizedImage photo={profile.photo} />
            <Text>{profile.first_name}</Text>
            <Text>{profile.location}</Text>
            <Text>{profile.age}</Text>

        </View>
    )
})
export const Card = observer(({ profile }) => {
    if (!profile) {
        return null
    }

    return (
        <View style={{ height: 300, width: 250, backgroundColor: 'green', borderRadius: 10 }}>

            <Image style={{ height: 200, width: 120 }} source={{ uri: profile.photo }} />
            <Text>{profile.first_name}</Text>
            <Text>{profile.location}</Text>
            <Text>{profile.age}</Text>

        </View>
    )
})

const styles = StyleSheet.create({
    footer: {
        flexDirection: "row",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 8,
        height: undefined,
        width: undefined,
    },
    like: {
        borderColor: "#6ee3b4",
        borderRadius: 5,
        borderWidth: 4,
        padding: 8,
    },
    likeLabel: {
        color: "#6ee3b4",
        fontSize: 32,
        fontWeight: "bold",
    },
    name: {
        color: "white",
        fontSize: 32,
    },
    nope: {
        borderColor: "#ec5288",
        borderRadius: 5,
        borderWidth: 4,
        padding: 8,
    },
    nopeLabel: {
        color: "#ec5288",
        fontSize: 32,
        fontWeight: "bold",
    },
    overlay: {
        flex: 1,
        justifyContent: "space-between",
        padding: 16,
    },
})
