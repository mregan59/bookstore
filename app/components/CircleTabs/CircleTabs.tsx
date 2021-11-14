import React, { useEffect, useRef, useState } from 'react'
import { View, TouchableWithoutFeedback, FlatList, RefreshControl } from 'react-native'
import { Layout, Text, Button } from '@ui-kitten/components'
import { useStores } from '../../models'
import { dimensions } from '../../theme/variables'
import { observer } from 'mobx-react-lite'
import Reactotron from 'reactotron-react-native'
import { Swiper } from '../Swipeable/Swipeable'
// import { useQuery, useInfiniteQuery, useMutation } from 'react-query'
import { useInfiniteQuery } from '../../utils/hooks'

const Tab = observer(({ query, onPress, children }) => {
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

    if (!profiles) {
        return null
    }

    console.log(profiles[0])

    return (<View><Text></Text><Button onPress={onPress}>{profiles[0]?.first_name}</Button></View>)
})

export const CircleTabs = observer(({ query: incomingQuery = 'birthdays' }) => {
    const [query, setQuery] = useState(incomingQuery)

    const onPressNew = () => {
        setQuery('birthdays')
    }
    const onPressViews = () => {
        setQuery('browses')
    }

    return (
        <Layout>
            <Text>Hi there</Text>
            <Tab query={"birthdays"} onPress={onPressNew}>New Members</Tab>
            <Tab query={"browses"} onPress={onPressViews}>Views</Tab>
            <Swiper key={query} query={query}></Swiper>

        </Layout>
    )
})
