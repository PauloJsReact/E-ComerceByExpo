import React, { useState,useEffect } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View,ActivityIndicator,Alert} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'; 
import axios from  'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'


import Estilos from './Estilos';
import Api from './Api';

export default function Produtos({ navigation }) {



  const [nome,setNome] = useState('');
  const [descricao,setDescricao]= useState('');
  const [preco,setPreco] = useState('');
  const [quantidade,setQuantidade]=useState('');
  const [image_path,setImagePath] =useState('');
  const[usuario_id,setUsuarioId] = useState('');

const [perguntarNome,setPergutarNome]= useState(true);
const [perguntarDescricao,setPerguntarDescricao]=useState(true);
const [image, setImage] = useState(null);
const [imageUpload,setImageUpload]=useState('');
const [carregando,setCarregando]=useState(false);
const [visualisarBtn,setVisualizarBtn]=useState(false);

useEffect(() => {
  (async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alertaCamera();
      }
    }
  })();
  setImage(Api+'Images/image-teste.png');
}, []);

if (usuario_id ==='') {
  recuperarId();
}

async function recuperarId() {
  let value = await AsyncStorage.getItem("id");
  if (value != undefined) {
    setUsuarioId(value);
    console.log('Id Pronto: ',JSON.parse(value));
  }
}


function alertaCamera() {
  Alert.alert(
    "Permicoes",
    "Desculpe, precisamos de permissões da câmera !",
    [
      
        {text:"OK",
        onPress:()=> console.log("ok precionado"),
        style:"cancel",
        }
    ],
      {cancelable:false}
  )
}

async function pegarImagem() {
  let result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    mediaType: 'photo',
    base64:true,
    aspect: [4, 3],
    quality: 1,
  });

 // console.log('Resultado',result);
 

  if (!result.cancelled) {
    setImage(result.uri);
    setImageUpload(result);
    salvarNomeImagem(result);
  }

}

function salvarNomeImagem(resultado) {
  /// essa funçao pega  o  nome do arquivo e separa para enviar para o banco de  dados
  let localUri = resultado.uri;
  let filename = localUri.split('/').pop();
  setImagePath(filename);
  setVisualizarBtn(!visualisarBtn);
  console.log('image_path :',filename);
}

async function enviarImagem() {
  ///essa funçao insere o nome do  arquivo para enviar no servidor
  setCarregando(!carregando);
 // console.log('image_path :',image_path);
  let objetoImagem = imageUpload;
  objetoImagem.fileName = image_path;
  salvarImagem(objetoImagem);
}

async function salvarImagem(imformcoesDaImagem) {
  //essa funçao salva  a imagem  no servidor
 console.log('objetoImagem :',imformcoesDaImagem);
 setVisualizarBtn(!visualisarBtn);
  const data = {
    method: 'POST',
    body: JSON.stringify({
      image: imformcoesDaImagem
    }),

    headers: {
      'Accept':       'application/json',
      'Content-Type': 'application/json',
      
    }
  };
  
  fetch(Api+'Images/index.php', data)
  .then(response => response.json())  // promise
  .then(json => {
    console.log('result',json);
    if (json != '') {
      MensagemIMage();
      setCarregando(false);
    }
  })
}

function MensagemIMage() {
  Alert.alert(
      "Sucesso",
      "Image salva com Sucesso",
      [
          {text:"ok",
          onPress:()=>console.log("ok"),
          style:"cancel",
          }
      ],
        {cancelable:true}
    )
}

function deixarPraDepois() {
  setImagePath('image-teste.png');
  cadastrarProduto();
}

