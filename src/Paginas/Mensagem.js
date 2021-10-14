import AsyncStorage from '@react-native-async-storage/async-storage';
import React,{useEffect, useState} from 'react';
import { ScrollView, Text, View,CheckBox, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { SimpleLineIcons } from '@expo/vector-icons';
import { MaterialIcons,Entypo  } from '@expo/vector-icons';

import Api from './Api';
import Estilos from './Estilos';


export default function Mensagem({ navigation }) {
    const [usuario_id,setUsuarioId]=useState('');
    const [lista,setLista]=useState('');
    const [check,setCheck]=useState(false);

    useEffect(()=>{
        recuperarId();
    },[]);
    async function recuperarId() {
        let value = await AsyncStorage.getItem("id");
        if (value != undefined ) {
            setUsuarioId(value);
            console.log('Id mensagem ',JSON.parse(value));
            recuperarMsn(value);
        }
    }

    async function recuperarMsn(idUsuario) {
        const res  = await axios.post(Api+'pushNotfi/listMensagem/index.php?id='+idUsuario);
        let value =res.data.result;
        if (value != 0) {
            setLista(value);
            checkList()
        }else{
            setLista('')
        }
      
      }

    function checkList() {
        if(lista != '' ){
        lista.map((item)=>{
            item.checar = false;
        })
        console.log('Mensagems',lista)
    }}

    return(
        <View style={Estilos.mensagems} >
        <View style={Estilos.barMensagem} >
        <CheckBox
                    value={check}
                    onValueChange={()=>{}}
                    /> 
                    <Text>Todas mensagems</Text>
                    <View  style={{left:'60%',position:'absolute',flexDirection:'row'}}>
                    <TouchableOpacity
                    style={Estilos.barBtnMsn}
                    >
                   <Entypo name="flag" size={24} color="#158C03" />
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={Estilos.barBtnMsn}
                    >
                    <MaterialIcons name="delete" size={24} color="#158C03" />
                    </TouchableOpacity>
                    </View>
        </View>
        <ScrollView>
            { lista !='' ?

            lista.map(item=>(
                <TouchableOpacity  key={item.id} style={Estilos.mensagem} >
                <CheckBox
                    value={item.checar}
                    onValueChange={()=>{}}
                    /> 
                <SimpleLineIcons name="options-vertical" size={30} color="#158C03" />
                <View  >
                <Text style={Estilos.tituloMensagem} >{item.titulo}</Text>
                <Text>{item.mensagem}</Text>
                </View>
                </TouchableOpacity>
            ))
           
            :
            <View style={{alignItems:'center',margin:10}} >
            <Text style={Estilos.btnRecuperarSenha} >
                Voce nao tem nenhuma Mensagem
            </Text>
            </View>

            }
        </ScrollView>

        </View>
    )
}