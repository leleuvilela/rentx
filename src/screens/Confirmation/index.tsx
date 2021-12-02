import React from "react";
import { StatusBar, useWindowDimensions } from "react-native";

import LogoSvg from "../../assets/logo_background_gray.svg";
import DoneSvg from "../../assets/done.svg";

import {
  ConfirmButton,
  ConfirmButtonTitle,
  Container,
  Content,
  Footer,
  Message,
  Title,
} from "./styles";
import { useNavigation, useRoute } from "@react-navigation/core";

interface Params {
  title: string;
  message: string;
  nextScreenRoute: string;
}

function Confirmation() {
  const { width } = useWindowDimensions();
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { title, message, nextScreenRoute } = route.params as Params;


  function handleConfirm() {
    navigation.navigate(nextScreenRoute)
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <LogoSvg width={width} />

      <Content>
        <DoneSvg width={80} height={80}/>
        <Title>{title}</Title>

        <Message>
          {message}
        </Message>
      </Content>
      <Footer>

        <ConfirmButton onPress={handleConfirm}>
          <ConfirmButtonTitle>OK</ConfirmButtonTitle>
        </ConfirmButton>
      </Footer>
    </Container>
  );
}

export default Confirmation;
