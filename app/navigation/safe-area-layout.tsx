import React from 'react';
import { StyleProp, ViewStyle, Platform, Dimensions } from 'react-native';
import { EdgeInsets, useSafeArea } from 'react-native-safe-area-context';
import { Layout, LayoutElement, LayoutProps } from '@ui-kitten/components';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export enum SaveAreaInset {
    TOP = 'top',
    BOTTOM = 'bottom',
    TABS = 'tabs',
}

const { height, width } = Dimensions.get('window');

type InsetsProp = SaveAreaInset | SaveAreaInset[];

interface SafeAreaLayoutProps extends LayoutProps {
    insets?: InsetsProp;
}

export type SafeAreaLayoutElement = React.ReactElement<SafeAreaLayoutProps>;

export const SafeAreaLayout = (props: SafeAreaLayoutProps): LayoutElement => {
    const safeAreaInsets: EdgeInsets = useSafeArea();

    const { insets, style, ...layoutProps } = props;

    const createInsets = () => {
        // @ts-ignore
        let style = { paddingBottom: 0, paddingTop: 0 };
        console.log(insets);
        React.Children.forEach(insets, inset => {
            switch (inset) {
                case SaveAreaInset.BOTTOM:
                    style = { ...style, paddingBottom: style.paddingBottom + safeAreaInsets.bottom }
                    return;
                case SaveAreaInset.TOP:
                    // const paddingTop =
                    //     Platform.OS === 'android'
                    //         ? getStatusBarHeight()
                    //         : safeAreaInsets.top;
                    style = { ...style, paddingTop: safeAreaInsets.top }
                    return
                case SaveAreaInset.TABS:
                    style = { ...style, paddingBottom: style.paddingBottom + 78 }
                    return

            }
        });
        return style;
        //return React.Children.map(insets, toStyleProp);
    };

    return (
        <Layout
            level="3"
            {...layoutProps}
            style={[
                style,
                createInsets(),
                {}, //if set this to windowHeight checkout won't show
            ]}
        />
    );
};
