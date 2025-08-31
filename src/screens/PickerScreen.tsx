import React from 'react';
import { View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

export default function PickerScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'Picker'>) {
  React.useEffect(() => {
    (async () => {
      const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 1 });
      if (!result.canceled && result.assets?.length) {
        navigation.replace('Crop', { uri: result.assets[0].uri });
      } else {
        navigation.goBack();
      }
    })();
  }, [navigation]);

  return <View style={styles.container} />;
}

const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#fff' } });
