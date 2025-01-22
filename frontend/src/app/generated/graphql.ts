import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: { input: any; output: any; }
  UUID: { input: any; output: any; }
};

/** Defines when a policy shall be executed. */
export enum ApplyPolicy {
  /** After the resolver was executed. */
  AfterResolver = 'AFTER_RESOLVER',
  /** Before the resolver was executed. */
  BeforeResolver = 'BEFORE_RESOLVER',
  /** The policy is applied in the validation step before the execution. */
  Validation = 'VALIDATION'
}

export type Basket = {
  __typename?: 'Basket';
  id: Scalars['UUID']['output'];
  products: Array<Product>;
  user: User;
  userId: Scalars['UUID']['output'];
};

export type BasketFilterInput = {
  and?: InputMaybe<Array<BasketFilterInput>>;
  id?: InputMaybe<UuidOperationFilterInput>;
  or?: InputMaybe<Array<BasketFilterInput>>;
  products?: InputMaybe<ListFilterInputTypeOfProductFilterInput>;
  user?: InputMaybe<UserFilterInput>;
  userId?: InputMaybe<UuidOperationFilterInput>;
};

export type BooleanOperationFilterInput = {
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  neq?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CreateProductInput = {
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
};

export type DateTimeOperationFilterInput = {
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  neq?: InputMaybe<Scalars['DateTime']['input']>;
  ngt?: InputMaybe<Scalars['DateTime']['input']>;
  ngte?: InputMaybe<Scalars['DateTime']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  nlt?: InputMaybe<Scalars['DateTime']['input']>;
  nlte?: InputMaybe<Scalars['DateTime']['input']>;
};

export type FloatOperationFilterInput = {
  eq?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  neq?: InputMaybe<Scalars['Float']['input']>;
  ngt?: InputMaybe<Scalars['Float']['input']>;
  ngte?: InputMaybe<Scalars['Float']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  nlt?: InputMaybe<Scalars['Float']['input']>;
  nlte?: InputMaybe<Scalars['Float']['input']>;
};

export type IntOperationFilterInput = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  neq?: InputMaybe<Scalars['Int']['input']>;
  ngt?: InputMaybe<Scalars['Int']['input']>;
  ngte?: InputMaybe<Scalars['Int']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  nlt?: InputMaybe<Scalars['Int']['input']>;
  nlte?: InputMaybe<Scalars['Int']['input']>;
};

export type ListFilterInputTypeOfBasketFilterInput = {
  all?: InputMaybe<BasketFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<BasketFilterInput>;
  some?: InputMaybe<BasketFilterInput>;
};

export type ListFilterInputTypeOfProductFilterInput = {
  all?: InputMaybe<ProductFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<ProductFilterInput>;
  some?: InputMaybe<ProductFilterInput>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addToBasket: Scalars['Boolean']['output'];
  clearBasket: Scalars['Int']['output'];
  createProduct: Scalars['UUID']['output'];
  deleteProduct: Scalars['Int']['output'];
  removeFromBasket: Scalars['Boolean']['output'];
  updateProduct: Scalars['Int']['output'];
};


export type MutationAddToBasketArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationCreateProductArgs = {
  input: CreateProductInput;
};


export type MutationDeleteProductArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationRemoveFromBasketArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationUpdateProductArgs = {
  input: UpdateProductInput;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** Indicates whether more edges exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean']['output'];
  /** Indicates whether more edges exist prior the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Product = {
  __typename?: 'Product';
  baskets: Array<Basket>;
  id: Scalars['UUID']['output'];
  imageUrl: Scalars['String']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  rate: Scalars['Int']['output'];
  state: State;
};

export type ProductFilterInput = {
  and?: InputMaybe<Array<ProductFilterInput>>;
  baskets?: InputMaybe<ListFilterInputTypeOfBasketFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  imageUrl?: InputMaybe<StringOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<ProductFilterInput>>;
  price?: InputMaybe<FloatOperationFilterInput>;
  rate?: InputMaybe<IntOperationFilterInput>;
  state?: InputMaybe<StateOperationFilterInput>;
};

/** A connection to a list of items. */
export type ProductsConnection = {
  __typename?: 'ProductsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ProductsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Product>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type ProductsEdge = {
  __typename?: 'ProductsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Product;
};

export type Query = {
  __typename?: 'Query';
  isAdmin: Scalars['Boolean']['output'];
  productById?: Maybe<Product>;
  productCount: Scalars['Int']['output'];
  products?: Maybe<ProductsConnection>;
  user: Array<User>;
};


export type QueryProductByIdArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryProductsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ProductFilterInput>;
};

