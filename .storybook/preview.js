import React, {useEffect, useState} from 'react';
import * as eva from '@eva-design/eva'
import { Platform } from 'react-native'
import { ApplicationProvider, IconRegistry, Layout } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { default as mapping } from '../app/theme/custom-mapping.json'
import { default as android } from '../app/theme/android-custom-mappings.json'
import {isEmpty} from 'lodash'

import { RootStoreProvider, setupRootStore, useStores } from '../app/store'

export const decorators = [
  (Story) => {
    const androidMapping = { ...mapping, strict: { ...mapping.strict, ...android.fontWeights } }
    const customMapping = Platform.OS === 'android' ? androidMapping : mapping

    const [rootStore, setRootStore] = useState(undefined)

    // Kick off initial async loading actions, like loading fonts and RootStore
    useEffect(() => {
      const method = async () => {
         //await initFonts() // expo
         setupRootStore().then((store) => {
            if (isEmpty(store.profileList?.queries)) {
                store.profileList.createQuery('search', 2)
                store.profileList.createQuery('birthdays', 3)
            }
            setRootStore(store)
        })
      }
      method()
    }, [])

    if (!rootStore) {
      return null
    }
    return (
        <RootStoreProvider value={rootStore}>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider customMapping={customMapping} {...eva} theme={eva.dark}>
                <Layout style={{padding: 20}}>
                    <Story />
                </Layout>
            </ApplicationProvider>
        </RootStoreProvider>
      )
  }
];