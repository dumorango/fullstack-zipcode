/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FindPlaces
// ====================================================

export interface FindPlaces_findPlaces {
  __typename: "Place";
  name: string;
  state: string;
}

export interface FindPlaces {
  findPlaces: FindPlaces_findPlaces[];
}

export interface FindPlacesVariables {
  countryCode: string;
  zipCode: string;
}
