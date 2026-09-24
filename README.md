# EDMA 产品官网

[edma.wanghuanlab.com](https://edma.wanghuanlab.com) 是 EDMA（Enterprise Digital Management Applications）的产品官网与规划站点。站点说明 1 个数字化平台、5 个业务套件和 23 个可独立上线的业务应用，并提供产品详情与预约演示。

当前线上视觉为 Ledger（冷灰纸面、等宽产品代码、森林绿强调色）。另外两套视觉保留在设计分支：`design/v1-folio`、`design/v2-press`。

## 本地开发

```bash
npm ci
npm run dev
```

```bash
npm run build
npm run preview
```

开发服务器默认地址为 `http://localhost:5173`。

## 路由

| 路径 | 页面 |
| --- | --- |
| `/` | 首页，产品目录锚点为 `#catalog` |
| `/products` | 重定向到 `/#catalog` |
| `/products/:slug` | 产品详情，例如 `/products/mes` |
| `/demo` | 预约演示 |

页面标题在路由切换后更新。产品数据在 `src/data/products.js`，规划说明在 `docs/product-portfolio-roadmap.md`。渠道管理代码为 DMS，文档管理代码为 EDMS。

## 部署

站点由 1Panel 管理，通过 SSH 发布静态文件。主机为 `root@wanghuanlab.com`，站点目录为：

```text
/opt/1panel/www/sites/edma.wanghuanlab.com/index
```

OpenResty 容器内对应根目录为 `/www/sites/edma.wanghuanlab.com/index`。站点已启用 HTTPS，HTTP 会跳转到 HTTPS。前端使用 History 路由，站点配置需要：

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

发布步骤：

```bash
npm ci
npm run build
ssh root@wanghuanlab.com 'stamp=$(date +%Y%m%d%H%M%S); mkdir -p /opt/1panel/backups/edma.wanghuanlab.com; cp -a /opt/1panel/www/sites/edma.wanghuanlab.com/index /opt/1panel/backups/edma.wanghuanlab.com/index.$stamp'
rsync -az --delete dist/ root@wanghuanlab.com:/opt/1panel/www/sites/edma.wanghuanlab.com/index/
```

发布前保留一份带时间戳的站点目录备份。`rsync --delete` 只作用于站点 `index` 目录，不会改动证书、日志和 OpenResty 配置。静态文件更新后不需要重启 OpenResty。
