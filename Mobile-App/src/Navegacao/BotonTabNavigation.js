import React from 'react'
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs'
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';

const Tabs = createMaterialBottomTabNavigator();

import Home from '../Paginas/Home';
import Carrinho from '../Paginas/Carrinho';
import AbaDelizante from './DrawerNavigation';


export default function NavegaçaoPorTab() {
    return(
        <Tabs.Navigator
        inactiveColor="#ffff"
        activeColor="#f0edf6"
        barStyle={{
            backgroundColor:'#66A638'
        }}
        >
            <Tabs.Screen name="Home" component={Home}
              options={{
                  headerShown:false,
                  tabBarLabel:'Pagina Inicial',
                    tabBarIcon:()=>(
                        <Entypo name="home" size={24} color="#ffff" />
                    )
            }}
            />
            <Tabs.Screen name="Carrinho" component={Carrinho}
            options={{
                tabBarLabel:'Sacola',
                tabBarIcon:()=>(
                    <FontAwesome5 name="shopping-bag" size={24} color="#ffff" />
                )
            }}
            />
            <Tabs.Screen name="AbaDelizante" component={AbaDelizante}
            options={
           {title:'Usuario',
           headerShown:false,
           tabBarIcon:()=>(
            <FontAwesome name="user" size={24} color="#ffff" />
           )
        }
            }
            
            />
        </Tabs.Navigator>
    )
}