import React, { useState } from "react";
import { StatusBar } from "react-native";
import { format } from "date-fns";
import { useNavigation } from "@react-navigation/core";
import { DateData } from "react-native-calendars/src/types";

import {
  Container,
  Content,
  DateInfo,
  DateTitle,
  DateValue,
  Footer,
  Header,
  RentalPeriod,
  Title,
} from "./styles";

import { BackButton } from "../../components/BackButton";
import ArrowSvg from "../../assets/arrow.svg";
import { Button } from "../../components/Button";
import { Calendar } from "../../components/Calendar";
import {
  generateInterval,
  MarkedDatesType,
} from "../../components/Calendar/generateInterval";
import { getPlatformDate } from "../../utils/getPlatformDate";
import { useRoute } from "@react-navigation/native";
import { CarDTO } from "../../dtos/carDTO";

interface SchedulingProps {}

export interface RentalPeriod {
  startFormatted: string;
  endFormatted: string;
}

interface Params {
  car: CarDTO;
}

function Scheduling({}: SchedulingProps) {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { car } = route.params as Params;
  const [lastSelectedDate, setLastSelectedDate] = useState<DateData>(
    {} as DateData
  );
  const [markedDates, setMarkedDates] = useState<MarkedDatesType>(
    {} as MarkedDatesType
  );
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );

  function handleConfirmRental() {
    navigation.navigate('SchedulingDetails', {
      car,
      dates: Object.keys(markedDates)
    });
  }

  function handleBack() {
    navigation.goBack();
  }

  function handleChangeDate(date: DateData) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarkedDates(interval);
    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({          
      startFormatted: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
      endFormatted: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy'),
    })
  }

  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <BackButton onPress={handleBack} />
        <Title>
          Escolha uma {`\n`}
          data de início e {`\n`}
          fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={!!rentalPeriod.startFormatted}>{rentalPeriod.startFormatted}</DateValue>
          </DateInfo>
          <ArrowSvg />
          <DateInfo>
            <DateTitle>ATE</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormatted}>{rentalPeriod.endFormatted}</DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar markedDates={markedDates} onDayPress={handleChangeDate} />
      </Content>

      <Footer>
        <Button title="Confirmar" onPress={handleConfirmRental} />
      </Footer>
    </Container>
  );
}

export default Scheduling;
