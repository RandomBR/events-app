import React, { useState, useEffect } from 'react';
import { Image, Text, View, Button, TouchableHighlight } from 'react-native';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';



const Page = styled.SafeAreaView`
    flex:1;
    justifyContent: center;
    align-items: center;
    background-color:#B22222;
    
`;
const Prot = styled.SafeAreaView`
    background-color: white;
    flex:1;
    justifyContent: center;
    align-items: center;
    margin-left:60px;
    margin-right:60px;

`;
const Input = styled.TextInput`
    fontSize:15;
    borderBottomWidth: 1;
    width:200px;
    height:50px;
    margin:8px;
    color:black;
    `;
const Botao = styled.TouchableOpacity`
    width: 200px;
    height: 40px;
    border-radius: 10;    
    background-color:#B22222;
    margin-top: 15px;
    justify-content: center;
    align-items: center;
`;
const Btntexto = styled.Text`
	font-size: 15px;
	color: white;
    text-align: center;
    font-weight: bold;
    `;
const Title = styled.Text`
    padding: 20px;
	font-size: 18px;
	font-weight: bold;
	color: red;
`;
const Texto = styled.Text`
    font-weight: bold;
    font-size: 15px;

`;
const Confirmar = (props) => {
    const [status, setStatus] = useState('');
    const [nome, setNome] = useState('');
    const [link, setLink] = useState([]);
    const [token_event, setToken_event] = useState('');
    const [id, setId] = useState('');

    AsyncStorage.getItem('@id').then((id) => { if (id !== null) { setId(id) } else { props.navigation.navigate('Login') } });;
    AsyncStorage.getItem('@token_event').then((token_event) => { if (token_event !== null) { setToken_event(token_event) } else { props.navigation.navigate('Login') } });;
    AsyncStorage.getItem('@nome').then((nome) => { if (nome !== null) { setNome(nome) } else { props.navigation.navigate('Login') } });
    function accept() {
        try {
            fetch("https://backevents.onrender.com/api/accept", {
                method: 'GET',
                headers: {
                    Authorization: token_event,
                    events: link,
                    guest: id
                }
            }).then((r) => {
                console.log(r)
                
                switch (r.status) {
                    case 403:
                        alert('evento já realizado!');
                        break;
                    case 409:
                        alert('Você é o organizador desse evento!');
                        break;
                    case 200:
                        alert('Presença confirmada com sucesso!');
                        break;

                }

            })

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Page>
            <Prot>
                <Texto>Insira o código do evento:</Texto>
                <Input onChangeText={e => setLink(e)} placeholderTextColor="dimgray" />
                <Botao onPress={() => accept()} ><Btntexto>Confirmar</Btntexto></Botao>
            </Prot>
        </Page>
    );
}

export default Confirmar;