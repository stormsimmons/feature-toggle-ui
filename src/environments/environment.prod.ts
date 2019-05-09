export const environment = {
  production: true,
  uri: 'http://localhost:8080/api',
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
    enabled: false,
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