export enum State {
  Finished = 'FINISHED',
  Started = 'STARTED'
}

export type StateOperationFilterInput = {
  eq?: InputMaybe<State>;
  in?: InputMaybe<Array<State>>;
  neq?: InputMaybe<State>;
  nin?: InputMaybe<Array<State>>;
};

export type StringOperationFilterInput = {
  and?: InputMaybe<Array<StringOperationFilterInput>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ncontains?: InputMaybe<Scalars['String']['input']>;
  nendsWith?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  nstartsWith?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<StringOperationFilterInput>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProductInput = {
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
};

export type User = {
  __typename?: 'User';
  accessFailedCount: Scalars['Int']['output'];
  basket?: Maybe<Basket>;
  concurrencyStamp?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  emailConfirmed: Scalars['Boolean']['output'];
  id: Scalars['UUID']['output'];
  lockoutEnabled: Scalars['Boolean']['output'];
  lockoutEnd?: Maybe<Scalars['DateTime']['output']>;
  normalizedEmail?: Maybe<Scalars['String']['output']>;
  normalizedUserName?: Maybe<Scalars['String']['output']>;
  passwordHash?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  phoneNumberConfirmed: Scalars['Boolean']['output'];
  securityStamp?: Maybe<Scalars['String']['output']>;
  twoFactorEnabled: Scalars['Boolean']['output'];
  userName?: Maybe<Scalars['String']['output']>;
};

export type UserFilterInput = {
  accessFailedCount?: InputMaybe<IntOperationFilterInput>;
  and?: InputMaybe<Array<UserFilterInput>>;
  basket?: InputMaybe<BasketFilterInput>;
  concurrencyStamp?: InputMaybe<StringOperationFilterInput>;
  email?: InputMaybe<StringOperationFilterInput>;
  emailConfirmed?: InputMaybe<BooleanOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  lockoutEnabled?: InputMaybe<BooleanOperationFilterInput>;
  lockoutEnd?: InputMaybe<DateTimeOperationFilterInput>;
  normalizedEmail?: InputMaybe<StringOperationFilterInput>;
  normalizedUserName?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<UserFilterInput>>;
  passwordHash?: InputMaybe<StringOperationFilterInput>;
  phoneNumber?: InputMaybe<StringOperationFilterInput>;
  phoneNumberConfirmed?: InputMaybe<BooleanOperationFilterInput>;
  securityStamp?: InputMaybe<StringOperationFilterInput>;
  twoFactorEnabled?: InputMaybe<BooleanOperationFilterInput>;
  userName?: InputMaybe<StringOperationFilterInput>;
};

export type UuidOperationFilterInput = {
  eq?: InputMaybe<Scalars['UUID']['input']>;
  gt?: InputMaybe<Scalars['UUID']['input']>;
  gte?: InputMaybe<Scalars['UUID']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['UUID']['input']>>>;
  lt?: InputMaybe<Scalars['UUID']['input']>;
  lte?: InputMaybe<Scalars['UUID']['input']>;
  neq?: InputMaybe<Scalars['UUID']['input']>;
  ngt?: InputMaybe<Scalars['UUID']['input']>;
  ngte?: InputMaybe<Scalars['UUID']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['UUID']['input']>>>;
  nlt?: InputMaybe<Scalars['UUID']['input']>;
  nlte?: InputMaybe<Scalars['UUID']['input']>;
};

export type CreateProductMutationVariables = Exact<{
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct: any };

export type UpdateProductMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
}>;


export type UpdateProductMutation = { __typename?: 'Mutation', updateProduct: number };

export type DeleteProductMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type DeleteProductMutation = { __typename?: 'Mutation', deleteProduct: number };

