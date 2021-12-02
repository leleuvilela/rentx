import React from "react";
import { Calendar as CustomCalendar, LocaleConfig, CalendarProps } from "react-native-calendars";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import { ptBR } from "./localeConfig";


LocaleConfig.locales['pt-br'] = ptBR
LocaleConfig.defaultLocale = 'pt-br';

export function Calendar({ markedDates, onDayPress, ...rest }: CalendarProps) {
  const theme = useTheme();
  return (
    <CustomCalendar
      renderArrow={(direction) => (
        <Feather
          size={24}
          color={theme.colors.text}
          name={direction === "left" ? "chevron-left" : "chevron-right"}
        />
      )}

      headerStyle={{
        backgroundColor: theme.colors.background_secondary,
        borderBottomColor: theme.colors.text_detail,
        borderBottomWidth: 0.5,
        paddingBottom: 10,
        marginBottom: 10
      }}

      theme={{ 
        textDayFontFamily: theme.fonts.primary_400,
        textDayHeaderFontFamily: theme.fonts.primary_500,
        textDayHeaderFontSize: 10,
        textMonthFontSize: 20,
        textMonthFontFamily: theme.fonts.secondary_600,
        monthTextColor: theme.colors.title,
        arrowStyle: {
          marginHorizontal: -15
        }
      }}

      firstDay={1}
      minDate={new Date()}
      markingType="period"
      markedDates={markedDates}
      onDayPress={onDayPress}
    />
  );
}
