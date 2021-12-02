import React from "react";
import { StatusBar, StyleSheet } from "react-native";
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

import {
  About,
  Accessories,
  Brand,
  CarImages,
  Container,
  Description,
  Details,
  Footer,
  Header,
  Name,
  Period,
  Price,
  Rent,
} from "./styles";

import { Accessory } from "../../components/Acessory";
import { Button } from "../../components/Button";
import { useNavigation, useRoute } from "@react-navigation/core";
import { CarDTO } from "../../dtos/carDTO";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";
import { useTheme } from "styled-components";

interface Params {
  car: CarDTO;
}

interface CarDetailsProps {}

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    overflow: "hidden",
    zIndex: 1,
  },
});

function CarDetails({}: CarDetailsProps) {
  const navigation = useNavigation();
  const route = useRoute();
  const { car } = route.params as Params;
  const theme = useTheme();

  function handleConfirmRental() {
    navigation.navigate("Scheduling", { car });
  }

  function handleBack() {
    navigation.goBack();
  }

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });
  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 85],
        Extrapolate.CLAMP
      ),
    };
  });
  const sliderCarStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 100], [1, 0], Extrapolate.CLAMP),
    };
  });

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <Animated.View
        style={[
          headerStyleAnimation,
          styles.header,
          { backgroundColor: theme.colors.background_secondary },
        ]}
      >
        <Header>
          <BackButton onPress={handleBack} />
        </Header>

        <Animated.View style={sliderCarStyleAnimation}>
          <CarImages>
            <ImageSlider imagesUrl={car.photos} />
          </CarImages>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: getStatusBarHeight() + 160,
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {car.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {car.accessories.map((acessory) => (
            <Accessory
              name={acessory.name}
              icon={getAccessoryIcon(acessory.type)}
            />
          ))}
        </Accessories>

        <About>
          {car.about} {car.about} {car.about} {car.about}
        </About>
      </Animated.ScrollView>
      <Footer>
        <Button
          title="Escolher Período do Aluguel"
          onPress={handleConfirmRental}
        />
      </Footer>
    </Container>
  );
}

export default CarDetails;
