export const MOCK_DATA = {
  AUDITS: [
    {
      message: `My Awesome Feature Toggle was updated`,
      timestamp: new Date(2019, 0, 17).getTime(),
      user: 'Juan Gordon',
    },
    {
      message: `My Awesome Feature Toggle was created`,
      timestamp: new Date(2019, 0, 15).getTime(),
      user: 'Juan Gordon',
    },
  ],
  FEATURE_TOGGLES: [
    {
      archived: true,
      createdAt: new Date(2019, 0, 15).getTime(),
      environments: [],
      key: 'my-awesome-feature-toggle',
      name: 'My Awesome Feature Toggle',
      updatedAt: new Date(2019, 0, 17).getTime(),
      user: 'Juan Gordon',
    },
  ],
  USER: {
    name: 'Juan Gordon',
    email: 'juan.gordon@example.com',
  },
};
