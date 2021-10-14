import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';


import Estilos from './Estilos'
import Api from './Api'; 

export default function InitialPage({ navigation }) {
  const Logo =Api+'Images/LogoInicial.png'
  return (
    <View style={Estilos.container}>
      <Image
      source={{uri:Logo}}
      style={Estilos.logotipo}
      />
      <TouchableOpacity style={Estilos.botaoLoguin}
      onPress={()=>navigation.navigate("Loguin")}
      >
          <Text style={Estilos.botaoText} >Vamos Iniciar</Text>
      </TouchableOpacity>
    </View>
  );
}
