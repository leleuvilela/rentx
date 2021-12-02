import React from "react";
import LottieView from "lottie-react-native";
import { Container } from "./styles";
import loadingCar from "../../assets/load_animated.json";

interface LoadAnimationProps {}

function LoadAnimation({}: LoadAnimationProps) {
  return (
    <Container>
      <LottieView
        source={loadingCar}
        autoPlay
        resizeMode="contain"
        style={{ height: 200 }}
        loop
      />
    </Container>
  );
}

export default LoadAnimation;
