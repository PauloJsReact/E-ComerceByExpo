import React,{useState,useEffect} from 'react';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FontAwesome } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image,TouchableOpacity,Text } from 'react-native';
import Carrinho from '../Paginas/Carrinho';
import  Mapa from '../Paginas/Mapa'
import Usuario from '../Paginas/usuario';
import Mensagem from '../Paginas/Mensagem';
import MeusProdutos from '../Paginas/MeusProdutos';

import Api from '../Paginas/Api';
import Estilos from '../Paginas/Estilos';

const Drawer = createDrawerNavigator();

function AbaDelizante({ navigation }) {
  const [fotoUsuario,setFotoUsuario]=useState('userCicleTeste.png');
  const [nome,setNome]=useState('');
  const [load,setLoad] = useState(true)


  useEffect(()=>{
    recuperarNome();
     navigation.addListener('focus', ()=>setLoad(!load))
  },[load, navigation])
 


  async function recuperarNome() {
    let chave =await AsyncStorage.getItem("nome");
    if (chave != undefined) {
      setNome(chave);
      console.log('Nome encontrado ' + chave);
    }
  }
  

  return (
    <Drawer.Navigator  initialRouteName="Usuario"
    screenOptions={{
      headerTintColor:'#ffff',
      headerStyle:{
        backgroundColor:'#66A638'
      },
    }}
    >
      <Drawer.Screen name="Usuario" component={Usuario}
        options={{
          title:nome,
          drawerIcon:()=>(
            <TouchableOpacity 
            style={Estilos.usuariMinicirculoDrawer}
            onPress={()=>{}}
              >
                <Text style={Estilos.perfilMinefontDrawer} >{nome.charAt(0).toUpperCase()}</Text>
    
              </TouchableOpacity> 
          )
        }}
      />
  
      <Drawer.Screen name="Carrinho" component={Carrinho}
      options={{
        title:'Minha sacola',
        drawerIcon:()=>(
          <FontAwesome5 name="shopping-bag" size={24} color="#66A638" />
        )
      }}
      />

      <Drawer.Screen name="Mensagem" component={Mensagem}
      options={{
        title:'Minhas mensagens',
        drawerIcon:()=>(
          <Entypo name="mail" size={24} color="#66A638" />
        )
      }}
      
      />

      <Drawer.Screen name="Mapa" component={Mapa}
      options={{
        title:'Meu Local',
        drawerIcon:()=>(
          <FontAwesome name="map" size={24} color="#66A638" />
        )
      }}
      />

      <Drawer.Screen name="MeusProdutos" component={MeusProdutos}
     options={{
       title:'Venda seus produtos',
       drawerIcon:()=>(
      <MaterialIcons name="point-of-sale" size={24} color="#66A638" />
       )
     }}
      />
    </Drawer.Navigator>
  
  );
} 


export default AbaDelizante;