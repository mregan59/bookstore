import React, { useCallback, useRef, useState } from "react"
import { SafeAreaView, StyleSheet, View, Text } from "react-native"
import { RectButton } from "react-native-gesture-handler"
import { useSharedValue } from "react-native-reanimated"

import { ProfileModel } from "./Profile"
import Swipeable, { SwipeHandler } from "./Swipeable"

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

interface ProfilesProps {
    profiles: ProfileModel[];
}

export const defaultProfiles: ProfileModel[] = [
    {
        id: "1",
        name: "Caroline",
        age: 24,
        color: 'blue'
        // profile: require("./assets/1.jpg"),
    },
    {
        id: "2",
        name: "Jack",
        age: 30,
        color: 'hotpink'
        // profile: require("./assets/2.jpg"),
    },
    {
        id: "3",
        name: "Anet",
        age: 21,
        color: 'green'
        // profile: require("./assets/3.jpg"),
    },
    {
        id: "12",
        name: "Anet",
        age: 21,
        color: 'mediumpurple'
        // profile: require("./assets/3.jpg"),
    },
    {
        id: "4",
        name: "Anet",
        age: 21,
        color: 'cyan'
        // profile: require("./assets/3.jpg"),
    },
    {
        id: "5",
        name: "Anet",
        age: 21,
        color: 'yellow'
        // profile: require("./assets/3.jpg"),
    },
    {
        id: "6",
        name: "Anet",
        age: 21,
        color: 'gray'
        // profile: require("./assets/3.jpg"),
    },
    {
        id: "7",
        name: "John",
        age: 28,
        color: 'green'
        // profile: require("./assets/4.jpg"),
    },
]

export const Profiles = () => {
    const topCard = useRef<SwipeHandler>(null)
    const [profiles, setProfiles] = useState(defaultProfiles)
    const onSwipe = () => {
        setProfiles(profiles.slice(1))
    }

    const ref = topCard
    const topTwoProfiles = profiles.filter((p, i) => i <= 1).reverse()
    return (
        <SafeAreaView style={styles.container}>
            {/* <View style={styles.header}>
                <Icon name="user" size={32} color="gray" />
                <Icon name="message-circle" size={32} color="gray" />
            </View> */}
            <View style={styles.cards}>

                <Swipeable key={topTwoProfiles[1] ? topTwoProfiles[1].id : 12}
                    ref={ref}
                    profiles={topTwoProfiles}
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
                    {/* <Icon name="x" size={32} color="#ec5288" /> */}
                </RectButton>
                <RectButton
                    style={styles.circle}
                    onPress={() => {
                        topCard.current?.swipeRight()
                    }}
                >
                    <Text>Like</Text>
                    {/* <Icon name="heart" size={32} color="#6ee3b4" /> */}
                </RectButton>

            </View>
        </SafeAreaView>
    )
}
