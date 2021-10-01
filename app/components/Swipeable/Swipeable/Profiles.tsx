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
        // profile: require("./assets/1.jpg"),
    },
    {
        id: "2",
        name: "Jack",
        age: 30,
        // profile: require("./assets/2.jpg"),
    },
    {
        id: "3",
        name: "Anet",
        age: 21,
        // profile: require("./assets/3.jpg"),
    },
    {
        id: "4",
        name: "John",
        age: 28,
        // profile: require("./assets/4.jpg"),
    },
]

export const Profiles = () => {
    const topCard = useRef<SwipeHandler>(null)
    const scale = useSharedValue(0)
    const [profiles, setProfiles] = useState(defaultProfiles)
    const onSwipe = useCallback(() => {
        setProfiles(profiles.slice(0, profiles.length - 1))
    }, [profiles])
    return (
        <SafeAreaView style={styles.container}>
            {/* <View style={styles.header}>
                <Icon name="user" size={32} color="gray" />
                <Icon name="message-circle" size={32} color="gray" />
            </View> */}
            <View style={styles.cards}>
                {profiles.map((profile, index) => {
                    const onTop = index === profiles.length - 1
                    const ref = onTop ? topCard : null
                    return (
                        <Swipeable
                            ref={ref}
                            key={profile.id}
                            profile={profile}
                            scale={scale}
                            onSwipe={onSwipe}
                            onTop={onTop}
                        />
                    )
                })}
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
