module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  collectCoverageFrom: ['!<rootDir>/test/**'],
  coverageDirectory: 'cov',
  moduleNameMapper: {
    '@/test/(.+)': '<rootDir>/test/$1',
    '@/(.+)': '<rootDir>/src/$1',
  },
  roots: ['<rootDir>/src', '<rootDir>/test'],
  transform: {
    '\\.ts$': 'ts-jest',
  },
  clearMocks: true,
  testMatch: ['**/*.(spec|test).ts'],
  maxWorkers: '50%',
};
