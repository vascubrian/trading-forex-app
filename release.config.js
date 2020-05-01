module.exports = {
  branch: 'master',
  repositoryUrl: 'https://github.com/tashobya/wekebere-dashboard-frontend.git',
  // eslint-disable-next-line no-template-curly-in-string
  tagFormat: '${version}',
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator'
  ]
};
