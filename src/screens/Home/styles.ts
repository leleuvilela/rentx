import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { CarDTO } from '../../dtos/carDTO';
import { RectButton } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
  width: 100%;
  height: 113px;
  background-color: ${({ theme }) => theme.colors.header};  
  
  justify-content: flex-end;
  padding: 32px 24px;
`;

export const HeaderContent = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
`;

export const TotalCars = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.text};
`;

export const CarList = styled(FlatList as new () => FlatList<CarDTO>).attrs({
  contentContainerStyle: {
    padding: 24
  },
  showVerticalScrollIndicator: false
})``;


export const MyCarsButton = styled(Animated.createAnimatedComponent(RectButton))`
  width: 60px;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.main};

  justify-content: center;
  align-items: center;

  border-radius: 30px;
`