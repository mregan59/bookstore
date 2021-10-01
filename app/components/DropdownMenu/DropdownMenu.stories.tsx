import React from 'react'
import { storiesOf } from '@storybook/react-native'

import { DropdownMenu } from './DropdownMenu'

storiesOf('DropdownMenu', module).add('example', () => <DropdownMenu />).add('default', () => <DropdownMenu />)
