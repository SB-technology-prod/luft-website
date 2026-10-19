export interface SearchItem {
  id: string;
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  location: string;
  cityId: number;
  city: string;
  area: string;
  fullAddress: string;
  latitude: number;
  longitude: number;
  guests: number;
  pricePerNight: number;
  currency: string;
  status: boolean;
  isRecommended: boolean;
  propertyType: number;
  propertyKind: number;
  numberOfRooms: number;
  numberOfBeds: number;
  numberOfBathrooms: number;
  isOnKrossBooking: boolean;
  coverImageUrl: string;
  extension: string;
  images: Image[];
  collectionIds: string[];
  amenityIds: string[];
  nearbyPlaces: nearbyPlace[];
  isWishlisted: boolean;
  reviewsCount: number;
  rating: number;
}
export interface nearbyPlace {
  categoryId: string
  placeNameEn: string
  placeNameAr: string
  timeEn: string
  timeAr: string
}
export interface Image {
  id: string;
  url: string;
  isCover: boolean;
  order: number;
  extension: string;
}
