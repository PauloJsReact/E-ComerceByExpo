import React,{useEffect, useState} from "react";
import {View, Text, Image,ActivityIndicator, TouchableOpacity,ScrollView} from 'react-native';
import { Entypo } from '@expo/vector-icons'; 
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Ionicons, EvilIcons } from '@expo/vector-icons';



import Estilos from "./Estilos";
import Api from  './Api';


export default function MeusProdutos({ route, navigation }) {
    const [usuario_id,setUsuarioId]=useState('');
    const [lista,setLista]= useState('');

useEffect(()=>{
    rescuperarId();
},[]);
async function rescuperarId() {
    let value = await AsyncStorage.getItem("id");
    if (value != undefined) {
        setUsuarioId(value);
        console.log('Id recuperado: ',JSON.parse(value));
        listarMeusProdutos(value)
    }
}

async function listarMeusProdutos(idUsuario) {
    const res = await axios.get(Api+'loja/listar/index.php?usuario_id='+idUsuario);
    setLista(res.data.result);
    console.log(res.data.result);
}

function addNovoProduto() {
    navigation.navigate("Produtos");
  }

    return(
        
        <View style={Estilos.container} >
            <TouchableOpacity
            onPress={addNovoProduto}
            style={Estilos.btnAddNovoProd}
            >
                <Entypo name="box" size={24} color="#ffff" />
                <Text style={Estilos.textoConfirBtnCadProd}>
                    Adicionar novo Produto
                </Text>
                <Entypo name="plus" size={24} color="#ffff" />
            </TouchableOpacity>

            <View style={Estilos.prodUsuario} >
                <ScrollView>
                {
                    lista !=0?
                    
                    lista.map(item =>(
                        <View  key={item.id}  style={Estilos.gridItem} >
                            <Image 
                            source={{uri:Api+'Images/'+item.image_path}}
                            style={{width:100,height:100}}
                            />   
                            <Text style={Estilos.textUsuarioProd} >{item.nome}</Text>
            <View style={Estilos.editarEdeletar} >
          <TouchableOpacity style={Estilos.separadorBtn}
           onPress={()=>{}} ><EvilIcons name="pencil" size={33} color="#55D968" /> 
          </TouchableOpacity>

          <TouchableOpacity   style={Estilos.separadorBtn}
          onPress={()=>{}}><Ionicons name="trash" size={33} color="#F52222" />
          </TouchableOpacity>
            </View>
                       </View>
                    )

                    ):

                    <View style={{alignItems:'center'}} >
                      <Text style={Estilos.produText} >Voce nao tem produtos disponiveis</Text>
                    </View>

                }
                </ScrollView>
            </View>
        </View>
    )
}