// TODO MAKE MORE PROPERTIES FOR THIS
// make pulse

import React from 'react'
import { ImageProps, StyleSheet, TouchableOpacity } from 'react-native'
import {
    Button as UIButton,
    ButtonProps as UIButtonProps,
    styled,
    Interaction,
    Text,
} from '@ui-kitten/components'
import { RenderProp, TouchableWeb } from '@ui-kitten/components/devsupport'

export type IconButtonProps = UIButtonProps & {
    icon: RenderProp<Partial<ImageProps>> | undefined;
    fill?: any;
    size?: string;
    iconSize?: string;
    noPadding?: boolean;
};

@styled('IconButton')
export class IconButton extends React.Component {
    private onMouseEnter = (event): void => {
        this.props.eva.dispatch([Interaction.HOVER])
        this.props.onMouseEnter && this.props.onMouseEnter(event)
    };

    private onMouseLeave = (event): void => {
        this.props.eva.dispatch([])
        this.props.onMouseLeave && this.props.onMouseLeave(event)
    };

    onPressIn = () => {
        // Dispatch an `active` state to High Order Component
        this.props.eva.dispatch([Interaction.ACTIVE])
    };

    onPressOut = () => {
        // Go back to the default state
        this.props.eva.dispatch([])
    };

    render() {
        const { eva, style, Icon, children, ...restProps } = this.props

        return (
            <TouchableWeb
                {...restProps}
                activeOpacity={1.0}
                style={[eva.style, style]}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
                onPressIn={this.onPressIn}
                onPressOut={this.onPressOut}
            >{Icon
                ? <Icon
                    style={{ height: eva.style.iconHeight, width: eva.style.iconWidth }}
                    fill={eva.style.iconTintColor}></Icon> : children}</TouchableWeb>
        )
    }
}
