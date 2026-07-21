import { blogPlugin } from '@vuepress/plugin-blog'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  base: '/notes/',
  lang: 'zh-CN',

  title: 'notes 笔记',
  description: '常记录，常回忆，常思考',
  head: [['link', { rel: 'icon', href: '/notes/favicon.ico' }]],

  theme: defaultTheme({
    logo: '/logo.png',
    search: {
      provider: 'local'
    },
    navbar: [
      {
        text: 'Home',
        link: '/',
      },
      {
        text: 'Article',
        link: '/article/',
      },
      {
        text: 'Category',
        link: '/category/',
      },
      {
        text: 'Tag',
        link: '/tag/',
      },
      {
        text: 'Timeline',
        link: '/timeline/',
      },
    ],
    sidebarDepth: 0,
    sidebar: [
      {
        text: 'nestjs',
        collapsible: true,
        children: [
          { text: 'NestJS介绍', link: '/posts/nestjs/index' },
          { text: 'Nest CLI 常用命令', link: '/posts/nestjs/nestjs-cli-common-commands' },
          { text: 'NestJS 中 Module、Controller 和 Service 的直接关系', link: '/posts/nestjs/nestjs-module-controller-service' },
          { text: 'NestJS 在 Service 之外增加抽象类与 Repository 层', link: '/posts/nestjs/nestjs-service-abstract-repository-layer' },
          { text: 'NestJS 优雅实现环境变量配置与校验', link: '/posts/nestjs/nestjs-env-config' },
          { text: 'NestJS 如何使用 Middleware', link: '/posts/nestjs/nestjs-middleware' },
          { text: 'NestJS 接入 MySQL 数据库', link: '/posts/nestjs/nestjs-database-typeorm' },
          { text: 'NestJS 使用 class-transformer 统一格式化响应字段', link: '/posts/nestjs/nestjs-class-transformer-response-serialization' },
          { text: 'NestJS 使用 class-validator 做字段参数校验', link: '/posts/nestjs/nestjs-class-validator-request-validation' },
          { text: 'NestJS 使用 Interceptor 统一响应', link: '/posts/nestjs/nestjs-interceptor-unified-response' },
          { text: 'NestJS 实现 JWT 登录、令牌刷新与全局路由守卫', link: '/posts/nestjs/nestjs-jwt-login-and-route-guard' },
          { text: 'NestJS 项目如何检查 Node.js 版本', link: '/posts/nestjs/nestjs-nodejs-version-check' },
          { text: 'NestJS 使用 Swagger 生成接口文档', link: '/posts/nestjs/nestjs-swagger-knife4j-api-docs' },
          { text: 'NestJS 接入 Logger，并结合 Exception Filter 记录异常日志', link: '/posts/nestjs/nestjs-logger-exception-filter' },
          { text: 'VSCode REST Client：用 `.http` 文件调试和管理 API', link: '/posts/nestjs/vscode-rest-client' },        ],
      },
      {
        text: 'build',
        collapsible: true,
        children: [
          { text: '环境变量', link: '/posts/build-tool/env' }
        ],
      },
      {
        text: 'browse',
        collapsible: true,
        children: [
          { text: '2fa', link: '/posts/browse/2fa' },
          { text: 'sse', link: '/posts/browse/sse' },
          { text: 'token', link: '/posts/browse/token' }
        ],
      },
      {
        text: 'database',
        collapsible: true,
        children: [
          {
            text: 'mongodb',
            children: [
              { text: 'start', link: '/posts/database/mongodb/index' }
            ]
          },
          {
            text: 'mysql',
            children: [
              { text: 'curd', link: '/posts/database/mysql/curd' },
              { text: '安装', link: '/posts/database/mysql/install' },
              { text: 'join', link: '/posts/database/mysql/join' },
              { text: '多对多', link: '/posts/database/mysql/many-to-many' },
              { text: '性能优化', link: '/posts/database/mysql/performance-optimization' },
              { text: '表设计', link: '/posts/database/mysql/table-design' },
              { text: '常见问题', link: '/posts/database/mysql/trouble' },
            ]
          }
        ],
      },
      {
        text: 'docker',
        collapsible: true,
        children: [
          {
            text: 'github-actions',
            children: [
              { text: 'local', link: '/posts/docker/github-actions/deploy.local' },
              { text: 'prod', link: '/posts/docker/github-actions/deploy.prod' },
            ]
          },
          { text: 'docker-compose', link: '/posts/docker/docker-compose' },
          { text: 'index', link: '/posts/docker/index' },
          { text: 'podman', link: '/posts/docker/podman' },
        ]
      },
      {
        text: 'file',
        collapsible: true,
        children: [
          { text: '文件下载', link: '/posts/file/download-file' },
          { text: '原生 node.js下载文件', link: '/posts/file/native-nodejs-download-file' }
        ]
      },
      {
        text: 'git',
        collapsible: true,
        children: [
          { text: 'index', link: '/posts/git/01' },
          { text: 'multiple-github-accounts', link: '/posts/git/multiple-github-accounts' },
          { text: 'auto-commit', link: '/posts/git/auto-commit' },
          { text: 'pat', link: '/posts/git/pat' },
          { text: 'rebase', link: '/posts/git/rebase' },
        ]
      },
      {
        text: 'linux',
        collapsible: true,
        children: [
          { text: 'grep', link: '/posts/linux/grep' },
          { text: 'index', link: '/posts/linux/index' },
          { text: 'ssh', link: '/posts/linux/ssh' },
          { text: 'vim', link: '/posts/linux/vim' },
          { text: 'windows', link: '/posts/linux/windows' },
        ]
      },
      {
        text: 'network',
        collapsible: true,
        children: [
          { text: 'best-proxy-way', link: '/posts/network/best-proxy-way' },
          { text: 'git-via-https', link: '/posts/network/git-via-https' },
          { text: 'github-push-fail', link: '/posts/network/github-push-fail' },
        ]
      },
      {
        text: 'nginx',
        collapsible: true,
        children: [
          { text: 'acme.sh', link: '/posts/nginx/acme' },
          { text: 'cache', link: '/posts/nginx/cache' },
          { text: 'https', link: '/posts/nginx/https' },
          { text: 'index', link: '/posts/nginx/index' },
          { text: 'safe', link: '/posts/nginx/safe' },
        ]
      },
      {
        text: 'node',
        collapsible: true,
        children: [
          { text: 'fnm', link: '/posts/node/fnm' },
          { text: 'tool', link: '/posts/node/tool' },
        ]
      },
      {
        text: 'obsidian',
        collapsible: true,
        children: [
          { text: 'ish', link: '/posts/obs/ish' },
          { text: 'start', link: '/posts/obs/start' },
        ]
      },
      {
        text: 'react',
        collapsible: true,
        children: [
          { text: 'index', link: '/posts/react/01' },
          { text: 'set-state', link: '/posts/react/set-state' },
        ]
      },
      {
        text: 'summary',
        collapsible: true,
        children: [
          { text: 'index', link: '/posts/summary/index' }
        ]
      },
      {
        text: 'vue',
        collapsible: true,
        children: [
          { text: 'index', link: '/posts/vue/01' },
          { text: 'typescript', link: '/posts/vue/typescript' },
        ]
      },
      { text: 'libs', link: '/posts/libs' },
      { text: 'open-source', link: '/posts/open-source' },
    ]
  }),

  plugins: [
    blogPlugin({
      // Only files under posts are articles
      filter: ({ filePathRelative }) =>
        filePathRelative ? filePathRelative.startsWith('posts/') : false,

      // Getting article info
      getInfo: ({ frontmatter, title, data }) => ({
        title,
        author: frontmatter.author || '',
        date: frontmatter.date || null,
        category: frontmatter.category || [],
        tag: frontmatter.tag || [],
        excerpt:
          // Support manually set excerpt through frontmatter
          typeof frontmatter.excerpt === 'string'
            ? frontmatter.excerpt
            : data?.excerpt || '',
      }),

      // Generate excerpt for all pages excerpt those users choose to disable
      excerptFilter: ({ frontmatter }) =>
        !frontmatter.home &&
        frontmatter.excerpt !== false &&
        typeof frontmatter.excerpt !== 'string',

      category: [
        {
          key: 'category',
          getter: (page) => page.frontmatter.category || [],
          layout: 'Category',
          itemLayout: 'Category',
          frontmatter: () => ({
            title: 'Categories',
            sidebar: false,
          }),
          itemFrontmatter: (name) => ({
            title: `Category ${name}`,
            sidebar: false,
          }),
        },
        {
          key: 'tag',
          getter: (page) => page.frontmatter.tag || [],
          layout: 'Tag',
          itemLayout: 'Tag',
          frontmatter: () => ({
            title: 'Tags',
            sidebar: false,
          }),
          itemFrontmatter: (name) => ({
            title: `Tag ${name}`,
            sidebar: false,
          }),
        },
      ],

      type: [
        {
          key: 'article',
          // Remove archive articles
          filter: (page) => !page.frontmatter.archive,
          layout: 'Article',
          frontmatter: () => ({
            title: 'Articles',
            sidebar: false,
          }),
          // Sort pages with time and sticky
          sorter: (pageA, pageB) => {
            if (pageA.frontmatter.sticky && pageB.frontmatter.sticky)
              return pageB.frontmatter.sticky - pageA.frontmatter.sticky

            if (pageA.frontmatter.sticky && !pageB.frontmatter.sticky) return -1

            if (!pageA.frontmatter.sticky && pageB.frontmatter.sticky) return 1

            if (!pageB.frontmatter.date) return 1
            if (!pageA.frontmatter.date) return -1

            return (
              new Date(pageB.frontmatter.date).getTime() -
              new Date(pageA.frontmatter.date).getTime()
            )
          },
        },
        {
          key: 'timeline',
          // Only article with date should be added to timeline
          filter: (page) => page.frontmatter.date instanceof Date,
          // Sort pages with time
          sorter: (pageA, pageB) =>
            new Date(pageB.frontmatter.date).getTime() -
            new Date(pageA.frontmatter.date).getTime(),
          layout: 'Timeline',
          frontmatter: () => ({
            title: 'Timeline',
            sidebar: false,
          }),
        },
      ],
      hotReload: true,
    }),
  ],

  bundler: viteBundler(),
})
