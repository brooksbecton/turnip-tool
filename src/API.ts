/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateTurnipPriceInput = {
  id?: string | null,
  price: number,
  dateAdded: string,
};

export type ModelTurnipPriceConditionInput = {
  price?: ModelIntInput | null,
  dateAdded?: ModelStringInput | null,
  and?: Array< ModelTurnipPriceConditionInput | null > | null,
  or?: Array< ModelTurnipPriceConditionInput | null > | null,
  not?: ModelTurnipPriceConditionInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type UpdateTurnipPriceInput = {
  id: string,
  price?: number | null,
  dateAdded?: string | null,
};

export type DeleteTurnipPriceInput = {
  id?: string | null,
};

export type ModelTurnipPriceFilterInput = {
  id?: ModelIDInput | null,
  price?: ModelIntInput | null,
  dateAdded?: ModelStringInput | null,
  and?: Array< ModelTurnipPriceFilterInput | null > | null,
  or?: Array< ModelTurnipPriceFilterInput | null > | null,
  not?: ModelTurnipPriceFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type CreateTurnipPriceMutationVariables = {
  input: CreateTurnipPriceInput,
  condition?: ModelTurnipPriceConditionInput | null,
};

export type CreateTurnipPriceMutation = {
  createTurnipPrice:  {
    __typename: "TurnipPrice",
    id: string,
    price: number,
    dateAdded: string,
  } | null,
};

export type UpdateTurnipPriceMutationVariables = {
  input: UpdateTurnipPriceInput,
  condition?: ModelTurnipPriceConditionInput | null,
};

export type UpdateTurnipPriceMutation = {
  updateTurnipPrice:  {
    __typename: "TurnipPrice",
    id: string,
    price: number,
    dateAdded: string,
  } | null,
};

export type DeleteTurnipPriceMutationVariables = {
  input: DeleteTurnipPriceInput,
  condition?: ModelTurnipPriceConditionInput | null,
};

export type DeleteTurnipPriceMutation = {
  deleteTurnipPrice:  {
    __typename: "TurnipPrice",
    id: string,
    price: number,
    dateAdded: string,
  } | null,
};

export type GetTurnipPriceQueryVariables = {
  id: string,
};

export type GetTurnipPriceQuery = {
  getTurnipPrice:  {
    __typename: "TurnipPrice",
    id: string,
    price: number,
    dateAdded: string,
  } | null,
};

export type ListTurnipPricesQueryVariables = {
  filter?: ModelTurnipPriceFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTurnipPricesQuery = {
  listTurnipPrices:  {
    __typename: "ModelTurnipPriceConnection",
    items:  Array< {
      __typename: "TurnipPrice",
      id: string,
      price: number,
      dateAdded: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateTurnipPriceSubscription = {
  onCreateTurnipPrice:  {
    __typename: "TurnipPrice",
    id: string,
    price: number,
    dateAdded: string,
  } | null,
};

export type OnUpdateTurnipPriceSubscription = {
  onUpdateTurnipPrice:  {
    __typename: "TurnipPrice",
    id: string,
    price: number,
    dateAdded: string,
  } | null,
};

export type OnDeleteTurnipPriceSubscription = {
  onDeleteTurnipPrice:  {
    __typename: "TurnipPrice",
    id: string,
    price: number,
    dateAdded: string,
  } | null,
};
