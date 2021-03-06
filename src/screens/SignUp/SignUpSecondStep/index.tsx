import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from 'styled-components';
import api from '../../../services/api';

import { Container, Form, FormTitle, Header, Steps, Subtitle, Title } from './styles';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import InputPassword from '../../../components/InputPassword';
import { Button } from '../../../components/Button';

interface Params {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  }
}

function SignUpSecondStep() {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const navigation = useNavigation();
  const route = useRoute();
  const theme = useTheme();

  const { user } = route.params as Params;

  function handleBack() {
    navigation.goBack();    
  }

  async function handleRegister() {
    if(!password || !passwordConfirm){
      return Alert.alert('Informe a senha e a confirmação');
    }

    if(password != passwordConfirm){
      return Alert.alert('As senhas não são iguais');
    }

    await api.post('/users', {
      name: user.name,
      email: user.email,
      driver_license: user.driverLicense,
      password
    })
    .then(() => {
      navigation.navigate('Confirmation', {
        nextScreenRoute: 'SignIn',
        title: 'Conta Criada!',
        message: `Agora é só fazer login\ne aproveitar.`
      });
    })
    .catch(() => {      
      Alert.alert('Opa', 'Não foi possível cadastrar');
    });

  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack} />
            <Steps>
              <Bullet />
              <Bullet active />
            </Steps>
          </Header>

          <Title>
            Crie sua{'\n'}conta
          </Title>
          <Subtitle>
            Faça seu cadastro de{'\n'}
            forma rápida e fácil
          </Subtitle>

          <Form>
            <FormTitle>2. Senha</FormTitle>
            <InputPassword 
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
            <InputPassword 
              iconName="lock"
              placeholder="Repetir Senha"
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />
          </Form>

          <Button 
            color={theme.colors.success}
            title="Cadastrar"     
            onPress={handleRegister}   
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignUpSecondStep;
