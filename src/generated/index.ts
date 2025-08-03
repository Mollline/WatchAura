// @ts-nocheck
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactHoc from '@apollo/client/react/hoc';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CreateNoteInput = {
  completed?: InputMaybe<Scalars['Boolean']['input']>;
  title: Scalars['String']['input'];
};

export type CreateOrderInput = {
  deliveryPlace: Scalars['String']['input'];
  items: Array<OrderItemInput>;
  phoneNumber: Scalars['String']['input'];
  totalPrice: Scalars['Float']['input'];
};

export type CreateWatchInput = {
  adImage: Array<Scalars['String']['input']>;
  brand: Scalars['String']['input'];
  discountPercent?: InputMaybe<Scalars['Float']['input']>;
  image: Scalars['String']['input'];
  onSale?: InputMaybe<Scalars['Boolean']['input']>;
  price: Scalars['Float']['input'];
  quantity: Scalars['Int']['input'];
  saleEndsAt?: InputMaybe<Scalars['String']['input']>;
  type: Scalars['String']['input'];
};

export type EditNoteInput = {
  completed: Scalars['Boolean']['input'];
  id: Scalars['ID']['input'];
  title: Scalars['String']['input'];
};

export type EditOrderInput = {
  deliveryPlace?: InputMaybe<Scalars['String']['input']>;
  items?: InputMaybe<Array<OrderItemInput>>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  totalPrice?: InputMaybe<Scalars['Float']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createNote?: Maybe<Note>;
  createOrder?: Maybe<Order>;
  createWatch?: Maybe<Watch>;
  deleteNote?: Maybe<Note>;
  deleteOrder?: Maybe<Order>;
  deleteWatch?: Maybe<Watch>;
  editNote?: Maybe<Note>;
  editOrder?: Maybe<Order>;
  updateWatch?: Maybe<Watch>;
};


export type MutationCreateNoteArgs = {
  input: CreateNoteInput;
};


export type MutationCreateOrderArgs = {
  input: CreateOrderInput;
};


export type MutationCreateWatchArgs = {
  input: CreateWatchInput;
};


export type MutationDeleteNoteArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteOrderArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteWatchArgs = {
  id: Scalars['ID']['input'];
};


export type MutationEditNoteArgs = {
  input: EditNoteInput;
};


export type MutationEditOrderArgs = {
  id: Scalars['ID']['input'];
  input: EditOrderInput;
};


export type MutationUpdateWatchArgs = {
  input: UpdateWatchInput;
};

export type Note = {
  __typename?: 'Note';
  completed: Scalars['Boolean']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
};

export type Order = {
  __typename?: 'Order';
  createdAt: Scalars['String']['output'];
  deliveryPlace: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  items: Array<OrderItem>;
  phoneNumber: Scalars['String']['output'];
  totalPrice: Scalars['Float']['output'];
};

export type OrderItem = {
  __typename?: 'OrderItem';
  quantity: Scalars['Int']['output'];
  watch: Scalars['String']['output'];
};

export type OrderItemInput = {
  quantity: Scalars['Int']['input'];
  watch: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  getAllNotes?: Maybe<Array<Maybe<Note>>>;
  getAllOrders?: Maybe<Array<Maybe<Order>>>;
  getAllWatches?: Maybe<Array<Maybe<Watch>>>;
  getOrderById?: Maybe<Order>;
  getWatch?: Maybe<Watch>;
};


export type QueryGetOrderByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetWatchArgs = {
  id: Scalars['ID']['input'];
};

