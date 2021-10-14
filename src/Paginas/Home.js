import React,{useEffect,useState} from 'react';
import axios from 'axios'; // npm axios
import { Text, TouchableOpacity, View,Image,ActivityIndicator,ScrollView,TextInput } from 'react-native';
import { Feather,Ionicons  } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';


import Estilos from './Estilos';
import Api from './Api'
export default function Home({ navigation }) {
  const [lista,setLista]=useState([]);
  const [nome,setNome]=useState('')
  const [userImage,setUserImage]=useState('userCicleTeste.png');
  const [load,setLoad] = useState(true);
  const [usuario_id,setUsuarioId]= useState('');
  const [msnQuant,setMsnQuant]=useState('');


  useEffect(()=>{
    listarBusca();
    recuperarNome();
    recuperarId();
     navigation.addListener('focus', ()=>setLoad(!load))
  },[load, navigation])
 


  async function listarBusca(){
    const res = await axios.get(Api+'loja/home');
    setLista(res.data.result);
    console.log(res.data.result);
}
async function recuperarId() {
  let value = await AsyncStorage.getItem("id");
  if (value != undefined) {
    setUsuarioId(value);
    recuperarMsn(value);
    console.log('Id encontrado ',value);
  }
}
async function recuperarMsn(idUsuario) {
  const res  = await axios.post(Api+'pushNotfi/listMensagem/index.php?id='+idUsuario);
  if(res.data.result != 0){
  setMsnQuant(res.data.result.length);
  console.log('Quantidade de mensagems : ',res.data.result.length );
}else{
  setMsnQuant('');
}
}

async function recuperarNome() {
  let chave =await AsyncStorage.getItem("nome");
  if (chave != undefined) {
    setNome(chave);
    console.log('Nome encontrado ' + chave);
  }
}

function comprarProduto(idData) {
  navigation.navigate('Comprar',{idProduto:idData})
}
function paraMensagems() {
  navigation.navigate('Mensagem')
}
  return (
    <View style={Estilos.Lojacontainer}>
      
        <View style={Estilos.headerPersonalizado} >
        <TouchableOpacity 
        style={Estilos.usuariMinicirculo}
          onPress={()=>{}}
          >
            <Text style={Estilos.perfilMinefont} >{nome.charAt(0).toUpperCase()}</Text>

          </TouchableOpacity> 
        <Text style={Estilos.nomeTitulo} >{nome}</Text>
        <TouchableOpacity
        style={Estilos.sinoEstilo}
        onPress={paraMensagems}
        >
        <Ionicons name="notifications" size={40} color="#ffff" />
        {msnQuant != ''? 
       <View style={Estilos.notifica} >
       <Text style={{color:'#ffff',fontWeight:'bold'}}>
        {msnQuant}
       </Text>
       </View>
      :
      <Text></Text>
      }
         
        </TouchableOpacity>
        </View>


<View style={Estilos.caixaTextBusca}>
<TextInput placeholder='   Buscar'style={{width:'90%'}} />
<Feather name="search" size={24} color="#5AA637" />
</View>

      <TouchableOpacity style={Estilos.btnPromocoes} >
       <Image  
      source={{uri:Api+'promocoes/card_promo.jpg'}}
      style={{width:'100%',height:160, borderRadius:9}}
      />
      </TouchableOpacity>
     
<View style={{height:250}} >

<ScrollView  horizontal={true}   >

{lista != 0 ?
             lista.map(item=>(
         <TouchableOpacity key={item.id}
         style={Estilos.listaProdutos}
         onPress={()=>comprarProduto(item.id)}
         >
               <Image source={{uri: Api+'Images/'+item.image_path}}
                style={Estilos.imageProdutos} />
            
               <Text style={{fontWeight:'bold',fontSize:16}}>{item.nome}</Text>
               <Text style={Estilos.precoProdutos}>R$ {item.preco.replace('.',',')}</Text>
         </TouchableOpacity>
         
        
             ))
             :
              <View  style={Estilos.indicador} > 
                     <ActivityIndicator   size='large' color="#66A638" />
                <Text style={{color:'#66A638',fontWeight:'bold'}} >Carregando Produtos</Text>
                </View> }
</ScrollView>
         </View>
    </View>
  );
}
