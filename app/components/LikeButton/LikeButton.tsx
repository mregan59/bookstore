import React, { useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'
import LottieView from 'lottie-react-native'
import { IconButton } from '../IconButton'
import { FlexBox } from '../FlexBox'

const sizes = {
    tiny: 80,
    small: 90,
    medium: 100,
    large: 120,
    giant: 140,
}

export const LikeButton = observer(({ liked, ...props }) => {
    const lottieRef = useRef(null)
    useEffect(() => {
        console.log('lottieRef')
        console.log(lottieRef)
        if (lottieRef && lottieRef.current && liked) {
            const totalFrames = lottieRef.current.anim.totalFrames
            lottieRef.current.play(totalFrames - 1, totalFrames)
        }
    }, [])
    const playAnimation = () => {
        lottieRef.current.reset()
        const totalFrames = lottieRef.current.anim.totalFrames
        lottieRef.current.play(0, totalFrames)
    }

    return (
        <IconButton {...props} style={{ position: 'relative' }} onPress={!liked && playAnimation} >
            <LottieView
                ref={lottieRef}
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50% , -50%)',
                    width: sizes[props.size],
                    height: sizes[props.size],
                    backgroundColor: 'transparent',
                }}
                source={require('./heart_like.json')}
            />
        </IconButton>
    )
})
