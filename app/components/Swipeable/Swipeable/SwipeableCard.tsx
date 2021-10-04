// @flow
import React, { useEffect } from "react"
import { Dimensions, Image, StyleSheet, Text, View } from "react-native"
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
    useDerivedValue,
} from "react-native-reanimated"

const { width } = Dimensions.get("window")
export const α = Math.PI / 12

interface CardProps {
    children: React.ReactChildren;
    translateX: Animated.SharedValue<number>;
    translateY: Animated.SharedValue<number>;
    onTop: boolean;
}

const SwipeableCard = ({
    translateX,
    translateY,
    onTop,
    children,
}: CardProps) => {
    const x = useDerivedValue(() => (translateX.value))

    const container = useAnimatedStyle(() => ({
        transform: [
            { translateX: onTop ? translateX.value : 0 },
            { translateY: onTop ? translateY.value : 0 },
            {
                scale: onTop ? 1 : interpolate(
                    x.value,
                    [-width / 2, 0, width / 2],
                    [1, 0.6, 1],
                    Extrapolate.CLAMP
                )
            },
            {
                rotate: onTop ? `${interpolate(
                    x.value,
                    [-width / 2, 0, width / 2],
                    [-α, 0, α],
                    Extrapolate.CLAMP
                )}rad` : '0rad',
            },
        ],
    }))

    return (
        <Animated.View style={[StyleSheet.absoluteFill, container]}>
            {children}
        </Animated.View>
    )
}

export default SwipeableCard
