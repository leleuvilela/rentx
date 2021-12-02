import React, { useEffect, useState } from "react";
import { Alert, StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/core";
import { format } from "date-fns";

import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import {
  Accessories,
  Brand,
  CalendarIcon,
  CarImages,
  Container,
  Content,
  DateInfo,
  DateTitle,
  DateValue,
  Description,
  Details,
  Footer,
  Header,
  Name,
  Period,
  Price,
  Rent,
  RentalPeriod,
  RentalPrice,
  RentalPriceDetails,
  RentalPriceLabel,
  RentalPriceQuota,
  RentalPriceTotal,
} from "./styles";

import { Accessory } from "../../components/Acessory";
import { Button } from "../../components/Button";
import { CarDTO } from "../../dtos/carDTO";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";
import { getPlatformDate } from "../../utils/getPlatformDate";
import api from "../../services/api";

interface SchedulingDetailsProps {}
interface Params {
  car: CarDTO;
  dates: string[];
}

interface RentalPeriod {
  start: string;
  end: string;
}

function SchedulingDetails({}: SchedulingDetailsProps) {
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { car, dates } = route.params as Params;
  const [loading, setLoading] = useState(false);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );

  const rentTotal = Number(dates.length * car.rent.price);

  async function handleConfirmRental() {
    try {
      setLoading(true);
      const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);
      const unavailable_dates = {
        ...schedulesByCar.data.unavailable_dates,
        ...dates,
      };
      
      await api.post('/schedules_byuser', {
        user_id: 1,
        car,
        startDate: rentalPeriod.start,
        endDate: rentalPeriod.end
      })
      await api.put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates,
      });
      navigation.navigate("Confirmation", {
        nextScreenRoute: "Home",
        title: "Carro alugado!",
        message: `Agora você só precisa ir\naté a concessionária da RENTX\npegar o seu automóvel.`,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }


    // await api
    //   .post("/rentals", {
    //     user_id: 1,
    //     car_id: car.id,
    //     start_date: new Date(),
    //     end_date: new Date(),
    //     total: rentTotal,
    //   })
    //   .then(() => {
    //     navigation.navigate("Confirmation", {
    //       nextScreenRoute: "Home",
    //       title: "Carro alugado!",
    //       message: `Agora você só precisa ir\naté a concessionária da RENTX\npegar o seu automóvel.`,
    //     });
    //   })
    //   .catch((erro) => {
    //     setLoading(false);
    //     Alert.alert("Não foi possível confirmar o agendamento.");
    //   });
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), "dd/MM/yyyy"),
      end: format(
        getPlatformDate(new Date(dates[dates.length - 1])),
        "dd/MM/yyyy"
      ),
    });
  }, []);

  function handleBack() {
    navigation.goBack();
  }

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <Header>
        <BackButton onPress={handleBack} />
      </Header>
      <CarImages>
        <ImageSlider imagesUrl={car.photos} />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {car.accessories.map((acessory) => (
            <Accessory
              key={acessory.type}
              name={acessory.name}
              icon={getAccessoryIcon(acessory.type)}
            />
          ))}
        </Accessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather name="calendar" size={RFValue(24)} color="white" />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>ATE</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>{`R$ ${car.rent.price} x${dates.length} diárias`}</RentalPriceQuota>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          title="Alugar agora"
          color={theme.colors.success}
          onPress={handleConfirmRental}
          enabled={!loading}
          loading={loading}
        />
      </Footer>
    </Container>
  );
}

export default SchedulingDetails;
