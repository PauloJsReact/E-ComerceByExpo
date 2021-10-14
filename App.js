
import React,{useState,useEffect} from 'react';
import { NavigationContainer } from "@react-navigation/native";
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';


import PaginasPilhas  from './src/Navegacao/StackNavigation';

function App (){
  const [expoPushToken, setExpoPushToken] = useState('');

useEffect(()=>{
  recuperarToken();
},[]);

async function recuperarToken() {
  let chave = await AsyncStorage.getItem("token");
    if(chave != undefined){
      console.log('Mostrar Token '+JSON.parse(chave));
    }else{
      criarTokenPush()
    }
}

async function criarToken(token) {
  let create = await AsyncStorage.setItem("token",JSON.stringify(token));
  return create;
}


  async function criarTokenPush() {
    if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          alert('Failed to get push token for push notification!');
          return;
        }
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
        setExpoPushToken(token);
        criarToken(token);
      } else {
        alert('Must use physical device for Push Notifications');
      }
    
      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
 
}

  return (
    <NavigationContainer>
     <PaginasPilhas />
    </NavigationContainer>
  );
}

export default App;