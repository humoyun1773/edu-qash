export interface CenterCoordinates {
  lat: number;
  lng: number;
}

export interface LearningCenterItem {
  id: string;
  name: string;
  logo: string;
  cover: string;
  description: string;
  rating: number;
  reviewsCount: number;
  phone: string;
  telegram: string;
  instagram: string;
  website: string;
  address: string;
  city: string;
  mapCoords: CenterCoordinates;
  workingHours: string;
  coursesCount: number;
  teachersCount: number;
  verified: boolean;
}

export interface CreateCenterPayload {
  name: string;
  description: string;
  phone: string;
  city: string;
  address: string;
  logo?: string;
  cover?: string;
}

export interface UpdateCenterPayload {
  name?: string;
  description?: string;
  phone?: string;
  city?: string;
  address?: string;
  workingHours?: string;
}
