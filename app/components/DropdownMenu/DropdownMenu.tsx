// relative
// bottom
// modal
// content
// backgroundColor
// textColor: contrast, etc

// TODO MAKE MORE PROPERTIES FOR THIS
// make pulse

import React from 'react'
import { ImageProps, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Button, Text } from '@ui-kitten/components'
import { IconButton } from '../IconButton'
import { FlexBox } from '../FlexBox'
import { MoreHorizontalIcon } from '../../assets/icons'
import { useToggle } from '../../utils/hooks'
import { useStores } from '../../store'
import { observer } from 'mobx-react-lite'

import { View as MotiView, AnimatePresence } from 'moti'

export const DropdownMenu = observer(({ open, Icon }) => {
    const [isOpen, setIsOpen] = useToggle(open)
    const { test } = useStores()
    return (
        <React.Fragment>
            <FlexBox style={{ position: 'relative' }} alignstart justifycenter>
                <Text>{test.name}</Text>
                <Button onPress={() => test.setName('Thomas')}>test</Button>
                <IconButton onPress={setIsOpen} Icon={Icon || MoreHorizontalIcon} />
                <AnimatePresence>
                    {isOpen && (
                        <MotiView
                            style={{
                                padding: 20,
                                position: 'absolute',
                                borderRadius: 10,
                                top: '100%',
                                height: 50,
                                width: 50,
                                backgroundColor: 'hotpink',
                            }}
                            from={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{
                                opacity: 0,
                                scale: 0.5,
                            }}
                            transition={{ type: 'timing' }}
                        />
                    )}
                </AnimatePresence>
            </FlexBox>
        </React.Fragment>
    )
})
