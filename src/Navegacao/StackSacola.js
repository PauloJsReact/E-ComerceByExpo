import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import Carrinho from '../Paginas/Carrinho';

const Stack = createNativeStackNavigator();


 function StackSacola ({navigation}){

    return(
        <Stack.Navigator initialRouteName="InitialPage" 
        screenOptions={{
          headerTintColor:   '#ffff',
          headerStyle:   {  backgroundColor:   '#66A638'  
        },
        }}
        >
           
              <Stack.Screen name="Carrinho" component={Carrinho}
              options ={{
                headerShown:true,
                title:'Minha Sacola',
              }}
            />
         </Stack.Navigator>
    )
}


export default StackSacola;