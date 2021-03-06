/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateTurnipPriceInput = {
  id?: string | null,
  date: string,
  amPrice?: number | null,
  pmPrice?: number | null,
};

export type ModelTurnipPriceConditionInput = {
  date?: ModelStringInput | null,
  amPrice?: ModelIntInput | null,
  pmPrice?: ModelIntInput | null,
  and?: Array< ModelTurnipPriceConditionInput | null > | null,
  or?: Array< ModelTurnipPriceConditionInput | null > | null,
  not?: ModelTurnipPriceConditionInput | null,
};

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


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
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

export type UpdateTurnipPriceInput = {
  id: string,
  date?: string | null,
  amPrice?: number | null,
  pmPrice?: number | null,
};

export type DeleteTurnipPriceInput = {
  id?: string | null,
};

export type CreateSundayTurnipInput = {
  id?: string | null,
  date: string,
  price?: number | null,
};

export type ModelSundayTurnipConditionInput = {
  date?: ModelStringInput | null,
  price?: ModelIntInput | null,
  and?: Array< ModelSundayTurnipConditionInput | null > | null,
  or?: Array< ModelSundayTurnipConditionInput | null > | null,
  not?: ModelSundayTurnipConditionInput | null,
};

export type UpdateSundayTurnipInput = {
  id: string,
  date?: string | null,
  price?: number | null,
};

export type DeleteSundayTurnipInput = {
  id?: string | null,
};

export type ModelTurnipPriceFilterInput = {
  id?: ModelIDInput | null,
  date?: ModelStringInput | null,
  amPrice?: ModelIntInput | null,
  pmPrice?: ModelIntInput | null,
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

export type ModelSundayTurnipFilterInput = {
  id?: ModelIDInput | null,
  date?: ModelStringInput | null,
  price?: ModelIntInput | null,
  and?: Array< ModelSundayTurnipFilterInput | null > | null,
  or?: Array< ModelSundayTurnipFilterInput | null > | null,
  not?: ModelSundayTurnipFilterInput | null,
};

export type CreateTurnipPriceMutationVariables = {
  input: CreateTurnipPriceInput,
  condition?: ModelTurnipPriceConditionInput | null,
};

export type CreateTurnipPriceMutation = {
  createTurnipPrice:  {
    __typename: "TurnipPrice",
    id: string,
    date: string,
    amPrice: number | null,
    pmPrice: number | null,
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
    date: string,
    amPrice: number | null,
    pmPrice: number | null,
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
    date: string,
    amPrice: number | null,
    pmPrice: number | null,
  } | null,
};

export type CreateSundayTurnipMutationVariables = {
  input: CreateSundayTurnipInput,
  condition?: ModelSundayTurnipConditionInput | null,
};

export type CreateSundayTurnipMutation = {
  createSundayTurnip:  {
    __typename: "SundayTurnip",
    id: string,
    date: string,
    price: number | null,
  } | null,
};

export type UpdateSundayTurnipMutationVariables = {
  input: UpdateSundayTurnipInput,
  condition?: ModelSundayTurnipConditionInput | null,
};

export type UpdateSundayTurnipMutation = {
  updateSundayTurnip:  {
    __typename: "SundayTurnip",
    id: string,
    date: string,
    price: number | null,
  } | null,
};

export type DeleteSundayTurnipMutationVariables = {
  input: DeleteSundayTurnipInput,
  condition?: ModelSundayTurnipConditionInput | null,
};

export type DeleteSundayTurnipMutation = {
  deleteSundayTurnip:  {
    __typename: "SundayTurnip",
    id: string,
    date: string,
    price: number | null,
  } | null,
};

export type GetTurnipPriceQueryVariables = {
  id: string,
};

export type GetTurnipPriceQuery = {
  getTurnipPrice:  {
    __typename: "TurnipPrice",
    id: string,
    date: string,
    amPrice: number | null,
    pmPrice: number | null,
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
      date: string,
      amPrice: number | null,
      pmPrice: number | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetSundayTurnipQueryVariables = {
  id: string,
};

export type GetSundayTurnipQuery = {
  getSundayTurnip:  {
    __typename: "SundayTurnip",
    id: string,
    date: string,
    price: number | null,
  } | null,
};

export type ListSundayTurnipsQueryVariables = {
  filter?: ModelSundayTurnipFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSundayTurnipsQuery = {
  listSundayTurnips:  {
    __typename: "ModelSundayTurnipConnection",
    items:  Array< {
      __typename: "SundayTurnip",
      id: string,
      date: string,
      price: number | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateTurnipPriceSubscription = {
  onCreateTurnipPrice:  {
    __typename: "TurnipPrice",
    id: string,
    date: string,
    amPrice: number | null,
    pmPrice: number | null,
  } | null,
};

export type OnUpdateTurnipPriceSubscription = {
  onUpdateTurnipPrice:  {
    __typename: "TurnipPrice",
    id: string,
    date: string,
    amPrice: number | null,
    pmPrice: number | null,
  } | null,
};

export type OnDeleteTurnipPriceSubscription = {
  onDeleteTurnipPrice:  {
    __typename: "TurnipPrice",
    id: string,
    date: string,
    amPrice: number | null,
    pmPrice: number | null,
  } | null,
};

export type OnCreateSundayTurnipSubscription = {
  onCreateSundayTurnip:  {
    __typename: "SundayTurnip",
    id: string,
    date: string,
    price: number | null,
  } | null,
};

export type OnUpdateSundayTurnipSubscription = {
  onUpdateSundayTurnip:  {
    __typename: "SundayTurnip",
    id: string,
    date: string,
    price: number | null,
  } | null,
};

export type OnDeleteSundayTurnipSubscription = {
  onDeleteSundayTurnip:  {
    __typename: "SundayTurnip",
    id: string,
    date: string,
    price: number | null,
  } | null,
};
