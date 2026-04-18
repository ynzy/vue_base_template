# Vue Base Template 开发文档

> 基于 Vue 3 + TypeScript + Vite 的企业级开发模板

## 📋 项目概述

本项目是一个现代化的 Vue 3 开发模板，集成了常用的开发工具和最佳实践，帮助开发者快速搭建高质量的前端应用。

### 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Vue | 3.4.27 | 渐进式 JavaScript 框架 |
| TypeScript | 5.3.3 | JavaScript 的超集 |
| Vite | 5.2.11 | 下一代前端构建工具 |
| Pinia | 2.1.7 | Vue 官方状态管理库 |
| Vue Router | 4.3.2 | Vue 官方路由管理器 |
| Sass | 1.77.2 | CSS 预处理器 |
| ESLint | 8.57.0 | 代码规范检查 |
| Prettier | 3.2.5 | 代码格式化工具 |

### 核心特性

- ✅ **Vue 3 Script Setup** - 使用 Composition API 和 `<script setup>` 语法
- ✅ **TypeScript 支持** - 完整的类型定义和智能提示
- ✅ **自动导入** - unplugin-auto-import 自动导入 Vue API
- ✅ **组件自动注册** - unplugin-vue-components 自动注册组件
- ✅ **状态管理** - Pinia 轻量级状态管理方案
- ✅ **路由管理** - Vue Router 4 配置化路由
- ✅ **样式方案** - Sass + CSS Modules + 全局样式变量
- ✅ **代码规范** - ESLint + Prettier 统一开发规范
- ✅ **Mock 数据** - vite-plugin-mock 前后端分离开发
- ✅ **多环境变量** - 支持 development/test/production 多环境配置
- ✅ **构建优化** - 代码压缩、Gzip、Tree Shaking

---

## 🚀 快速开始

### 环境要求

- Node.js >= 18.x
- pnpm >= 8.x

### 安装依赖

```bash
# 全局安装 pnpm（如果未安装）
npm i -g pnpm

# 安装项目依赖
pnpm install
```

### 启动开发服务器

```bash
# 启动开发服务器（默认 development 环境）
pnpm dev

# 启动后可访问
# Local:    http://localhost:5173/
# Network:  http://<your-ip>:5173/
```

### 构建生产版本

```bash
# 类型检查 + 构建
pnpm build

# 仅构建
pnpm build-only

# 预览生产构建
pnpm preview
```

### 代码规范

```bash
# ESLint 检查
pnpm lint

# Prettier 格式化
pnpm format
```

---

## 📁 项目结构

```
vue_base_template/
├── build/                      # 构建配置目录
│   ├── utils.ts               # 构建工具函数
│   └── vite/                  # Vite 插件配置
│       ├── build.ts           # 构建配置
│       ├── plugin/            # 插件配置
│       │   ├── index.ts       # 插件入口
│       │   ├── autoImport.ts  # 自动导入配置
│       │   ├── autocomponents.ts  # 组件自动注册
│       │   ├── compress.ts    # 压缩配置
│       │   └── mock.ts        # Mock 配置
│       └── proxy.ts           # 代理配置
├── public/                     # 静态资源目录
├── src/                        # 源代码目录
│   ├── assets/                # 资源文件
│   │   ├── base.css          # 基础样式
│   │   ├── logo.svg          # Logo 文件
│   │   └── main.css          # 主样式
│   ├── components/            # 公共组件
│   │   ├── icons/            # 图标组件
│   │   ├── HelloWorld.vue
│   │   └── TheWelcome.vue
│   ├── router/                # 路由配置
│   │   ├── index.ts          # 路由入口
│   │   └── router.config.ts  # 路由配置文件
│   ├── stores/                # 状态管理
│   │   ├── index.ts          # Store 入口
│   │   └── counter.ts        # Counter Store
│   ├── styles/                # 全局样式
│   │   ├── index.scss        # 样式入口
│   │   ├── mixin.scss        # Mixin 定义
│   │   ├── reset.scss        # 重置样式
│   │   ├── variables.scss    # 变量定义
│   │   └── test.module.scss  # CSS Modules 示例
│   ├── views/                 # 页面组件
│   │   ├── AboutView.vue
│   │   └── HomeView.vue
│   ├── App.vue                # 根组件
│   ├── main.ts                # 入口文件
│   └── env.d.ts               # 环境变量类型定义
├── types/                      # 全局类型定义
│   └── global.d.ts
├── .eslintrc.cjs              # ESLint 配置
├── .prettierrc.js             # Prettier 配置
├── .npmrc                     # npm 配置
├── index.html                 # HTML 模板
├── package.json               # 项目配置
├── pnpm-lock.yaml             # 依赖锁定文件
├── tsconfig.json              # TypeScript 配置
├── tsconfig.app.json          # 应用 TS 配置
├── tsconfig.node.json         # Node TS 配置
└── vite.config.ts             # Vite 配置
```