export type AddToBasketMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type AddToBasketMutation = { __typename?: 'Mutation', addToBasket: boolean };

export type RemoveFromBasketMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveFromBasketMutation = { __typename?: 'Mutation', removeFromBasket: boolean };

export type ClearBasketMutationVariables = Exact<{ [key: string]: never; }>;


export type ClearBasketMutation = { __typename?: 'Mutation', clearBasket: number };

export type GetProductByIdQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetProductByIdQuery = { __typename?: 'Query', productById?: { __typename?: 'Product', name: string, price: number } | null };

export type GetAllProductsQueryVariables = Exact<{
  count: Scalars['Int']['input'];
}>;


export type GetAllProductsQuery = { __typename?: 'Query', totalCount: number, items?: { __typename?: 'ProductsConnection', nodes?: Array<{ __typename?: 'Product', id: any, name: string, price: number }> | null } | null };

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', isAdmin: boolean, userInfo: Array<{ __typename?: 'User', id: any, email?: string | null }> };

export type GetAllProductsFromBasketQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllProductsFromBasketQuery = { __typename?: 'Query', user: Array<{ __typename?: 'User', basket?: { __typename?: 'Basket', products: Array<{ __typename?: 'Product', id: any, name: string, price: number }> } | null }> };

export const CreateProductDocument = gql`
    mutation CreateProduct($name: String!, $price: Float!) {
  createProduct(input: {name: $name, price: $price, imageUrl: ""})
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateProductGQL extends Apollo.Mutation<CreateProductMutation, CreateProductMutationVariables> {
    document = CreateProductDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateProductDocument = gql`
    mutation UpdateProduct($id: UUID!, $name: String!, $price: Float!) {
  updateProduct(input: {id: $id, name: $name, price: $price})
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateProductGQL extends Apollo.Mutation<UpdateProductMutation, UpdateProductMutationVariables> {
    document = UpdateProductDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteProductDocument = gql`
    mutation DeleteProduct($id: UUID!) {
  deleteProduct(id: $id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteProductGQL extends Apollo.Mutation<DeleteProductMutation, DeleteProductMutationVariables> {
    document = DeleteProductDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AddToBasketDocument = gql`
    mutation AddToBasket($id: UUID!) {
  addToBasket(id: $id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AddToBasketGQL extends Apollo.Mutation<AddToBasketMutation, AddToBasketMutationVariables> {
    document = AddToBasketDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RemoveFromBasketDocument = gql`
    mutation RemoveFromBasket($id: UUID!) {
  removeFromBasket(id: $id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RemoveFromBasketGQL extends Apollo.Mutation<RemoveFromBasketMutation, RemoveFromBasketMutationVariables> {
    document = RemoveFromBasketDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ClearBasketDocument = gql`
    mutation ClearBasket {
  clearBasket
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ClearBasketGQL extends Apollo.Mutation<ClearBasketMutation, ClearBasketMutationVariables> {
    document = ClearBasketDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetProductByIdDocument = gql`
    query GetProductById($id: UUID!) {
  productById(id: $id) {
    name
    price
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetProductByIdGQL extends Apollo.Query<GetProductByIdQuery, GetProductByIdQueryVariables> {
    document = GetProductByIdDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetAllProductsDocument = gql`
    query GetAllProducts($count: Int!) {
  items: products(first: $count) {
    nodes {
      id
      name
      price
    }
  }
  totalCount: productCount
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllProductsGQL extends Apollo.Query<GetAllProductsQuery, GetAllProductsQueryVariables> {
    document = GetAllProductsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetUserDocument = gql`
    query GetUser {
  userInfo: user {
    id
    email
  }
  isAdmin
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetUserGQL extends Apollo.Query<GetUserQuery, GetUserQueryVariables> {
    document = GetUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetAllProductsFromBasketDocument = gql`
    query GetAllProductsFromBasket {
  user {
    basket {
      products {
        id
        name
        price
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllProductsFromBasketGQL extends Apollo.Query<GetAllProductsFromBasketQuery, GetAllProductsFromBasketQueryVariables> {
    document = GetAllProductsFromBasketDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }