module.exports = {
  branch: 'master',
  repositoryUrl: 'https://github.com/vascubrian/cwg-market.git',
  // eslint-disable-next-line no-template-curly-in-string
  tagFormat: '${version}',
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator'
  ]
};
