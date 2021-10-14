import React,{useEffect,useState} from 'react';
import {View, Text,TextInput, Image,ActivityIndicator,Alert} from 'react-native';

import Estilos from './Estilos';
import Api from './Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


export default function Comprar({ route, navigation }) {
    const [id,setId]=useState('');
    const [nome,setNome]=useState('');
    const [quantidade,setQuantidade]=useState('');
    const [preco,setPreco]=useState('');
    const [usuario_id,setUsuario_id]=useState('')
    const [image_path,image_pathSet]=useState('');
    const [descricao,setDescricao]=useState('');
    const [salvarQuantidade,setsalvarQuantidade]=useState('');
    const [local,setLocal]=useState('Cinturao Verde, Cuiaba');

    const idProdutoRota = route.params?.idProduto;

    useEffect(()=>{
        listarBusca();
    },[]);
  
async function apagarCarrinho() {
    const res =await AsyncStorage.setItem("carrinho",JSON.stringify(42));
    console.log('Chave apagada');
    return res;
}

async function listarBusca(){
    const res = await axios.get(Api+'loja/buing/index.php?id='+idProdutoRota);
    setPreco(res.data.preco);
    setNome(res.data.nome);
    setQuantidade(res.data.quantidade);
    setsalvarQuantidade(res.data.quantidade);
    setId(res.data.id);
    setUsuario_id(res.data.usuario_id);
    image_pathSet(res.data.image_path);
    setDescricao(res.data.descricao);
    console.log(res.data);    
}

async function  recuperarCarrinho() {
    let chave = await AsyncStorage.getItem('carrinho');
    if (chave != undefined) {
        if (JSON.parse(chave) != 42) {
            const obj ={id,nome,preco,quantidade,usuario_id,image_path}
            const carrinho = {"carrinho":JSON.parse(chave)};
            carrinho['carrinho'].push(obj);
            console.log("Carrinho Criado -->",carrinho['carrinho']);
            const estr = JSON.stringify(carrinho['carrinho']);
            const res =await AsyncStorage.setItem("carrinho",estr);
            console.log(res);
            printCart()
        }else{
            Comprar();
            printCart();
        }
    }else{
        Comprar();
        printCart();
    }
}


function Comprar() {
        const obj = {id,nome,preco,quantidade,usuario_id,image_path}
        const carrinho = [];
        carrinho.push(obj);
        createCart(carrinho)
}
async function createCart(carrinho) {
    const res = await AsyncStorage.setItem("carrinho",JSON.stringify(carrinho));
    return res;
}

async function printCart(){
    let result = await AsyncStorage.getItem("carrinho");
    console.log('Carrinho recuperado --->',result);
    navigation.navigate('Home');
}


function Mensagem() {
    Alert.alert(
        "Finalizar Compra",
        "Deseja comprar esse produto ?",
        [
          { 
          text:"Nao",
          onPress: ()=> console.log("Cancel Pressede"),
          style:"cancel"
          },
            {text:"Sim",onPress:()=>recuperarCarrinho()}
        ],
          {cancelable:true}
      )
}

    return(
        <View style={{backgroundColor:'#ffff'}} >
          { nome !='' ?
          <View>
          <Image
            source={{uri:Api+'Images/'+image_path}}
            style={
                {
                    width:'100%',
                    height:330
                }
            }
            />
       <View style={Estilos.detalheBar} >
           <Text style={Estilos.tituloProduto} >{nome}</Text>
           <Text style={Estilos.mostrarPreco} >R$ {preco.replace('.',',')}</Text>
       </View>
        <View style={Estilos.detalheBar} >
        <Ionicons name="location" size={30} color="#66A638" />
        <Text style={Estilos.localTexto} >{local}</Text>
        </View>
        <View style={Estilos.detalheBar} >
        <Text style={Estilos.localTexto} >Descriçao: {descricao}</Text>
        </View>
        <View style={Estilos.definirQuantidade} >
        <TouchableOpacity>
        <AntDesign name="minuscircle" size={24} color="#66A638" />
        </TouchableOpacity>
       <TextInput
       value={quantidade}
        onChangeText={(quantidade)=>setQuantidade(quantidade)}
        style={Estilos.quantidadeBox}
        keyboardType="number-pad"
       />
        <TouchableOpacity>
        <AntDesign name="pluscircle" size={24} color="#66A638" />
        </TouchableOpacity>
        </View>
        <View style={{alignItems:'center',marginBottom:10}} >
            <TouchableOpacity style={Estilos.botaoLoguin} 
            onPress={Mensagem}
            >
                <Text style={Estilos.botaoText} >Comprar Produto</Text>
            </TouchableOpacity>
        </View>
        </View>
        :<View style={Estilos.indicador}>
        <ActivityIndicator   size='large' color="#66A638" />
        </View>
        }

        </View>
    )
}