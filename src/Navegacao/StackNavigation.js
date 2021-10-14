import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import InitialPage from '../Paginas/InitialPage';
import Loguin from '../Paginas/Loguin';
import Comprar from '../Paginas/Comprar';
import Produtos from '../Paginas/Produtos';
import Mensagem from '../Paginas/Mensagem';
import StackSacola from './StackSacola';
import NavegaçaoPorTab from './BotonTabNavigation';
import Cadastro from '../Paginas/Cadastro';

const Stack = createNativeStackNavigator();


 function PaginasPilhas ({navigation}){

    return(
        <Stack.Navigator initialRouteName="InitialPage" 
        screenOptions={{
          headerTintColor:   '#ffff',
          headerStyle:   {  backgroundColor:   '#66A638'  
        },
        }}
        >
            <Stack.Screen  name="InitialPage" component={InitialPage} 
              options={{headerShown:false}}
            />
            <Stack.Screen  name="Loguin" component={Loguin}
              options={{headerShown:false}}
               />
            <Stack.Screen  name="NavegaçaoPorTab" component={NavegaçaoPorTab}
              options={{headerShown:false}}
            />
            <Stack.Screen name="Comprar" component={Comprar}
              options ={{
                title:'Comprar produto',
              }}
            />
             <Stack.Screen name="Produtos" component={Produtos}
              options ={{
                title:'Adicionar novo Produto',
              }}
            />
               <Stack.Screen name="Mensagem" component={Mensagem}
              options ={{
                title:'Minhas mensagens',
              }}
            />
              <Stack.Screen name="StackSacola" component={StackSacola}
              options ={{
                title:'Minha Sacola',
              }}
            />
            <Stack.Screen name="Cadastro"  component={Cadastro}
            options={{
              title:'Criar Sua Conta'
            }}
            />
          </Stack.Navigator>
    )
}


export default PaginasPilhas;