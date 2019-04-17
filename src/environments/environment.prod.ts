export const environment = {
  production: true,
  uri: '',
  openIdConfiguration: {
    authority: 'https://demo.identityserver.io',
    client_id: 'implicit',
    redirect_uri: `${window.location.origin}/callback`,
    scope: 'openid profile email',
    signingKeys: undefined,
    post_logout_redirect_uri: window.location.origin,
  },
};
