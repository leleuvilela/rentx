import React, { useRef, useState } from "react";
import { FlatList, ViewToken } from "react-native";

import {
  CarImage,
  CarImageWrapper,
  Container,
  ImageIndex,
  ImageIndexes,
} from "./styles";

interface ImageSliderProps {
  imagesUrl: {
    id: string;
    car_id: string;
    photo: string;
  }[];
}

interface ChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

export function ImageSlider({ imagesUrl }: ImageSliderProps) {
  const [imageIndex, setImageIndex] = useState(0);

  const indexChanged = useRef((info: ChangeImageProps) => {
    const index = info.viewableItems[0].index!;
    setImageIndex(index);
  });

  return (
    <Container>
      <ImageIndexes>
        {imagesUrl.map((item, index) => (
          <ImageIndex active={index === imageIndex} key={String(item.id)} />
        ))}
      </ImageIndexes>

      <FlatList
        data={imagesUrl}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={indexChanged.current}
        renderItem={({ item }) => (
          <CarImageWrapper>
            <CarImage source={{ uri: item.photo }} resizeMode="contain" />
          </CarImageWrapper>
        )}
      />
    </Container>
  );
}
