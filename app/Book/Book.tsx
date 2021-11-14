import React, { useEffect, useRef, useState } from 'react'
import { View, TouchableWithoutFeedback, FlatList, RefreshControl, Image, ScrollView } from 'react-native'
import { Layout, Text, Button } from '@ui-kitten/components'
import { useStores } from '../models'
import { dimensions } from '../../theme/variables'
import { observer } from 'mobx-react-lite'
import Reactotron from 'reactotron-react-native'

export const Book = observer(() => {
        const store = useStores()
        const book = store.bookList?.scannedBook;
	if (!book) return <Text>No Book</Text>

	return (
        <ScrollView>
            <Layout>
                <Image style={{ height: 200, width: 120 }} source={{ uri: book.thumbnail }}></Image>
                <Text>{book.title}</Text>
                <Text>{book.subtitle}</Text>
                <Text>{book.description}</Text>
            </Layout>
        </ScrollView>
	)
})
