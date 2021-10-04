/* global __DEV__ */
import React, { forwardRef, Ref, useImperativeHandle } from "react"
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
    const bottomItem = renderItem({ translateX, translateY, onTop: false, data: data[0], key: 1 })
    const topItem = renderItem({ translateX, translateY, onTop: true, data: data[1] || data[0], key: 2 })
    return (
        <View>
            {/* <Animated.View style={StyleSheet.absoluteFill}> */}
            {data[1] && <SwipeableCard key={1} translateX={translateX} translateY={translateY} onTop={false}>
                {bottomItem}
            </SwipeableCard>}
            {/* </Animated.View> */}
            <PanGestureHandler onGestureEvent={onGestureEvent}>
                <Animated.View style={StyleSheet.absoluteFill}>
                    <SwipeableCard key={2} translateX={translateX} translateY={translateY} onTop={true}>
                        {topItem}
                    </SwipeableCard>

                </Animated.View>
            </PanGestureHandler>

        </View>

    )
}

export default forwardRef(Swipeable)
