import React,{useEffect,useState} from 'react';
import { ScrollView, Text,View,Image, TouchableOpacity,Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';


import Estilos from './Estilos';
import Api from './Api'
export default function Carrinho({ navigation }) {


  const [idUsuario,setIdUsuario] = useState('');
  const [cart,setCart]=useState('');
  const [contador,setContador]=useState(0);
  const [load,setLoad] = useState(true)


  useEffect(()=>{
     restaurarId();
     recuperarCarrinho();
     navigation.addListener('focus', ()=>setLoad(!load))
  },[load, navigation])
 

  useEffect(()=>{
    salvarCarrinho();
  },[cart]);
  
  async function restaurarId() {
      const value = await AsyncStorage.getItem("id");
      if (value != undefined) {
          setIdUsuario(value)
          console.log("id atulizado ",value)
      }
  }

  function Contar(convertTojson) {
     var contar =  Object.keys(convertTojson).length
     setContador(contar);
     console.log('valor total '+contar)
  }

  
  async function recuperarCarrinho() {
      let value = await AsyncStorage.getItem("carrinho");
      if (value != undefined) {
          let convertTojson = JSON.parse(value);
          setCart(convertTojson);
          console.log(convertTojson);
          Contar(convertTojson);
      }
  }

  async function resetCart() {
      let remove =await AsyncStorage.removeItem("carrinho");
      setCart('');
      console.log('carrinho esvaziado ')
     return remove;
  }


function list() {
  cart.map((item)=>{
      if (item.id != '') {
          console.log( 'usuario recuperado :'+item.usuario_id);
          const mensagem = item.nome +' quantidade: '+item.quantidade
          procuraRtoken(item.usuario_id,mensagem);
      }
  });
  }

async function procuraRtoken(usuariId,mensagem) {
  var res = await axios.get(Api+'pushNotfi/toLocate/index.php?id='+usuariId);
  var chave = res.data
  let result =chave[0].token
  console.log( usuario_id+' token :',result);
  const usuario_id = usuariId; 
  enviarMensagen(result,mensagem,usuario_id)
  console.log("Compra finalizada");
  limparCarrinho();
}

function  limparCarrinho(){
  var carrinhoQuanti =  Object.keys(cart).length
  if (parseInt(carrinhoQuanti) === parseInt(contador) ) {
      console.log('o carrinho foi esvaziado');
      setCart('');
  }else{
      console.log('Aguardado para deletar')
  }
}


function FinalizarCompra() {
  Alert.alert(
      "Finalizar Compra",
      "Deseja finalizar a compra?",
      [
        { 
        text:"Nao",
        onPress: ()=> console.log("Cancel Pressede"),
        style:"cancel"
        },
          {text:"Sim",onPress:()=>list()}
      ],
        {cancelable:true}
    )
}

function limparCarrinhoMensagem() {
  Alert.alert(
      "Lipar Sacola",
      "Deseja limpar A sacola",
      [
        { 
        text:"Nao",
        onPress: ()=> console.log("Cancel Pressede"),
        style:"cancel"
        },
          {text:"Sim",onPress:()=>resetCart()}
      ],
        {cancelable:true}
    )
}


function deleItem(idData) {
  const carrinho = {"cart":[]}
  cart.map((value)=>{
if (value.id != idData) {
    let nome = value.nome
    let id =value.id
    let image_path= value.image_path
    let quantidade =value.quantidade
    let usuario_id =value.usuario_id
    let preco = value.preco
       const obj = {id,nome,image_path,quantidade,usuario_id,preco}
       console.log('Array inserida --> :',obj);
       carrinho["cart"].push(obj);
}
console.log(carrinho['cart']);
setCart(carrinho["cart"]);
salvarCarrinho(carrinho["cart"]);
})
}

async function enviarMensagen(tokenData,mensagemData,usuario_id) {

  var titulo = 'Uma venda feita'
  var mensagem = mensagemData
  var token = tokenData
  const  obj = {titulo,mensagem,token}
      console.log(obj);
      const res = await axios.post(Api+'pushNotfi/Message/index.php',obj)
      console.log(res.data);
      let comprador = await AsyncStorage.getItem("id");

       const corpoMsn = {
      titulo,
      mensagem,
      'usuario_id':usuario_id,
      'comprador_id':comprador,
      'localLatitude':'',
      'localLongitude':''
      }
      salvarMensagem(corpoMsn);
}

async function salvarMensagem(corpoMsn) {
  console.log('ver mensagem',corpoMsn);
  const res = await axios.post(Api+'pushNotfi/salvarMensagem/index.php',corpoMsn);
  console.log(res.data);
}

async function salvarCarrinho(carrinhoDados) { 
  const recuperar = JSON.stringify(carrinhoDados);
  const res = await AsyncStorage.setItem("carrinho",recuperar);
  console.log(res);
}

return(
  <View style={Estilos.container} >
 

<View  style={{height:400,width:'100%'}} >
      <ScrollView>

          {cart !=0 ? cart.map((item)=>(

<View style={Estilos.lista} key={item.id}>
<Image
source={{uri:Api+'Images/'+item.image_path}}
style={Estilos.imageLista}
/>


<View style={Estilos.boxTxt} >
<Text style={Estilos.tituloItem} >{item.nome}</Text>
<Text style={Estilos.textoTotal} >Quantidade :{item.quantidade} </Text>
<Text style={Estilos.textoTotal} >Total : 
 R$<Text style={Estilos.valorText}>
      {(parseInt(item.quantidade)*item.preco+'0').replace('.',',')} 
      </Text>    
</Text>
</View>
<TouchableOpacity
style={Estilos.btDell}
onPress={()=>deleItem(item.id)}
>
   <AntDesign  name="delete" size={24} color="black" />
</TouchableOpacity>

</View>
        )) :<Text></Text> }
      </ScrollView >

      </View>

      {cart !=''?
   <View style={{
    alignItems:'center',
    top:500,
    marginTop:'10%',
    position:'absolute',
    left:'25%'
      }}> 
      <TouchableOpacity
      style={Estilos.btnPurcase}
      onPress={FinalizarCompra}
      >
          <Text style={{color:'#FFFF'}}>Finalizar Compra</Text>
      </TouchableOpacity>
      </View> 
      : 
      <View style={Estilos.container} > 
      <Text>Sua sacola esta vazia</Text>
      </View>
      } 
  </View>
)
}
