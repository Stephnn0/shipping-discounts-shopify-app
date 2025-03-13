/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import type * as AdminTypes from './admin.types';

export type ShopInfoQueryVariables = AdminTypes.Exact<{
  appURLMetafieldKey: AdminTypes.Scalars['String']['input'];
  appENVMetafieldNamespace: AdminTypes.Scalars['String']['input'];
}>;


export type ShopInfoQuery = { shop: (
    Pick<AdminTypes.Shop, 'ianaTimezone'>
    & { plan: Pick<AdminTypes.ShopPlan, 'displayName' | 'partnerDevelopment' | 'shopifyPlus'>, appURLMetafield?: AdminTypes.Maybe<(
      Pick<AdminTypes.Metafield, 'key' | 'namespace' | 'value'>
      & { definition?: AdminTypes.Maybe<{ access: Pick<AdminTypes.MetafieldAccess, 'admin' | 'customerAccount' | 'storefront'> }> }
    )> }
  ), checkoutProfiles: { nodes: Array<Pick<AdminTypes.CheckoutProfile, 'id'>> }, app?: AdminTypes.Maybe<Pick<AdminTypes.App, 'id'>>, currentAppInstallation: { activeSubscriptions: Array<Pick<AdminTypes.AppSubscription, 'id' | 'trialDays' | 'name' | 'status'>> } };

export type DiscountCodeAppCreateMutationVariables = AdminTypes.Exact<{
  functionId: AdminTypes.Scalars['String']['input'];
  title: AdminTypes.Scalars['String']['input'];
  startsAt: AdminTypes.Scalars['DateTime']['input'];
  code: AdminTypes.Scalars['String']['input'];
  metafields: Array<AdminTypes.MetafieldInput> | AdminTypes.MetafieldInput;
}>;


export type DiscountCodeAppCreateMutation = { discountCodeAppCreate?: AdminTypes.Maybe<{ codeAppDiscount?: AdminTypes.Maybe<Pick<AdminTypes.DiscountCodeApp, 'discountId'>>, userErrors: Array<Pick<AdminTypes.DiscountUserError, 'message'>> }> };

interface GeneratedQueryTypes {
  "#graphql\n  query ShopInfo($appURLMetafieldKey: String!, $appENVMetafieldNamespace: String!) {\n    shop {\n      plan {\n        displayName\n        partnerDevelopment\n        shopifyPlus\n      }\n      ianaTimezone\n      appURLMetafield: metafield(key: $appURLMetafieldKey, namespace: $appENVMetafieldNamespace) {\n        key\n        namespace\n        value\n        definition {\n          access {\n            admin\n            customerAccount\n            storefront\n          }\n        }\n      }\n    }\n    checkoutProfiles(first: 1, query: \"is_published:true\") {\n      nodes {\n        id\n      }\n    }\n    app {\n      id\n    }\n    currentAppInstallation {\n      activeSubscriptions {\n        id\n        trialDays\n        name\n        status\n      }\n    }\n  }\n": {return: ShopInfoQuery, variables: ShopInfoQueryVariables},
}

interface GeneratedMutationTypes {
  "#graphql\n  mutation discountCodeAppCreate(\n   $functionId: String!\n   $title: String!\n   $startsAt: DateTime!\n   $code: String!\n   $metafields: [MetafieldInput!]!\n  ) {\n    discountCodeAppCreate(\n      codeAppDiscount: {\n        functionId: $functionId\n        title: $title\n        startsAt: $startsAt\n        code: $code\n        metafields: $metafields\n      }\n    ) {\n      codeAppDiscount {\n        discountId\n      }\n      userErrors {\n        message\n      }\n    }\n  }\n": {return: DiscountCodeAppCreateMutation, variables: DiscountCodeAppCreateMutationVariables},
}
declare module '@shopify/admin-api-client' {
  type InputMaybe<T> = AdminTypes.InputMaybe<T>;
  interface AdminQueries extends GeneratedQueryTypes {}
  interface AdminMutations extends GeneratedMutationTypes {}
}
