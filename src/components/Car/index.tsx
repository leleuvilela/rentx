import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";

import {
  About,
  Brand,
  CarImage,
  Container,
  Details,
  Name,
  Period,
  Price,
  Rent,
  Type,
} from "./styles";
import GasolineSvg from "../../assets/gasoline.svg";
import { CarDTO } from "../../dtos/carDTO";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";


interface CarProps extends RectButtonProps {
  data: CarDTO
}

function Car({ data, ...rest }: CarProps) {
  const MotorIcon = getAccessoryIcon(data.fuel_type)
  return (
    <Container {...rest}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <About>
          <Rent>
            <Period>{data.period}</Period>
            <Price>R$ {data.price}</Price>
          </Rent>
          <Type>
            <MotorIcon />
          </Type>
        </About>
      </Details>

      <CarImage source={{ uri: data.thumbnail }} resizeMode="contain" />
    </Container>
  );
}

export default Car;
