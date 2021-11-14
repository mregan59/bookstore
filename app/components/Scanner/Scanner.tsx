import React, { useEffect, useRef, useState } from 'react'
import { View, TouchableWithoutFeedback, FlatList, RefreshControl, Image, StyleSheet } from 'react-native'
import { Layout, Text, Button } from '@ui-kitten/components'
import { useStores } from '../../models'
import { dimensions } from '../../theme/variables'
import { observer } from 'mobx-react-lite'
import Reactotron from 'reactotron-react-native'
import { BarCodeScanner } from 'expo-barcode-scanner';



export const Scanner = observer(({ book }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
   const store = useStores()
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
 const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    console.log(data);
    console.log(type);
  //  alert(`Bar code with type ${type} and data ${data} has been scanned!`);
      store.bookList?.getBook(data)
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{height:dimensions.height, width: dimensions.width, padding: 40}}>
      {!scanned && <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />}
      {scanned && <Button onPress={() => setScanned(false)}>Tap to scan again</Button>}
    </View>
  );
})
