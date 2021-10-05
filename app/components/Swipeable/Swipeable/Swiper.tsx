import React, { useCallback, useRef, useState, useEffect } from "react"
import { SafeAreaView, StyleSheet, View, Text } from "react-native"
import { RectButton } from "react-native-gesture-handler"
import { useSharedValue } from "react-native-reanimated"
// import Profile, { ProfileModel } from "./Profile"
import { SwipeableCard as Card } from '../../../profile/card'
import Swipeable, { SwipeHandler } from "./Swipeable"
import { useStores } from '../../../models'
import { observer } from 'mobx-react-lite'
import Reactotron from 'reactotron-react-native'
import { usePrevious, useInfiniteQuery } from "../../../utils/hooks"

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

export const Swiper = observer(({ query = "browses" }) => {
    const store = useStores()
    const fetchProfiles = ({ pageParam = 1 }) =>
        store.profileList.getProfiles(pageParam, query)

    const {
        data,
        fetchNextPage,
        isFetching,
        allData
    } = useInfiniteQuery(query, fetchProfiles,)

    const profiles = React.useMemo(() => allData?.map(p => store.profileList.profiles.get(p)), [allData])
    console.log('profiles')
    console.log(profiles)

    const topCard = useRef<SwipeHandler>(null)
    const [index, setIndex] = useState(0)
    const onSwipe = () => {
        setIndex(index + 1)
        if (index >= profiles?.length - 5 && !isFetching) {
            fetchNextPage()
        }
    }

    if (!profiles) {
        return null
    }
    const ref = topCard
    const topTwoProfiles = [...profiles.filter((p, i) => i === index || i === index + 1)].reverse()

    const renderItem = ({ data, ...renderProps }) => {
        return <Card profile={data} {...renderProps}></Card>
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.cards}>

                <Swipeable
                    ref={ref}
                    data={topTwoProfiles}
                    renderItem={renderItem}
                    onSwipe={onSwipe}
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
                </RectButton>
                <RectButton
                    style={styles.circle}
                    onPress={() => {
                        topCard.current?.swipeRight()
                    }}
                >
                    <Text>Like</Text>
                </RectButton>

            </View>
        </SafeAreaView>
    )
})
