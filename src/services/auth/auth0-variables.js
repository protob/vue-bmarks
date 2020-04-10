export default {
  clientId: process.env.VUE_APP_CLIENT_ID,
  domain: process.env.VUE_APP_DOMAIN,
  callbackUrl: process.env.VUE_APP_ALLOWED_CALLBACK_URL,
  responseType: 'token id_token code',
  scope: 'openid profile email'
}

// export const client = new ApolloClient({
//   uri: "GraphQL server url endpoint",
//   headers: {
//     Authorization: `Bearer ${ACCESS_TOKEN}`,
//   }
// });
