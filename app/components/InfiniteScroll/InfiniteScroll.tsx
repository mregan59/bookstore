import React, { useEffect, useRef, useState } from 'react'
import { View, TouchableWithoutFeedback, FlatList, RefreshControl } from 'react-native'
import { Layout, Text, Button } from '@ui-kitten/components'
import { useStores } from '../../models'
import { dimensions } from '../../theme/variables'
import { observer } from 'mobx-react-lite'
import Reactotron from 'reactotron-react-native'
// import { useQuery, useInfiniteQuery, useMutation } from 'react-query'
import { useInfiniteQuery } from '../../utils/hooks'
export const InfiniteScroll = observer(({ query = 'browses', renderItem }) => {
    const store = useStores()
    const fetchProfiles = ({ pageParam = 1 }) =>
        store.profileList.getProfiles(pageParam, query)

    const {
        data,
        fetchNextPage,
        isFetching,
        allData
    } = useInfiniteQuery(query, fetchProfiles,)

    const allProfiles = React.useMemo(() => allData?.map(p => store.profileList.profiles.get(p)), [allData])
    const flatList = useRef(null)
    if (!data) {
        return null
    }

    const onRefresh = () => {
        //  setDidLoad(true)
        //  query.getResults()

    }

    const onEndReached = (e) => {
        fetchNextPage()
    }

    return (
        <Layout>
            <Text>Search</Text>
            <FlatList
                refreshControl={
                    <RefreshControl
                        style={{
                            backgroundColor: 'transparent',
                        }}
                        refreshing={isFetching}
                        onRefresh={onRefresh}
                    />
                }
                style={{ height: dimensions.height }}
                scrollEventThrottle={60}
                ref={flatList}
                // style={styles.searchList}
                data={allProfiles}
                initialNumToRender={1}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.5}
                showsVerticalScrollIndicator={false}
                numColumns={2}
            />
        </Layout>
    )
})