export type UpdateWatchInput = {
  adImage?: InputMaybe<Array<Scalars['String']['input']>>;
  brand?: InputMaybe<Scalars['String']['input']>;
  discountPercent?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['ID']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  onSale?: InputMaybe<Scalars['Boolean']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  saleEndsAt?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type Watch = {
  __typename?: 'Watch';
  adImage: Array<Scalars['String']['output']>;
  brand: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  discountPercent: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  image: Scalars['String']['output'];
  onSale: Scalars['Boolean']['output'];
  price: Scalars['Float']['output'];
  quantity: Scalars['Int']['output'];
  saleEndsAt?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
};

export type GetAllOrdersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllOrdersQuery = { __typename?: 'Query', getAllOrders?: Array<{ __typename?: 'Order', id: string, deliveryPlace: string, phoneNumber: string, totalPrice: number, createdAt: string, items: Array<{ __typename?: 'OrderItem', quantity: number, watch: string }> } | null> | null };

export type GetOrderByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetOrderByIdQuery = { __typename?: 'Query', getOrderById?: { __typename?: 'Order', id: string, deliveryPlace: string, phoneNumber: string, totalPrice: number, createdAt: string, items: Array<{ __typename?: 'OrderItem', quantity: number, watch: string }> } | null };

export type CreateOrderMutationVariables = Exact<{
  input: CreateOrderInput;
}>;


export type CreateOrderMutation = { __typename?: 'Mutation', createOrder?: { __typename?: 'Order', id: string, deliveryPlace: string, phoneNumber: string, totalPrice: number, createdAt: string, items: Array<{ __typename?: 'OrderItem', quantity: number, watch: string }> } | null };

export type EditOrderMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: EditOrderInput;
}>;


export type EditOrderMutation = { __typename?: 'Mutation', editOrder?: { __typename?: 'Order', id: string, deliveryPlace: string, phoneNumber: string, totalPrice: number, items: Array<{ __typename?: 'OrderItem', quantity: number, watch: string }> } | null };

export type DeleteOrderMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteOrderMutation = { __typename?: 'Mutation', deleteOrder?: { __typename?: 'Order', id: string } | null };

export type GetAllWatchesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllWatchesQuery = { __typename?: 'Query', getAllWatches?: Array<{ __typename?: 'Watch', id: string, brand: string, type: string, image: string, price: number, onSale: boolean, discountPercent: number, saleEndsAt?: string | null, quantity: number } | null> | null };

export type GetWatchQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetWatchQuery = { __typename?: 'Query', getWatch?: { __typename?: 'Watch', id: string, brand: string, type: string, image: string, price: number, onSale: boolean, discountPercent: number, saleEndsAt?: string | null, quantity: number } | null };

export type CreateWatchMutationVariables = Exact<{
  input: CreateWatchInput;
}>;


export type CreateWatchMutation = { __typename?: 'Mutation', createWatch?: { __typename?: 'Watch', id: string, brand: string, type: string, image: string, price: number, onSale: boolean, discountPercent: number, saleEndsAt?: string | null, quantity: number } | null };

export type UpdateWatchMutationVariables = Exact<{
  input: UpdateWatchInput;
}>;


export type UpdateWatchMutation = { __typename?: 'Mutation', updateWatch?: { __typename?: 'Watch', id: string, brand: string, type: string, image: string, price: number, onSale: boolean, discountPercent: number, saleEndsAt?: string | null, quantity: number } | null };

export type DeleteWatchMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteWatchMutation = { __typename?: 'Mutation', deleteWatch?: { __typename?: 'Watch', id: string } | null };

export type GetAllNotesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllNotesQuery = { __typename?: 'Query', getAllNotes?: Array<{ __typename?: 'Note', id: string, title: string, completed: boolean, createdAt: string } | null> | null };


export const GetAllOrdersDocument = gql`
    query GetAllOrders {
  getAllOrders {
    id
    deliveryPlace
    phoneNumber
    totalPrice
    createdAt
    items {
      quantity
      watch
    }
  }
}
    `;
export type GetAllOrdersProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetAllOrdersQuery, GetAllOrdersQueryVariables>
    } & TChildProps;
export function withGetAllOrders<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetAllOrdersQuery,
  GetAllOrdersQueryVariables,
  GetAllOrdersProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetAllOrdersQuery, GetAllOrdersQueryVariables, GetAllOrdersProps<TChildProps, TDataName>>(GetAllOrdersDocument, {
      alias: 'getAllOrders',
      ...operationOptions
    });
};

