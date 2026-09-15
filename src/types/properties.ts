import { ApiResponse } from '.';

export type PropertyApiRes = {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  currency: string;
  rating: number;
  reviewCount: number;
  coverImageUrl: string;
  images: string[];
};

export type PropertyImage = {
  id: string;
  url: string;
  isCover: boolean;
  order: number;
  extension: string;
};

type NearbyPlaceItem = {
  placeName: string;
  time: string;
};

export type NearbyPlaceCategory = {
  category: string;
  places: NearbyPlaceItem[];
};

export type Amenity = {
  amenityId: string;
  amenityName: string;
  amenityTypeName: string;
};

export type PropertyCollection = {
  collectionId: string;
  collectionName: string;
};

export type PropertyReview = {
  id: string;
  imageUrl: string;
  name: string;
  city: string;
  reviewText: string;
  lengthOfStay: number;
  daysAgo: number;
  rating: number;
};

export type PropertyDetailsApiRes = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  city: string;
  area: string;
  fullAddress: string;
  pricePerNight: number;
  currency: string;
  maximumGuests: number;
  numberOfRooms: number;
  numberOfBeds: number;
  numberOfBathrooms: number;
  propertyType: number;
  latitude: number;
  longitude: number;
  status: boolean;
  isAvailable: boolean;
  images: PropertyImage[];
  nearbyPlaces: NearbyPlaceCategory[];
  amenities: Amenity[];
  collections: PropertyCollection[];
  averageRating: number;
  reviewCount: number;
  reviews: PropertyReview[];
};

export type RecommendedPropertiesApiRes = ApiResponse<PropertyApiRes[]>;
export type GetPropertyApiResponse = ApiResponse<PropertyDetailsApiRes>;
