export const environment = {
  production: true,
  uri: `${window.location.protocol}//api.foggle.io/api`,
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
    authority: 'https://accounts.google.com',
    client_id: '510656710354-hbnunafcifiihhqevemqiu2tadhrl11u.apps.googleusercontent.com',
    redirect_uri: `${window.location.origin}/callback`,
    scope: 'openid profile email',
    signingKeys: undefined,
    post_logout_redirect_uri: window.location.origin,
  },
};
