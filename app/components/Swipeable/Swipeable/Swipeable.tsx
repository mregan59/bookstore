/* global __DEV__ */
import React, { useEffect, forwardRef, Ref, useImperativeHandle } from "react"
import { StyleSheet, Dimensions, View } from "react-native"
import {
    PanGestureHandler,
} from "react-native-gesture-handler"
import Animated, {
    runOnJS,
    useAnimatedGestureHandler,
    useSharedValue,
    withSpring,
} from "react-native-reanimated"
import { snapPoint } from "react-native-redash"

import SwipeableCard, { α } from "./SwipeableCard"

const { width, height } = Dimensions.get("window")

const A = Math.round(width * Math.cos(α) + height * Math.sin(α))
const snapPoints = [-A, 0, A]

export interface SwipeHandler {
    swipeLeft: () => void;
    swipeRight: () => void;
}

interface SwiperProps {
    onSwipe: () => void;
    data: ProfileModel[];
    renderItem: (props) => React.ReactElement
    ;
}

const swipe = (
    translateX: Animated.SharedValue<number>,
    dest: number,
    velocity: number,
    cb: () => void
) => {
    "worklet"
    translateX.value = withSpring(
        dest,
        {
            velocity,
            overshootClamping: dest !== 0,
            restSpeedThreshold: dest === 0 ? 0.01 : 100,
            restDisplacementThreshold: dest === 0 ? 0.01 : 100,
        },
        () => {
            if (dest !== 0) {
                runOnJS(cb)()
            }
        }
    )
}

const MemoizedSwipeableCard = ({ onGestureEvent, translateX, translateY, onTop, data, renderItem }) => {
    const item = renderItem({ translateX, translateY, onTop, data })
    const renderContent = React.useMemo(() => <SwipeableCard translateX={translateX} translateY={translateY} onTop={onTop}>
        {item}
    </SwipeableCard>, [onTop, data.id])
    // if (onTop) {
    return (<PanGestureHandler onGestureEvent={onTop && onGestureEvent}>
        <Animated.View style={StyleSheet.absoluteFill}>
            {renderContent}
        </Animated.View>
    </PanGestureHandler>)
    // }
    // return renderContent
}

const Swipeable = (
    {
        onSwipe,
        data,
        renderItem,
    }: SwiperProps,
    ref: Ref<SwipeHandler>
) => {
    const translateX = useSharedValue(0)
    const translateY = useSharedValue(0)
    console.log('PRFOILEs')
    console.log(data)
    useEffect(() => {
        translateX.value = 0
        translateY.value = 0
    }, [data[0]])

    useImperativeHandle(ref, () => ({
        swipeLeft: () => {
            swipe(translateX, -A, 5, onSwipe)
        },
        swipeRight: () => {
            swipe(translateX, A, 5, onSwipe)
        },
    }))

    const onGestureEvent = useAnimatedGestureHandler({
        onStart: (_, ctx) => {
            ctx.x = translateX.value
            ctx.y = translateY.value
        },
        onActive: ({ translationX, translationY }, { x, y }) => {
            translateX.value = x + translationX
            translateY.value = y + translationY
        },
        onEnd: ({ velocityX, velocityY }) => {
            const dest = snapPoint(translateX.value, velocityX, snapPoints)
            swipe(translateX, dest, 5, onSwipe)
            translateY.value = withSpring(0, { velocity: velocityY })
        },
    })
    return (
        <View>
            {data.map((item, i) => <MemoizedSwipeableCard key={item.id} onGestureEvent={onGestureEvent} renderItem={renderItem} data={item}
                translateX={translateX} translateY={translateY} onTop={i == 1}></MemoizedSwipeableCard>)}

        </View>

    )
}

export default forwardRef(Swipeable)
