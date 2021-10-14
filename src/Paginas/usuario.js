import React, { useEffect, useState } from 'react'
import { View ,Text, Image, TouchableOpacity} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { Entypo } from '@expo/vector-icons';
import Api from './Api'
import Estilos from './Estilos'


export default function Usuario({navigation}) {
    const [nome,setNome]=useState('');
    const [id,setId]=useState('');
    const [email,setEmail]=useState('');
    const [fotoUsuario,setFotoUsuario]=useState('userCicleTeste.png');

  useEffect(()=>{
    recuperarId();
    recuperarNome();
  },[]);


  useEffect(()=>{
    recuperarUsuario();
  },[id])

    async function recuperarId() {
        let value = await AsyncStorage.getItem("id");
        if (value != undefined) {
            setId(value);
            console.log('Id encontrado: ',JSON.parse(value));
        }
    }

    async function recuperarNome() {
        let value = await AsyncStorage.getItem("nome");
        if (value != undefined ) {
            setNome(value);
            console.log('Nome Encontrado ',value);
        }
    }

    async function recuperarUsuario() {
        console.log(Api+'usuarios/recuperarUsuario/index.php?id='+id);
        const res = await axios.get(Api+'usuarios/recuperarUsuario/index.php?id='+id);
        setNome(res.data.nome);
        setEmail(res.data.email);
        console.log('Mostrar',res.data);

    }

    return(
        <View style={Estilos.menuUsuario} >
        <View style={Estilos.usuarioImfo} >
        <View style={Estilos.perfilCirculo} >
        <Text style={Estilos.perfilFont} >{nome.charAt(0).toUpperCase()}</Text>
        </View>

        <View style={Estilos.editarIfo} >
        <Text style={Estilos.fontInfoEstilo} >{nome}</Text>
        <TouchableOpacity
        style={Estilos.btnEdInfo}
        >
        <Entypo name="pencil" size={24} color="#66A638" />
        </TouchableOpacity>
        </View>

        <View style={Estilos.editarIfo} >
        <Text style={Estilos.fontInfoEstilo} >{email}</Text>
        <TouchableOpacity
        style={Estilos.btnEdInfo}
        >
        <Entypo name="pencil" size={24} color="#66A638" />
        </TouchableOpacity>
        </View>
        </View>
        </View>
    )
}