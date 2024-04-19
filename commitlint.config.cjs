// type(scope?): subject
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [1, 'always'],
    'footer-leading-blank': [1, 'always'],
    'header-max-length': [2, 'always', 108],
    // 类型
    'type-empty': [2, 'never'],
    // 模块
    'scope-empty': [2, 'never'],
    // 描述
    'subject-empty': [2, 'never'],
    // 类型必须
    'type-enum': [
      2,
      'always',
      [
        'env',
        'ci',
        'merge',
        'test',
        'feat',
        'fix',
        'perf',
        'style',
        'docs',
        'test',
        'refactor',
        'build',
        'ci',
        'chore',
        'revert',
        'wip',
        'workflow',
        'types',
        'release'
      ]
    ]
  }
}
