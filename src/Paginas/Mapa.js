import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

import Estilos from './Estilos';

export default function Mapa({ navigation }) {
  return (
    <View style={Estilos.container}>
      <Text>AquI mostra Meu local</Text>
      <StatusBar style="auto" />
    </View>
  );
}
