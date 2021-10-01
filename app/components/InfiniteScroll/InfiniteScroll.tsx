import React, { useEffect, useRef, useState } from 'react'
import { View, TouchableWithoutFeedback, FlatList, RefreshControl } from 'react-native'
import { Layout, Text, Button } from '@ui-kitten/components'
import { useStores } from '../../store'
import { dimensions } from '../../theme/variables'
import { observer } from 'mobx-react-lite'
import Reactotron from 'reactotron-react-native'

export const InfiniteScroll = observer(({ query: queryKey = 'search', renderItem }) => {
    const { profileList } = useStores()
    const [hasScrolled, setHasScrolled] = useState(false)
    const [didLoad, setDidLoad] = useState(false)
    const { queries } = profileList
    const query = queries?.get(queryKey)
    if (!query) {
        return null
    }
    const flatList = useRef(null)
    useEffect(() => {
        Reactotron.display({
            name: 'QUERY',
            preview: queryKey,
            value: query,
        })

        if (!query.results || query.results.length === 0) {
            query.getResults()
            setDidLoad(true)
        }
    }, [])

    const onRefresh = () => {
        setDidLoad(true)
        query.getResults()
    }

    const onScroll = (e) => {
        if (!hasScrolled) {
            setHasScrolled(true)
        }
    }
    const onEndReached = (e) => {
        if (!query.loading && query.current_page > 1 && !query.completed) {
            query.getResults()
        }
    }

    return (
        <Layout>
            <Text>{query.api}</Text>
            <FlatList
                refreshControl={
                    <RefreshControl
                        style={{
                            backgroundColor: 'transparent',
                        }}
                        refreshing={query.loading && didLoad}
                        onRefresh={onRefresh}
                    />
                }
                style={{ height: dimensions.height }}
                onScroll={onScroll}
                scrollEventThrottle={60}
                ref={flatList}
                // style={styles.searchList}
                data={query.results}
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