async   function cadastrarProduto(){
if (nome !='' && preco !='' && quantidade !=='' ) {
  if (image_path !='') {
      let categoria_id = 15;
      const obj = {nome,usuario_id,quantidade,preco,image_path,categoria_id}
      const res = await axios.post(Api+'loja/cadastrarProduto/index.php',obj);
      console.log(obj);
      console.log(res.data);
  }else{
    Alert.alert(
      "Imagem Alerta",
      "Voce nao enviou sua imagem",
      [{
        text:"Deixar Para depois",
        onPress:()=>deixarPraDepois(),
        style:"cancel"
      },
          {text:"ok",
          onPress:()=> pegarImagem(),
          style:"cancel",
          }
      ],
        {cancelable:true}
    )
  }
  
}else{
  Alert.alert(
    "Falta dados",
    "Por favor preencha corretamente o formulario",
    [
        {text:"ok",
        onPress:()=>limparFormulario(),
        style:"cancel",
        }
    ],
      {cancelable:false}
  )
}
   
 }

  function limparFormulario() {
    setPergutarNome(!perguntarNome);
    setPerguntarDescricao(!perguntarDescricao);
    setImagePath('');
  }



  return (

    <View style={Estilos.container}>
      {perguntarNome != false?
      //essa view tem  a  funçao de perguntar o nome
      <View style={Estilos.container}  >
      <Text style={Estilos.TituloCadatroProd} >Ola tudo  bem ??</Text>
      <Text  style={Estilos.textoExplicativo} >Primeiramente me informe o nome do seu produto</Text>
      <TextInput
      style={Estilos.caixaTextoProduto}
      value={nome}
      placeholder="Nome do produto"
      onChangeText={(nome)=>setNome(nome)}
      />
      <TouchableOpacity
      onPress={()=>setPergutarNome(!perguntarNome)}
      style={Estilos.btnConfirmaCadProd}
      >
        <Text style={Estilos.textoConfirBtnCadProd}>Vamos Continuar</Text>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="#ffff" />
      </TouchableOpacity>
      </View>
      :
      //essa view tem  a  funçao de perguntar a descriçao e a quantidade 
      perguntarDescricao != false  ?
      <View>
        <View style={{  alignItems:'center',top:'-20%'}}>
        <Text  style={Estilos.TituloCadatroProd} > Muinto bem </Text>
        </View>

        <Text style={Estilos.textoExplicativoDois}>Defina um preço</Text>
        <TextInput
        value={preco}
        style={Estilos.caixaTextoProduto}
        placeholder="Valor do produto"
        onChangeText={(preco)=>{setPreco(preco)}}
        keyboardType="number-pad"
        />


        <Text  style={Estilos.textoExplicativoDois}>Imforme a quantidade disponivel</Text>
        <TextInput
        style={Estilos.caixaTextoProduto}
        value={quantidade}
        placeholder="Quantidade dsponivel"
        onChangeText={(quantidade)=>{setQuantidade(quantidade)}}
        keyboardType="number-pad"
        />

        <Text style={Estilos.textoExplicativoDois}>Escreva uma breve descriçao do seu produto</Text>
        <TextInput
        value={descricao}
        style={Estilos.caixaTextoProduto}
        placeholder="Descrição"
        onChangeText={(descricao)=>{setDescricao(descricao)}}
        />

    <View style={{  alignItems:'center',top:'20%'}}>
        <TouchableOpacity
      onPress={()=>setPerguntarDescricao(!perguntarDescricao)}
      style={Estilos.btnConfirmaCadProd}
      >
        <Text style={Estilos.textoConfirBtnCadProd} >OK Vamos la</Text>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="#ffff" />
      </TouchableOpacity>
    </View>
      </View>
      :
///nessa  view serve  para adicionar  a  imagem 
      <View  style={Estilos.container} >
  <Text style={Estilos.TituloCadatroProd} >Quase lá...</Text>
  <Text  style={Estilos.textoExplicativo} >Toque na imagem para fazer escolher uma nova</Text>

 <View  style={Estilos.caixaImagem} >
  {
    carregando != true?
  <TouchableOpacity
  onPress={pegarImagem}
  >
        <Image
        source={{uri:image}}
        style={{
          width:210,
          height:210,
        }}
        />
</TouchableOpacity>
:
<ActivityIndicator   size='large' color="#66A638" />
}
</View>
{
  visualisarBtn != false?
      <TouchableOpacity
      onPress={enviarImagem}
      style={Estilos.btnConfirmaCadProd}
      >
        <Text style={Estilos.textoConfirBtnCadProd} >Enviar Imagem </Text>
        <Feather name="upload-cloud" size={24} color="#ffff" style={{marginLeft:5}} />
      </TouchableOpacity>
      :
      <Text></Text>
}
<View  style={{flexDirection:'row',alignItems:'center'}} >
        <TouchableOpacity
      onPress={limparFormulario}
      style={Estilos.btnLimparFormulario}
      >
      <AntDesign name="close" size={24} color="#ffff" />
        <Text style={Estilos.textoConfirBtnCadProd}>Voltar</Text>
      </TouchableOpacity>
      <TouchableOpacity
      onPress={cadastrarProduto}
      style={Estilos.btnConfirmaCadProd}
      >
         <AntDesign name="check" size={24} color="#ffff" />
        <Text style={Estilos.textoConfirBtnCadProd} >Tudo Pronto</Text>
       
      </TouchableOpacity>
</View>
      </View>
      }
    </View>
  );
}
