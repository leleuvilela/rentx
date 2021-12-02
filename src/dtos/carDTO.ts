export interface CarDTO {
  id: string;
  name: string;
  brand: string;
  about: string;
  period: string;
  price: number;
  fuel_type: string;
  thumbnail: string;
  created_at: number;
  updated_at: number;
  photos: Photo[];
  accessories: Accessory[];
}

interface Accessory {
  id: string;
  car_id: string;
  name: string;
  type: string;
}

interface Photo {
  id: string;
  car_id: string;
  photo: string;
}