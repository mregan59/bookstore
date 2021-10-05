import React, { useCallback, useRef, useState } from "react"
import { SafeAreaView, StyleSheet, View, Text } from "react-native"
import { RectButton } from "react-native-gesture-handler"
import { useSharedValue } from "react-native-reanimated"
// import Profile, { ProfileModel } from "./Profile"
import { SwipeableCard as Card } from '../../../profile/card'
import Swipeable, { SwipeHandler } from "./Swipeable"
import { useStores } from '../../../store'
import { observer } from 'mobx-react-lite'
import Reactotron from 'reactotron-react-native'
import { usePrevious } from "../../../utils/hooks"

const styles = StyleSheet.create({
    cards: {
        flex: 1,
        marginHorizontal: 16,
        zIndex: 100,
    },
    circle: {
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 32,
        height: 64,
        justifyContent: "center",
        padding: 12,
        shadowColor: "gray",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.18,
        shadowRadius: 2,
        width: 64,
    },
    container: {
        backgroundColor: 'orange',
        // flex: 1,
        height: 400,
        justifyContent: "space-evenly",
        width: 300,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        padding: 16,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 16,
    },
})

// export const defaultProfiles: ProfileModel[] = [
//     {
//         id: "1",
//         first_name: "Caroline",
//         age: 24,
//         location: 'blue'
//         // profile: require("./assets/1.jpg"),
//     },
//     {
//         id: "2",
//         first_name: "Jack",
//         age: 30,
//         location: 'hotpink'
//         // profile: require("./assets/2.jpg"),
//     },
//     {
//         id: "3",
//         first_name: "Anet",
//         age: 21,
//         location: 'green'
//         // profile: require("./assets/3.jpg"),
//     },
//     {
//         id: "12",
//         first_name: "Anet",
//         age: 21,
//         location: 'mediumpurple'
//         // profile: require("./assets/3.jpg"),
//     },
//     {
//         id: "4",
//         first_name: "Anet",
//         age: 21,
//         location: 'cyan'
//         // profile: require("./assets/3.jpg"),
//     },
//     {
//         id: "5",
//         first_name: "Anet",
//         age: 21,
//         location: 'yellow'
//         // profile: require("./assets/3.jpg"),
//     },
//     {
//         id: "6",
//         first_name: "Anet",
//         age: 21,
//         location: 'gray'
//         // profile: require("./assets/3.jpg"),
//     },
//     {
//         id: "7",
//         first_name: "John",
//         age: 28,
//         location: 'green'
//         // profile: require("./assets/4.jpg"),
//     },
// ]

export const Swiper = () => {
    const { profileList } = useStores()
    console.log(profileList)
    const { queries } = profileList
    const query = queries?.get('search')
    if (!query) {
        return null
    }
    const topCard = useRef<SwipeHandler>(null)
    const [profiles, setProfiles] = useState(query.results)
    const onSwipe = useCallback(() => {
        setProfiles(profiles.slice(1))
    }, [profiles])

    const ref = topCard
    const topTwoProfiles = [...profiles.filter((p, i) => i <= 1)].reverse()

    const renderItem = ({ data, ...renderProps }) => {
        return <Card profile={data} {...renderProps}></Card>
    }
    return (
        <SafeAreaView style={styles.container}>
            {/* <View style={styles.header}>
                <Icon first_name="user" size={32} location="gray" />
                <Icon first_name="message-circle" size={32} location="gray" />
            </View> */}
            <View style={styles.cards}>

                <Swipeable
                    ref={ref}
                    data={topTwoProfiles}
                    renderItem={renderItem}
                    // scale={scale}
                    onSwipe={onSwipe}
                // onTop={onTop}
                />
            </View>
            <View style={styles.footer}>
                <RectButton
                    style={styles.circle}
                    onPress={() => {
                        topCard.current?.swipeLeft()
                    }}
                >
                    <Text>Nope</Text>
                    {/* <Icon first_name="x" size={32} location="#ec5288" /> */}
                </RectButton>
                <RectButton
                    style={styles.circle}
                    onPress={() => {
                        topCard.current?.swipeRight()
                    }}
                >
                    <Text>Like</Text>
                    {/* <Icon first_name="heart" size={32} location="#6ee3b4" /> */}
                </RectButton>

            </View>
        </SafeAreaView>
    )
}
