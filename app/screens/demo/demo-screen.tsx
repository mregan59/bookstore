import React from "react"
import { Image, ImageStyle, Platform, TextStyle, View, ViewStyle } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Api } from "../../services/api"
import { save } from "../../utils/storage"

export const DemoScreen = observer(function DemoScreen() {
    const navigation = useNavigation()
    const goBack = () => navigation.goBack()

    const demoReactotron = React.useMemo(
        () => async () => {
            console.tron.log("Your Friendly tron log message")
            console.tron.logImportant("I am important")
            console.tron.display({
                name: "DISPLAY",
                value: {
                    numbers: 1,
                    strings: "strings",
                    booleans: true,
                    arrays: [1, 2, 3],
                    objects: {
                        deeper: {
                            deeper: {
                                yay: "👾",
                            },
                        },
                    },
                    functionNames: function hello() {
                        /* dummy function */
                    },
                },
                preview: "More control with display()",
                important: true,
                image: {
                    uri:
                        "https://avatars2.githubusercontent.com/u/3902527?s=200&u=a0d16b13ed719f35d95ca0f4440f5d07c32c349a&v=4",
                },
            })
            // make an API call for the demo
            // Don't do API like this, use store's API
            const demo = new Api()
            demo.setup()
            demo.getUser("1")
            // Let's do some async storage stuff
            await save("Cool Name", "Boaty McBoatface")
        },
        [],
    )

    return (
        <View testID="DemoScreen" >

        </View>
    )
})