---

## ⚙️ 配置说明

### 多环境变量

项目支持三种环境配置：

| 文件 | 环境 | 说明 |
|------|------|------|
| `.env.development` | development | 开发环境 |
| `.env.test` | test | 测试环境 |
| `.env.production` | production | 生产环境 |

**环境变量命名规范：** 必须以 `VITE_` 开头才能在代码中访问

```typescript
// 访问环境变量
console.log(import.meta.env.VITE_ENV)
console.log(import.meta.env.VITE_API_BASE_URL)
```

### 路径别名

```typescript
// vite.config.ts 中配置
resolve: {
  alias: {
    '@': fileURLToPath(new URL('./src', import.meta.url))
  }
}

// 使用示例
import { useUserStore } from '@/stores/user'
import Button from '@/components/Button.vue'
```

### Sass 全局变量

在 `vite.config.ts` 中已配置自动导入全局样式变量：

```typescript
css: {
  preprocessorOptions: {
    scss: {
      additionalData: `
        @import "@/styles/mixin.scss";
        @import "@/styles/variables.scss";
      `
    }
  }
}
```

**使用示例：**

```vue
<style lang="scss" scoped>
.container {
  @include flex-center;  // 使用 mixin
  color: $primary-color; // 使用变量
}
</style>
```

### 代理配置

开发环境下配置 API 代理解决跨域问题：

```typescript
// vite.config.ts
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, '')
    }
  }
}
```

---

## 🛠️ 开发规范

### 目录命名规范

- **文件夹**: 小写 + 连字符（kebab-case），如 `user-components`
- **文件**: 
  - 组件文件使用 PascalCase，如 `UserProfile.vue`
  - 工具文件使用 camelCase，如 `utils.ts`
  - 配置文件使用 kebab-case，如 `vite.config.ts`

### 组件开发规范

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

// Props 定义
interface Props {
  title: string
  count?: number
}
const props = withDefaults(defineProps<Props>(), {
  count: 0
})

// Emits 定义
interface Emits {
  (e: 'update', value: number): void
}
const emit = defineEmits<Emits>()

// 响应式数据
const localCount = ref(props.count)

// 计算属性
const doubled = computed(() => localCount.value * 2)

// 方法
function handleClick() {
  emit('update', localCount.value)
}
</script>

<template>
  <div class="component">
    <h2>{{ title }}</h2>
    <p>{{ doubled }}</p>
  </div>
</template>

<style lang="scss" scoped>
.component {
  padding: 20px;
}
</style>
```

### Store 开发规范

```typescript
// src/stores/user.ts
import { defineStore } from 'pinia'

