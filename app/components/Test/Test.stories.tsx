import React from 'react'
import { storiesOf } from '@storybook/react-native'

import Test from './Test.component'

storiesOf('Test', module).add('example', () => <Test />).add('default', () => <Test />)
