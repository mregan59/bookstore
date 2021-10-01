import { Dimensions, Platform } from 'react-native'
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context'
var { height, width } = Dimensions.get(Platform.OS == 'ios' ? 'screen' : 'window')
export const spacing = (num: number) => {
  return num * 8
}

export const variables = {
  sideMargin: spacing(2),
  cardMargin: spacing(2),
  borderRadius1: 4,
  borderRadius2: 8,
  borderRadius3: 16,
  borderRadius4: 24,
  borderRadiusRound: 50,
}
export const getDeviceHeight = () => {
  const safeAreaInsets: EdgeInsets = useSafeAreaInsets()
  const paddingTop = Platform.OS === 'ios' ? 46 : 36
  const paddingBottom = Platform.OS === 'ios' ? safeAreaInsets.bottom : 0
  return height - paddingTop - paddingBottom
}
const top = Platform.OS === 'ios' ? 46 : 0
export const dimensions = {
  innerWidth: width - variables.sideMargin * 2,
  fullWidth: width, //Math.min(width, 768),
  height: height,
  safeAreaHeight: height - 36,
  maxWidth: 1400,
  maxProfileWidth: 500,
}
export const getBreakpoint = () => {
  const breakpoints = [600, 900]
  if (width > breakpoints[0] && width > breakpoints[1]) {
    return 'large'
  } else if (width > breakpoints[0] && width < breakpoints[1]) {
    return 'medium'
  } else {
    return 'small'
  }
}