interface UserState {
  name: string
  age: number
  token: string | null
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    name: '',
    age: 0,
    token: null
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
    displayName: (state) => state.name || '匿名用户'
  },

  actions: {
    setToken(token: string) {
      this.token = token
    },

    logout() {
      this.token = null
      this.name = ''
      this.age = 0
    }
  }
})
```

### 路由配置规范

```typescript
// src/router/router.config.ts
import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/views/layouts/index.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/HomeView.vue'),
        meta: {
          title: '首页',
          keepAlive: true,
          showTab: true
        }
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('@/views/AboutView.vue'),
        meta: {
          title: '关于',
          keepAlive: false
        }
      }
    ]
  }
]
```

---

## 🔌 插件说明

### 已集成插件

| 插件 | 说明 |
|------|------|
| @vitejs/plugin-vue | Vue 3 支持 |
| @vitejs/plugin-vue-jsx | JSX/TSX 支持 |
| unplugin-auto-import | 自动导入 Vue API |
| unplugin-vue-components | 组件自动注册 |
| vite-plugin-mock | Mock 数据支持 |
| vite-plugin-compression | 生产环境压缩 |
| vite-plugin-vue-devtools | Vue DevTools 支持 |

### 自动导入功能

**自动导入的 Vue API：**

```typescript
// 无需手动导入，可直接使用
ref, reactive, computed, watch, watchEffect
onMounted, onUnmounted, onUpdated
useRouter, useRoute
```

**自动注册的组件：**

```vue
<!-- components 目录下的组件自动注册 -->
<template>
  <HelloWorld />  <!-- 自动注册 src/components/HelloWorld.vue -->
  <TheWelcome />  <!-- 自动注册 src/components/TheWelcome.vue -->
</template>
```

---

## 📦 构建部署

### 构建命令

```bash
# 完整构建（类型检查 + 构建）
pnpm build

# 仅构建
pnpm build-only

# 预览构建结果
pnpm preview
```

### 构建配置

构建配置位于 `build/vite/build.ts`，包含：

- **代码分割** - 按 vendor、chunk 自动分割
- **Tree Shaking** - 移除未使用代码
- **压缩优化** - Terser 压缩
- **Gzip 压缩** - 可选 Gzip/Brotli 压缩
- **Source Map** - 可选生成 Source Map

### 部署注意事项

1. **静态资源路径**：构建时 `base` 设置为 `./`，支持任意路径部署
2. **路由模式**：使用 History 模式，服务器需配置重定向到 index.html
3. **环境变量**：确保生产环境配置正确的 `.env.production`

---

## 🧪 开发工具

### VSCode 推荐插件

- **Volar** - Vue 3 官方语言支持
- **ESLint** - 代码检查
- **Prettier** - 代码格式化
- **TypeScript Vue Plugin (Volar)** - TS 支持

### VSCode 配置

`.vscode/settings.json` 已配置：

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.probe": [
    "javascript",
    "typescript",
    "vue",
    "html"
  ]
}
```

---

## 🐛 常见问题

### 1. IP 无法访问

**问题：** 启动后显示 `Network: use --host to expose`

**解决：** vite.config.ts 中已配置 `server.host: true`

### 2. TypeScript 不识别 .vue 文件

**解决：** 已配置 `env.d.ts` 类型声明，确保 Volar 插件启用

### 3. Sass 变量无法使用

**解决：** 检查 vite.config.ts 中的 `preprocessorOptions` 配置

### 4. 自动导入不生效

**解决：** 
- 检查 `auto-import.d.ts` 是否生成
- 重启 VSCode TypeScript 服务

---

## 📝 更新日志

### v0.0.0 (初始版本)

- ✅ Vue 3.4.27 + TypeScript 5.3.3
- ✅ Vite 5.2.11 构建工具
- ✅ Pinia 状态管理
- ✅ Vue Router 4 路由
- ✅ ESLint + Prettier 代码规范
- ✅ Sass 样式方案
- ✅ Mock 数据支持
- ✅ 多环境变量配置
- ✅ 自动导入和组件自动注册

---

## 📄 License

MIT

---

## 👥 维护者

- Author: zhangyong
- Email: [your-email@example.com]

---

**🌟 开始你的开发之旅吧！**
