import React,{useState,useEffect} from 'react';
import { Text, View,TouchableOpacity, Image,CheckBox,TextInput,Alert,ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Estilos from './Estilos';
import Api from './Api';
import axios from 'axios';


export default function Loguin({ navigation }) {
  const Logo = Api+'Images/LogoInicial.png';
  
  const [id,setId]=useState('0');
  const [nome,setNome]=useState('45');
  const [email,setEmai]=useState('');
  const [senha,setSenha]=useState('');
  const [meLembre,setmeLembre]=useState(false);
  const [carregando,setCarregando]=useState(false);

useEffect(()=>{
  recuperarEmail();
  recuperarId();
  recuperarNome();
},[]);

async function recuperarEmail() {
  let chave = await AsyncStorage.getItem("email");
  if(chave != undefined){
    setEmai(chave)
    console.log('Email econtrado --> '+chave);
    setmeLembre(true);
  }else{
    criarEmail();
  }
}

async function criarEmail() {
  let criar = await AsyncStorage.setItem("email",email);
  console.log('Nova chave foi criada '+email);
  return criar;
}

async function recuperarId() {
  let chave = await AsyncStorage.getItem("id");
  if (chave != undefined) {
    setId(chave);
    console.log('Chave recuperada id '+chave)
  }else{
    criarId(id);
  }
}

async function criarId(id){
  let criar = await AsyncStorage.setItem("id",id);
  console.log('id criado '+id)
  return criar;
}
async function recuperarNome() {
  let chave =await AsyncStorage.getItem("nome");
  if (chave != undefined) {
    setNome(chave);
    console.log('Nome encontrado '+chave);
  }else{
    criarNome(nome);
  }
}

async function criarNome(nome) {
  let criar= await AsyncStorage.setItem("nome",nome);
  console.log('nome criado '+nome);
  return criar;
}

function salvarEmail() {
  if (meLembre != false) {
    setmeLembre(false);
  }else{
    setmeLembre(true);
    console.log('Salvando email ...');
    criarEmail();
  }
 
}

async function executarLoguin() {
  setCarregando(true);
  const obj ={email,senha}
  //console.log(obj);
  const res = await axios.post(Api+'usuarios/loguin/index.php',obj);
  
if(res.data.success === 'Dados Incorretos!'){
  setCarregando(false);
  Mensagem();
}else{
    console.log('Loguin Correto busque ---> '+email);
    recuperarUsuario(email)
}
}

async function recuperarUsuario(email){
  const res = await axios.get(Api+'usuarios/buscarEmail/index.php?email='+email); 
  setId(res.data.id);
 // console.log('Usuario recuperado--->'+Api+'usuarios/buscarEmail/index.php?email='+email);
  console.log('--->Navegando '+res.data.nome+' para Usuario');
      setNome(res.data.nome);
      criarNome(res.data.nome);
      if (id != res.data.id) {
        console.log('id novo '+id+' & '+res.data.id);
        let apagar = 'tokemApagado'
        const result = await axios.post(Api+'pushNotfi/Insert/index.php?id='+id+'&new_token='+apagar);
        console.log(id+' ',result.data);
        recuperarToken(res.data.id);
      }else{
      navegarParaHome();
    }
}


async function recuperarToken(idData) {
  let chave = await AsyncStorage.getItem("token");
    if(chave != undefined){
      console.log('Mostrar Token '+JSON.parse(chave));
      let token = JSON.parse(chave);
      const result = await axios.post(Api+'pushNotfi/Insert/index.php?id='+idData+'&new_token='+token);
        console.log( idData+' ',result.data);
        criarId(idData);
        navegarParaHome();
    }
}



function Mensagem() {
  Alert.alert(
      "Erro ao logar",
      "Email ou senha incorreta",
      [
        { 
        text:"Tentar de novo",
        onPress: ()=> setSenha(''),
        style:"cancel"
        },
      ],
        {cancelable:false}
    )
}

function navegarParaHome() {
  setCarregando(false);
  navigation.navigate("NavegaçaoPorTab")
}
function navegarParaCadastro() {
  navigation.navigate("Cadastro")
}

  return (
    <View style={Estilos.container}>
      <Image 
      source={{uri:Logo}}
      style={Estilos.logotipo}
      />

  <Text>Digite seu Email e senha para entrar na conta</Text>

    <TextInput 
    placeholder="Email"
    keyboardType="email-address"
    value={email}
    onChangeText={(email)=>setEmai(email)}
    style={Estilos.impuText}
    />
 <TextInput 
    placeholder="Senha"
    secureTextEntry={true}
    value={senha}
    onChangeText={(Senha)=>setSenha(Senha)}
    style={Estilos.impuText}
    />
    
    <View style={Estilos.checkBoxEstilo} >
        <CheckBox
          value={meLembre}
          onValueChange={salvarEmail}
          /> 
          <Text>Me lembre</Text>
          <TouchableOpacity style={{marginLeft:9}} >
            <Text style={Estilos.btnRecuperarSenha} >Esqueci minha senha</Text>
          </TouchableOpacity>
    </View>

      <TouchableOpacity style={Estilos.botaoLoguin}
      onPress={executarLoguin}
      >
          <Text style={Estilos.botaoText} >logar</Text>
      </TouchableOpacity>
      <View>

        { carregando != false ?
          <ActivityIndicator   size='large' color="#AAF20F" />
          :
          <TouchableOpacity style={{margin:10}} 
          onPress={navegarParaCadastro}
          >
          <Text style={Estilos.btnCriarNovoUsuario} >Me cadastrar</Text>
          </TouchableOpacity>
      }
       
      </View>
    </View>
  );
}
