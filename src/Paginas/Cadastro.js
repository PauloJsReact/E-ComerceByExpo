import React, { useEffect, useState } from 'react';
import {View,Text, TextInput, TouchableOpacity, Alert} from 'react-native'
import { Ionicons,Entypo,Feather,MaterialCommunityIcons} from '@expo/vector-icons';
import axios from 'axios';
import Estilos from './Estilos';

import Api from './Api';


export default function Cadastro({ navigation }) {
    const [nome,setNome]=useState('');
    const [email,setEmail]=useState('');
    const [senha,setSenha]=useState('');
    const [comparar,setComparar]=useState(false);

    useEffect(()=>{

    },[]);

function compararSenha(confirmar) {
  //  console.log(confirmar);
    if(senha != confirmar){
        setComparar(true);
    }else{
        setComparar(false)
    }
}


async function EnviarEmail() {
    const obj = {email,senha,nome}
    const res =await axios.post(Api+'email/',obj);
    console.log('Resultado ',res.data.success);
}

function Mensagem(resultado) {

if (resultado !=true) {
    Alert.alert(
        "Erro ao Cadastrar",
        "Email ja cadastrado",[
            {
                text:"Mudar Email",
                style:"cancel",
                onPress:()=>setEmail('')
            },
        ],
        {cancelable:true}
  )
}else{
    EnviarEmail();
    Alert.alert(
        "Cadastro",
        "cadastro efetuado Com Sucesso",
        [
            {
                text:"ok",
                onPress:()=>{},
                style:"cancel"
            }
        ],
        {cancelable:true}
    )
}
  
}

async function Cadastrar() {
    const obj = {email,senha,nome}
    const res = await axios.post(Api+'usuarios/add/index.php',obj);
    console.log(res.data.success);
    Mensagem(res.data.success);
}
    return(
        <View style={Estilos.container} >
 <Text style={Estilos.TituloCadatroProd} >
 Criar Sua Conta
 </Text>

 <View  style={Estilos.imputTextCad} >
 <Ionicons name="person-add-outline" size={24} color="#66A638" />
 <TextInput
 placeholder="Digite seu Nome"
 value={nome}
 onChangeText={(nome)=>setNome(nome)}
 />
</View>

<View  style={Estilos.imputTextCad}   >
<Entypo name="email" size={24} color="#66A638" />
 <TextInput
 placeholder="Digite seu Email"
 value={email}
 onChangeText={(email)=>setEmail(email)}
 />
</View>

<View  style={Estilos.imputTextCad} >
<Ionicons name="lock-open-outline" size={24} color="#66A638"  />
<TextInput
placeholder="Digite sua Senha"
secureTextEntry={true}
value={senha}
onChangeText={(senha)=>setSenha(senha)}
/>
</View>

<View style={Estilos.imputTextCad} >
<Ionicons name="ios-lock-closed-outline" size={24} color="#66A638"  />
<TextInput
placeholder="Confirme sua Senha"
secureTextEntry={true}
onChangeText={(data)=>compararSenha(data)}
/>
</View>
{
    comparar != false ?
    <Text style={Estilos.CompararSenha} >Confirmar Senha</Text>
    :
    <Text></Text>
}

<TouchableOpacity
style={Estilos.btnAddNovoProd}
onPress={Cadastrar}
>
    <Text style={Estilos.textoConfirBtnCadProd} >
        Cadastrar
    </Text>
</TouchableOpacity>
        </View>
    )
}