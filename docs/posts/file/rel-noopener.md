# rel=noopener 安全指引

`target="_blank"` 会在新窗口/标签页中打开链接。默认情况下，新窗口可以通过 `window.opener` 获取到原窗口的引用并进行操作（如重定向、注入脚本、窃取数据等）。为避免此类安全风险，应为外链添加 `rel="noopener"`。

## 为什么需要 noopener
- 防止新页面通过 `window.opener` 操控原页面（tabnabbing 攻击）。
- 提升安全性，避免潜在的钓鱼或恶意脚本注入。

## 正确用法
- HTML：
```html
<!-- 不安全：缺少 rel="noopener" -->
<a href="https://example.com" target="_blank">打开外链</a>

<!-- 推荐：添加 noopener（可同时添加 noreferrer） -->
<a href="https://example.com" target="_blank" rel="noopener">打开外链</a>
<a href="https://example.com" target="_blank" rel="noopener noreferrer">打开外链</a>
```

- JavaScript：
```js
// 推荐：使用第三个参数 features 指定 noopener
window.open('https://example.com', '_blank', 'noopener');

// 或者在打开后立即清除 opener（兼容旧浏览器）
const w = window.open('https://example.com', '_blank');
if (w) {
  w.opener = null;
}
```

## noopener 与 noreferrer 的区别
- `noopener`：阻止新页面获取到 `window.opener` 引用。
- `noreferrer`：在阻止 `opener` 的同时，还会移除 `Referer` 请求头，隐私更强，但可能影响到上游站点的统计与分析。

## 最佳实践
- 所有外链且使用 `target="_blank"` 的链接一律添加 `rel="noopener"`。
- 如对隐私有额外要求，可叠加 `noreferrer`：`rel="noopener noreferrer"`。
- 业务中如需在新窗口打开内部页面，也建议统一添加 `noopener`，保持一致的安全策略。

## 参考
- MDN: https://developer.mozilla.org/docs/Web/HTML/Element/a#security_and_privacy_concerns
- web.dev: https://web.dev/external-anchors-use-rel-noopener/