- [前端部署](#前端部署)
  - [常规做法](#常规做法)
    - [打包文件名 hash 化](#打包文件名-hash-化)
    - [HTML 入口文件防缓存](#html-入口文件防缓存)
    - [被忽略的缓存策略](#被忽略的缓存策略)
  - [精细化 Nginx 缓存策略](#精细化-nginx-缓存策略)
  - [CDN设置](#cdn设置)
- [Reference](#reference)


## 前端部署

### 常规做法

1. index.html 不被缓存，每次访问都是最新的。
2. 最新的 index.html 引用了带新 Hash 的 JS/CSS 文件。
3. 浏览器发现文件名变了，自然会去加载新资源。
4. 用户看到了最新的页面。

#### 打包文件名 hash 化
使用 Webpack Vite 等构建工具，在打包时为 JS、CSS 等静态资源生成独一无二的 Hash 值文件名。

在有内容更新后，Hash 值发生变化，浏览器请求最新文件名避免缓存。

```shell
main.348ae9a.js
runtime.b7b2e9e9.js
vendor.ant-design.5dbb2c6f.js
```

#### HTML 入口文件防缓存
在 index.html 的 `<head>` 部分，加入了禁止缓存的 meta 标签。告诉浏览器："嘿，别缓存我！每次都来服务器拿最新的。"

```html

<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="0">
```

#### 被忽略的缓存策略

浏览器缓存策略的优先级是：**HTTP 响应头（Response Headers）的优先级 > HTML Meta 标签**

meta 标签更像是一种建议，而由服务器（如 Nginx）在 HTTP 响应中返回的 Cache-Control、Expires 等头部信息，才是浏览器必须严格遵守的最高指令。如果 HTTP 响应头没有明确指示不缓存，或者指示了可以缓存，那么浏览器就会愉快地忽略 meta 标签的建议，将 index.html 缓存起来。

Nginx 的默认行为

```nginx
location / {
    try_files $uri $uri/ /index.html;
    # 🔴 致命的遗漏：这里没有任何关于 index.html 的缓存控制指令！
}

```

1. 当浏览器请求 https://yoursite.com/ 时，命中了 location / 规则。
2. Nginx 返回了 index.html 文件，但没有附加任何 Cache-Control 或 Expires 响应头。
3. 浏览器或上游 CDN 看到这个沉默的响应，便启用自己的默认缓存策略，将 index.html 缓存了一段时间。
4. 当你部署新版本后，JS 文件名（例如 main.new-hash.js）虽然变了，但用户再次访问时，浏览器直接从缓存中取出了旧的 index.html。
5. 旧的 HTML 文件依然引用着旧的 JS 文件（main.old-hash.js）。
6. 最终，用户看到的还是旧版本。

### 精细化 Nginx 缓存策略

```nginx
server {
    listen 80;
    server_name your.domain.com; # 替换为你的域名
    root /usr/share/nginx/html; # 替换为你的项目根目录

    # 规则1：HTML 文件 - 永不缓存
    # 这是最关键的一步，确保浏览器总是获取最新的入口文件。
    location = /index.html {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        add_header Pragma "no-cache";
        add_header Expires "0";
    }

    # 规则2：带 Hash 的静态资源 - 永久缓存
    # 文件名中的 Hash 确保了内容变化时文件名也会变化，所以可以放心地让浏览器永久缓存。
    # `immutable` 告诉浏览器这个文件内容永远不会变，连校验请求都无需发送。
    location ~* \.[a-f0-9]{8}\.(css|js)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # 规则3：其他静态资源（如图片、字体） - 长期缓存
    # 这些文件通常不带 Hash，但也不常变动，可以设置一个较长的缓存时间。
    location ~* \.(jpg|jpeg|png|gif|ico|svg|woff|woff2|ttf)$ {
        expires 30d;
        add_header Cache-Control "public";
    }

    # 规则4：单页应用（SPA）路由处理
    # 这是保证 React/Vue 等路由正常工作的关键。
    # 重要的是，它会将所有未匹配到具体文件的请求都交由 index.html 处理。
    # 由于我们已为 /index.html 单独设置了不缓存规则，所以这里是安全的。
    location / {
        try_files $uri $uri/ /index.html;
    }
}

```

- location = /index.html：使用 = 精确匹配 /index.html，并强制其不被任何一方缓存。这是整个策略的核心。
- location ~* \.[a-f0-9]{8}\.(css|js)$：通过正则表达式匹配所有带 8 位 Hash 的 JS 和 CSS 文件，并设置长达一年的缓存（1y）和 immutable 属性，实现最佳性能。
- location /：作为最后的 fallback，处理 SPA 的前端路由，将所有页面导航都指向不缓存的 index.html。

将这份配置应用到你的 nginx.development.conf, nginx.testing.conf, nginx.production.conf, 和 nginx.preview.conf 文件中（根据不同环境微调 expires 时间即可），你将彻底告别缓存带来的烦恼。

### CDN设置
如果应用部署在 CDN 之后，请确保 CDN 的缓存策略与你的 Nginx 配置保持一致。通常需要在 CDN 控制台设置规则，使其遵守源站（Origin）的 Cache-Control 头。

| 文件类型  | 建议 TTL | 是否遵守源站 |
| :----| :----:| :----:|
|   *.html   |   0 秒    |    是   |
|   *.[hash].js   |   31536000 秒 (1年)    |    是   |
|   *.[hash].css  |   31536000 秒 (1年)    |    是   |
|   图片/字体   |   2592000 秒 (30天)    |    是   |

## Reference
- [什么？2025年了发版后还要手动清浏览器缓存？](https://juejin.cn/post/7527977068417957939)
- []()
- []()
