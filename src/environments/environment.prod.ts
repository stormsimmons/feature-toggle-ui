export const environment = {
  production: true,
  uri: 'https://feature-toggle-nodejs.herokuapp.com',
  featureToggle: {
    defaultEnvironments: [
      ['development', 'Development'],
      ['quality-assurance', 'Quality Assurance'],
      ['user-acceptance-testing', 'User Acceptance Testing'],
      ['staging', 'Staging'],
      ['production', 'Production'],
    ],
  },
  multiTenancy: {
    enabled: true,
  },
  openIdConfiguration: {
    authority: 'https://demo.identityserver.io',
    client_id: 'implicit',
    redirect_uri: `${window.location.origin}/callback`,
    scope: 'openid profile email',
    signingKeys: undefined,
    post_logout_redirect_uri: window.location.origin,
  },
};