/**
 * __useGetAllOrdersQuery__
 *
 * To run a query within a React component, call `useGetAllOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllOrdersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllOrdersQuery(baseOptions?: Apollo.QueryHookOptions<GetAllOrdersQuery, GetAllOrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllOrdersQuery, GetAllOrdersQueryVariables>(GetAllOrdersDocument, options);
      }
export function useGetAllOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllOrdersQuery, GetAllOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllOrdersQuery, GetAllOrdersQueryVariables>(GetAllOrdersDocument, options);
        }
export function useGetAllOrdersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllOrdersQuery, GetAllOrdersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllOrdersQuery, GetAllOrdersQueryVariables>(GetAllOrdersDocument, options);
        }
export type GetAllOrdersQueryHookResult = ReturnType<typeof useGetAllOrdersQuery>;
export type GetAllOrdersLazyQueryHookResult = ReturnType<typeof useGetAllOrdersLazyQuery>;
export type GetAllOrdersSuspenseQueryHookResult = ReturnType<typeof useGetAllOrdersSuspenseQuery>;
export type GetAllOrdersQueryResult = Apollo.QueryResult<GetAllOrdersQuery, GetAllOrdersQueryVariables>;
export const GetOrderByIdDocument = gql`
    query GetOrderById($id: ID!) {
  getOrderById(id: $id) {
    id
    deliveryPlace
    phoneNumber
    totalPrice
    createdAt
    items {
      quantity
      watch
    }
  }
}
    `;
export type GetOrderByIdProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetOrderByIdQuery, GetOrderByIdQueryVariables>
    } & TChildProps;
export function withGetOrderById<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetOrderByIdQuery,
  GetOrderByIdQueryVariables,
  GetOrderByIdProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetOrderByIdQuery, GetOrderByIdQueryVariables, GetOrderByIdProps<TChildProps, TDataName>>(GetOrderByIdDocument, {
      alias: 'getOrderById',
      ...operationOptions
    });
};

/**
 * __useGetOrderByIdQuery__
 *
 * To run a query within a React component, call `useGetOrderByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrderByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrderByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetOrderByIdQuery(baseOptions: Apollo.QueryHookOptions<GetOrderByIdQuery, GetOrderByIdQueryVariables> & ({ variables: GetOrderByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrderByIdQuery, GetOrderByIdQueryVariables>(GetOrderByIdDocument, options);
      }
export function useGetOrderByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrderByIdQuery, GetOrderByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrderByIdQuery, GetOrderByIdQueryVariables>(GetOrderByIdDocument, options);
        }
export function useGetOrderByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetOrderByIdQuery, GetOrderByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetOrderByIdQuery, GetOrderByIdQueryVariables>(GetOrderByIdDocument, options);
        }
export type GetOrderByIdQueryHookResult = ReturnType<typeof useGetOrderByIdQuery>;
export type GetOrderByIdLazyQueryHookResult = ReturnType<typeof useGetOrderByIdLazyQuery>;
export type GetOrderByIdSuspenseQueryHookResult = ReturnType<typeof useGetOrderByIdSuspenseQuery>;
export type GetOrderByIdQueryResult = Apollo.QueryResult<GetOrderByIdQuery, GetOrderByIdQueryVariables>;
export const CreateOrderDocument = gql`
    mutation CreateOrder($input: CreateOrderInput!) {
  createOrder(input: $input) {
    id
    deliveryPlace
    phoneNumber
    totalPrice
    createdAt
    items {
      quantity
      watch
    }
  }
}
    `;
export type CreateOrderMutationFn = Apollo.MutationFunction<CreateOrderMutation, CreateOrderMutationVariables>;
export type CreateOrderProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<CreateOrderMutation, CreateOrderMutationVariables>
    } & TChildProps;
export function withCreateOrder<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateOrderMutation,
  CreateOrderMutationVariables,
  CreateOrderProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, CreateOrderMutation, CreateOrderMutationVariables, CreateOrderProps<TChildProps, TDataName>>(CreateOrderDocument, {
      alias: 'createOrder',
      ...operationOptions
    });
};

/**
 * __useCreateOrderMutation__
 *
 * To run a mutation, you first call `useCreateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderMutation, { data, loading, error }] = useCreateOrderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOrderMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrderMutation, CreateOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrderMutation, CreateOrderMutationVariables>(CreateOrderDocument, options);
      }
export type CreateOrderMutationHookResult = ReturnType<typeof useCreateOrderMutation>;
export type CreateOrderMutationResult = Apollo.MutationResult<CreateOrderMutation>;
export type CreateOrderMutationOptions = Apollo.BaseMutationOptions<CreateOrderMutation, CreateOrderMutationVariables>;
export const EditOrderDocument = gql`
    mutation EditOrder($id: ID!, $input: EditOrderInput!) {
  editOrder(id: $id, input: $input) {
    id
    deliveryPlace
    phoneNumber
    totalPrice
    items {
      quantity
      watch
    }
  }
}
    `;
export type EditOrderMutationFn = Apollo.MutationFunction<EditOrderMutation, EditOrderMutationVariables>;
export type EditOrderProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<EditOrderMutation, EditOrderMutationVariables>
    } & TChildProps;
export function withEditOrder<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  EditOrderMutation,
  EditOrderMutationVariables,
  EditOrderProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, EditOrderMutation, EditOrderMutationVariables, EditOrderProps<TChildProps, TDataName>>(EditOrderDocument, {
      alias: 'editOrder',
      ...operationOptions
    });
};

/**
 * __useEditOrderMutation__
 *
 * To run a mutation, you first call `useEditOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editOrderMutation, { data, loading, error }] = useEditOrderMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditOrderMutation(baseOptions?: Apollo.MutationHookOptions<EditOrderMutation, EditOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditOrderMutation, EditOrderMutationVariables>(EditOrderDocument, options);
      }
export type EditOrderMutationHookResult = ReturnType<typeof useEditOrderMutation>;
export type EditOrderMutationResult = Apollo.MutationResult<EditOrderMutation>;
export type EditOrderMutationOptions = Apollo.BaseMutationOptions<EditOrderMutation, EditOrderMutationVariables>;
export const DeleteOrderDocument = gql`
    mutation DeleteOrder($id: ID!) {
  deleteOrder(id: $id) {
    id
  }
}
    `;
export type DeleteOrderMutationFn = Apollo.MutationFunction<DeleteOrderMutation, DeleteOrderMutationVariables>;
export type DeleteOrderProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<DeleteOrderMutation, DeleteOrderMutationVariables>
    } & TChildProps;
export function withDeleteOrder<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DeleteOrderMutation,
  DeleteOrderMutationVariables,
  DeleteOrderProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, DeleteOrderMutation, DeleteOrderMutationVariables, DeleteOrderProps<TChildProps, TDataName>>(DeleteOrderDocument, {
      alias: 'deleteOrder',
      ...operationOptions
    });
};

/**
 * __useDeleteOrderMutation__
 *
 * To run a mutation, you first call `useDeleteOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteOrderMutation, { data, loading, error }] = useDeleteOrderMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteOrderMutation(baseOptions?: Apollo.MutationHookOptions<DeleteOrderMutation, DeleteOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteOrderMutation, DeleteOrderMutationVariables>(DeleteOrderDocument, options);
      }
export type DeleteOrderMutationHookResult = ReturnType<typeof useDeleteOrderMutation>;
export type DeleteOrderMutationResult = Apollo.MutationResult<DeleteOrderMutation>;
export type DeleteOrderMutationOptions = Apollo.BaseMutationOptions<DeleteOrderMutation, DeleteOrderMutationVariables>;
export const GetAllWatchesDocument = gql`
    query GetAllWatches {
  getAllWatches {
    id
    brand
    type
    image
    price
    onSale
    discountPercent
    saleEndsAt
    quantity
  }
}
    `;
export type GetAllWatchesProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetAllWatchesQuery, GetAllWatchesQueryVariables>
    } & TChildProps;
export function withGetAllWatches<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetAllWatchesQuery,
  GetAllWatchesQueryVariables,
  GetAllWatchesProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetAllWatchesQuery, GetAllWatchesQueryVariables, GetAllWatchesProps<TChildProps, TDataName>>(GetAllWatchesDocument, {
      alias: 'getAllWatches',
      ...operationOptions
    });
};

/**
 * __useGetAllWatchesQuery__
 *
 * To run a query within a React component, call `useGetAllWatchesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllWatchesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllWatchesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllWatchesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllWatchesQuery, GetAllWatchesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllWatchesQuery, GetAllWatchesQueryVariables>(GetAllWatchesDocument, options);
      }
export function useGetAllWatchesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllWatchesQuery, GetAllWatchesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllWatchesQuery, GetAllWatchesQueryVariables>(GetAllWatchesDocument, options);
        }
export function useGetAllWatchesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllWatchesQuery, GetAllWatchesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllWatchesQuery, GetAllWatchesQueryVariables>(GetAllWatchesDocument, options);
        }
export type GetAllWatchesQueryHookResult = ReturnType<typeof useGetAllWatchesQuery>;
export type GetAllWatchesLazyQueryHookResult = ReturnType<typeof useGetAllWatchesLazyQuery>;
export type GetAllWatchesSuspenseQueryHookResult = ReturnType<typeof useGetAllWatchesSuspenseQuery>;
export type GetAllWatchesQueryResult = Apollo.QueryResult<GetAllWatchesQuery, GetAllWatchesQueryVariables>;
export const GetWatchDocument = gql`
    query GetWatch($id: ID!) {
  getWatch(id: $id) {
    id
    brand
    type
    image
    price
    onSale
    discountPercent
    saleEndsAt
    quantity
  }
}
    `;
export type GetWatchProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetWatchQuery, GetWatchQueryVariables>
    } & TChildProps;
export function withGetWatch<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetWatchQuery,
  GetWatchQueryVariables,
  GetWatchProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetWatchQuery, GetWatchQueryVariables, GetWatchProps<TChildProps, TDataName>>(GetWatchDocument, {
      alias: 'getWatch',
      ...operationOptions
    });
};

/**
 * __useGetWatchQuery__
 *
 * To run a query within a React component, call `useGetWatchQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWatchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWatchQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetWatchQuery(baseOptions: Apollo.QueryHookOptions<GetWatchQuery, GetWatchQueryVariables> & ({ variables: GetWatchQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWatchQuery, GetWatchQueryVariables>(GetWatchDocument, options);
      }
export function useGetWatchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWatchQuery, GetWatchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWatchQuery, GetWatchQueryVariables>(GetWatchDocument, options);
        }
export function useGetWatchSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetWatchQuery, GetWatchQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetWatchQuery, GetWatchQueryVariables>(GetWatchDocument, options);
        }
export type GetWatchQueryHookResult = ReturnType<typeof useGetWatchQuery>;
export type GetWatchLazyQueryHookResult = ReturnType<typeof useGetWatchLazyQuery>;
export type GetWatchSuspenseQueryHookResult = ReturnType<typeof useGetWatchSuspenseQuery>;
export type GetWatchQueryResult = Apollo.QueryResult<GetWatchQuery, GetWatchQueryVariables>;
export const CreateWatchDocument = gql`
    mutation CreateWatch($input: CreateWatchInput!) {
  createWatch(input: $input) {
    id
    brand
    type
    image
    price
    onSale
    discountPercent
    saleEndsAt
    quantity
  }
}
    `;
export type CreateWatchMutationFn = Apollo.MutationFunction<CreateWatchMutation, CreateWatchMutationVariables>;
export type CreateWatchProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<CreateWatchMutation, CreateWatchMutationVariables>
    } & TChildProps;
export function withCreateWatch<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateWatchMutation,
  CreateWatchMutationVariables,
  CreateWatchProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, CreateWatchMutation, CreateWatchMutationVariables, CreateWatchProps<TChildProps, TDataName>>(CreateWatchDocument, {
      alias: 'createWatch',
      ...operationOptions
    });
};

/**
 * __useCreateWatchMutation__
 *
 * To run a mutation, you first call `useCreateWatchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWatchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWatchMutation, { data, loading, error }] = useCreateWatchMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateWatchMutation(baseOptions?: Apollo.MutationHookOptions<CreateWatchMutation, CreateWatchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateWatchMutation, CreateWatchMutationVariables>(CreateWatchDocument, options);
      }
export type CreateWatchMutationHookResult = ReturnType<typeof useCreateWatchMutation>;
export type CreateWatchMutationResult = Apollo.MutationResult<CreateWatchMutation>;
export type CreateWatchMutationOptions = Apollo.BaseMutationOptions<CreateWatchMutation, CreateWatchMutationVariables>;
export const UpdateWatchDocument = gql`
    mutation UpdateWatch($input: UpdateWatchInput!) {
  updateWatch(input: $input) {
    id
    brand
    type
    image
    price
    onSale
    discountPercent
    saleEndsAt
    quantity
  }
}
    `;
export type UpdateWatchMutationFn = Apollo.MutationFunction<UpdateWatchMutation, UpdateWatchMutationVariables>;
export type UpdateWatchProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<UpdateWatchMutation, UpdateWatchMutationVariables>
    } & TChildProps;
export function withUpdateWatch<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateWatchMutation,
  UpdateWatchMutationVariables,
  UpdateWatchProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateWatchMutation, UpdateWatchMutationVariables, UpdateWatchProps<TChildProps, TDataName>>(UpdateWatchDocument, {
      alias: 'updateWatch',
      ...operationOptions
    });
};

/**
 * __useUpdateWatchMutation__
 *
 * To run a mutation, you first call `useUpdateWatchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWatchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateWatchMutation, { data, loading, error }] = useUpdateWatchMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateWatchMutation(baseOptions?: Apollo.MutationHookOptions<UpdateWatchMutation, UpdateWatchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateWatchMutation, UpdateWatchMutationVariables>(UpdateWatchDocument, options);
      }
export type UpdateWatchMutationHookResult = ReturnType<typeof useUpdateWatchMutation>;
export type UpdateWatchMutationResult = Apollo.MutationResult<UpdateWatchMutation>;
export type UpdateWatchMutationOptions = Apollo.BaseMutationOptions<UpdateWatchMutation, UpdateWatchMutationVariables>;
export const DeleteWatchDocument = gql`
    mutation DeleteWatch($id: ID!) {
  deleteWatch(id: $id) {
    id
  }
}
    `;
export type DeleteWatchMutationFn = Apollo.MutationFunction<DeleteWatchMutation, DeleteWatchMutationVariables>;
export type DeleteWatchProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<DeleteWatchMutation, DeleteWatchMutationVariables>
    } & TChildProps;
export function withDeleteWatch<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DeleteWatchMutation,
  DeleteWatchMutationVariables,
  DeleteWatchProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, DeleteWatchMutation, DeleteWatchMutationVariables, DeleteWatchProps<TChildProps, TDataName>>(DeleteWatchDocument, {
      alias: 'deleteWatch',
      ...operationOptions
    });
};

/**
 * __useDeleteWatchMutation__
 *
 * To run a mutation, you first call `useDeleteWatchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteWatchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteWatchMutation, { data, loading, error }] = useDeleteWatchMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteWatchMutation(baseOptions?: Apollo.MutationHookOptions<DeleteWatchMutation, DeleteWatchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteWatchMutation, DeleteWatchMutationVariables>(DeleteWatchDocument, options);
      }
export type DeleteWatchMutationHookResult = ReturnType<typeof useDeleteWatchMutation>;
export type DeleteWatchMutationResult = Apollo.MutationResult<DeleteWatchMutation>;
export type DeleteWatchMutationOptions = Apollo.BaseMutationOptions<DeleteWatchMutation, DeleteWatchMutationVariables>;
export const GetAllNotesDocument = gql`
    query GetAllNotes {
  getAllNotes {
    id
    title
    completed
    createdAt
  }
}
    `;
export type GetAllNotesProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetAllNotesQuery, GetAllNotesQueryVariables>
    } & TChildProps;
export function withGetAllNotes<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetAllNotesQuery,
  GetAllNotesQueryVariables,
  GetAllNotesProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetAllNotesQuery, GetAllNotesQueryVariables, GetAllNotesProps<TChildProps, TDataName>>(GetAllNotesDocument, {
      alias: 'getAllNotes',
      ...operationOptions
    });
};

/**
 * __useGetAllNotesQuery__
 *
 * To run a query within a React component, call `useGetAllNotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllNotesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllNotesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllNotesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllNotesQuery, GetAllNotesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllNotesQuery, GetAllNotesQueryVariables>(GetAllNotesDocument, options);
      }
export function useGetAllNotesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllNotesQuery, GetAllNotesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllNotesQuery, GetAllNotesQueryVariables>(GetAllNotesDocument, options);
        }
export function useGetAllNotesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllNotesQuery, GetAllNotesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllNotesQuery, GetAllNotesQueryVariables>(GetAllNotesDocument, options);
        }
export type GetAllNotesQueryHookResult = ReturnType<typeof useGetAllNotesQuery>;
export type GetAllNotesLazyQueryHookResult = ReturnType<typeof useGetAllNotesLazyQuery>;
export type GetAllNotesSuspenseQueryHookResult = ReturnType<typeof useGetAllNotesSuspenseQuery>;
export type GetAllNotesQueryResult = Apollo.QueryResult<GetAllNotesQuery, GetAllNotesQueryVariables>;