# Vue 3 + TypeScript + Vite 项目开发规范指南

> 本文档基于 vue_base_template 项目整理，适用于团队统一开发标准。

---

## 目录

1. [项目结构规范](#1-项目结构规范)
2. [技术栈概览](#2-技术栈概览)
3. [命名规范](#3-命名规范)
4. [代码风格规范](#4-代码风格规范)
5. [TypeScript 类型定义规范](#5-typescript-类型定义规范)
6. [组件开发规范](#6-组件开发规范)
7. [路由开发规范](#7-路由开发规范)
8. [状态管理规范](#8-状态管理规范)
9. [样式开发规范](#9-样式开发规范)
10. [Git 提交规范](#10-git-提交规范)
11. [构建配置说明](#11-构建配置说明)
12. [最佳实践建议](#12-最佳实践建议)

---

## 1. 项目结构规范

### 1.1 目录结构

```
vue_base_template/
├── build/                    # 构建配置目录
│   ├── utils.ts              # 构建工具函数
│   ├── types/                # 构建类型定义
│   └── vite/                 # Vite 配置模块
│       ├── build.ts          # 构建配置
│       ├── proxy.ts          # 代理配置
│       └── plugin/           # Vite 插件配置
│           ├── index.ts      # 插件入口
│           ├── autoImport.ts # 自动导入配置
│           ├── autocomponents.ts # 组件自动导入
│           ├── compress.ts   # 压缩配置
│           ├── mock.ts       # Mock 配置
│           └── styleImport.ts # 样式导入配置
├── src/                      # 源代码目录
│   ├── assets/               # 静态资源（图片、字体等）
│   ├── components/           # 公共组件
│   │   └── icons/            # 图标组件
│   ├── router/               # 路由配置
│   ├── stores/               # Pinia 状态管理
│   ├── styles/               # 全局样式
│   ├── views/                # 页面视图
│   ├── App.vue               # 根组件
│   └── main.ts               # 入口文件
├── types/                    # 全局类型定义
│   └── global.d.ts           # 全局类型声明
├── env.d.ts                  # 环境变量类型声明
├── .eslintrc.cjs             # ESLint 配置
├── .prettierrc.js            # Prettier 配置
├── tsconfig.json             # TypeScript 配置入口
├── tsconfig.app.json         # 应用 TypeScript 配置
├── tsconfig.node.json        # Node 环境 TypeScript 配置
├── vite.config.ts            # Vite 主配置
├── package.json              # 项目依赖配置
└── .gitignore                # Git 忽略配置
```

### 1.2 目录职责说明

| 目录 | 职责 | 备注 |
|------|------|------|
| `build/` | 构建相关配置，不参与业务逻辑 | 按功能模块拆分 |
| `src/assets/` | 静态资源，会被 Vite 处理 | 图片、字体、SVG 等 |
| `src/components/` | 可复用的公共组件 | 按功能分类，支持自动导入 |
| `src/views/` | 页面级组件 | 与路由对应 |
| `src/router/` | 路由配置 | 分离路由定义与配置 |
| `src/stores/` | Pinia 状态管理 | 按模块拆分 Store |
| `src/styles/` | 全局样式、变量、混入 | SCSS 预处理器 |
| `types/` | 全局类型定义 | 环境变量、工具类型 |

---

## 2. 技术栈概览

### 2.1 核心依赖

| 技术 | 版本 | 用途 |
|------|------|------|
| Vue | ^3.4.27 | 前端框架 |
| TypeScript | ~5.3.3 | 类型安全 |
| Vite | ^5.2.11 | 构建工具 |
| Pinia | ^2.1.7 | 状态管理 |
| Vue Router | ^4.3.2 | 路由管理 |
| Sass | ^1.77.2 | CSS 预处理器 |

### 2.2 开发工具

| 工具 | 版本 | 用途 |
|------|------|------|
| ESLint | ^8.57.0 | 代码检查 |
| Prettier | ^3.2.5 | 代码格式化 |
| vue-tsc | ^1.8.27 | Vue 类型检查 |
| unplugin-auto-import | ^0.17.6 | API 自动导入 |
| unplugin-vue-components | ^0.26.0 | 组件自动导入 |
| vite-plugin-compression | ^0.5.1 | 构建压缩 |
| terser | ^5.31.0 | 代码混淆 |

### 2.3 推荐开发环境

- **IDE**: VSCode + Volar 插件
- **Node**: >= 18.x
- **包管理器**: npm / pnpm

---

## 3. 命名规范

### 3.1 文件命名

| 类型 | 规范 | 示例 |
|------|------|------|
| Vue 组件 | PascalCase | `HelloWorld.vue`, `TheWelcome.vue` |
| TypeScript 文件 | camelCase | `main.ts`, `index.ts` |
| 配置文件 | camelCase / kebab-case | `vite.config.ts`, `router.config.ts` |
| 样式文件 | snake_case | `variables.scss`, `mixin.scss`, `reset.scss` |
| 类型定义文件 | camelCase | `global.d.ts`, `env.d.ts` |
| 目录名 | camelCase / PascalCase | `components/`, `stores/`, `icons/` |

### 3.2 变量命名

```typescript
// ✅ 推荐
const userName = 'zhangyong';           // 常量：camelCase
const MAX_COUNT = 100;                   // 全局常量：UPPER_SNAKE_CASE
let isLoading = false;                   // 布尔变量：is/has 前缀
function getUserInfo() {}                // 函数：camelCase，动词开头
interface UserInfo {}                    // 接口：PascalCase
type Recordable<T> = Record<string, T>;  // 类型别名：PascalCase

// ❌ 不推荐
const user_name = 'zhangyong';           // 避免使用 snake_case
const loading = false;                   // 布尔变量缺少前缀
```

### 3.3 组件命名

```vue
<!-- ✅ 推荐：多词组件名（除特殊情况） -->
<template>
  <HelloWorld />
  <TheWelcome />
  <UserProfile />
</template>

<!-- ❌ 不推荐：单词组件名 -->
<template>
  <Header />   <!-- 除非在 ESLint 中配置 ignores -->
  <Footer />
</template>
```

### 3.4 路由命名

```typescript
// ✅ 推荐
export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',           // 路由名称：camelCase
    component: HomeView
  },
  {
    path: '/user-profile',  // 路由路径：kebab-case
    name: 'userProfile',
    component: () => import('../views/UserProfile.vue')
  }
];

// ❌ 不推荐
{
  path: '/UserProfile',     // 避免 PascalCase 路径
  name: 'user-profile',     // 避免 kebab-case 名称
}
```

---

## 4. 代码风格规范

### 4.1 ESLint 规则要点

项目使用 Vue 3 Essential + TypeScript 规则集，关键规则：

```javascript
// .eslintrc.cjs 关键配置
{
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',      // 允许 any
    '@typescript-eslint/no-unused-vars': 'off',       // 允许未使用变量
    'vue/multi-word-component-names': ['off', { ignores: ['Main'] }],
    'no-console': 'off',                              // 允许 console
    'no-debugger': 'error',                           // 禁用 debugger
    'prefer-const': 'off',                            // 不强制 const
    'eqeqeq': 'off',                                  // 允许 == 比较
  }
}
```

### 4.2 Prettier 格式化规则

```javascript
// .prettierrc.js 配置
{
  printWidth: 180,           // 单行最大 180 字符
  tabWidth: 2,               // 缩进 2 空格
  semi: true,                // 语句末尾分号
  singleQuote: true,         // 使用单引号
  trailingComma: 'none',     // 不使用尾逗号
  bracketSpacing: true,      // 对象括号内空格
  arrowParens: 'always',     // 箭头函数参数括号
  endOfLine: 'lf',           // 使用 LF 换行
}
```

### 4.3 缩进规范

```typescript
// ✅ 推荐：2 空格缩进
function createUser(name: string) {
  if (name) {
    return { name };
  }
  return null;
}

// Vue 模板缩进
<template>
  <div class="container">
    <span>内容</span>
  </div>
</template>
```

---

## 5. TypeScript 类型定义规范

### 5.1 全局类型定义

```typescript
// types/global.d.ts
declare global {
  // 工具类型
  declare type Recordable<T = any> = Record<string, T>;
  declare type ReadonlyRecordable<T = any> = {
    readonly [key: string]: T;
  };

  // Vue PropType 别名
  declare type PropType<T> = VuePropType<T>;

  // 环境变量接口
  declare interface ViteEnv {
    VITE_ENV: string;
    VITE_OUTPUT_DIR: string;
    VITE_PUBLIC_PATH: string;
    VITE_PORT: string;
    VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none';
    VITE_BASE_API: string;
  }
}
```

### 5.2 组件 Props 类型定义

```vue
<script setup lang="ts">
// ✅ 推荐：使用类型化的 defineProps
defineProps<{
  msg: string;
  count?: number;
  items: Array<{ id: number; name: string }>;
}>();

// 或使用 PropType（更详细的验证）
interface Props {
  title: string;
  visible?: boolean;
}

defineProps<Props>();
</script>
```

### 5.3 API 响应类型定义

```typescript
// ✅ 推荐：定义清晰的接口
interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

interface UserInfo {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

// 使用示例
async function getUserInfo(): Promise<ApiResponse<UserInfo>> {
  return await fetch('/api/user').then(res => res.json());
}
```

### 5.4 模块声明

```typescript
// env.d.ts - Vue 文件模块声明
declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
```

---

## 6. 组件开发规范

### 6.1 组件基本结构

```vue
<!-- ✅ 推荐：使用 <script setup> 语法 -->
<script setup lang="ts">
import TheWelcome from './TheWelcome.vue';

// Props 定义
defineProps<{
  title: string;
}>();

// Emits 定义
const emit = defineEmits<{
  (e: 'update', value: string): void;
  (e: 'close'): void;
}>();

// 响应式状态
const count = ref(0);
const doubled = computed(() => count.value * 2);

// 方法
function handleClick() {
  count.value++;
  emit('update', String(count.value));
}
</script>

<template>
  <div class="container">
    <h1>{{ title }}</h1>
    <button @click="handleClick">点击: {{ count }}</button>
    <TheWelcome />
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
}
</style>
```

### 6.2 组件自动导入

项目配置了 `unplugin-vue-components`，`src/components/` 目录下的组件会自动注册：

```vue
<!-- ✅ 无需手动导入，直接使用 -->
<template>
  <!-- HelloWorld 组件位于 src/components/HelloWorld.vue -->
  <!-- 自动导入，无需 import -->
  <HelloWorld msg="Hello" />
</template>

<script setup lang="ts">
// 无需导入 HelloWorld
</script>
```

### 6.3 Props 最佳实践

```vue
<script setup lang="ts">
// ✅ 推荐：类型化 Props
interface Props {
  // 必填属性
  title: string;
  // 可选属性
  visible?: boolean;
  // 数组类型
  items?: string[];
  // 对象类型
  config?: {
    theme: string;
    size: number;
  };
}

const props = withDefaults(defineProps<Props>(), {
  visible: false,
  items: () => [],
  config: () => ({ theme: 'light', size: 14 })
});

// 使用 props
console.log(props.title);
</script>
```

### 6.4 组件分类建议

```
src/components/
├── common/           # 通用组件（Button, Input, Modal 等）
├── layout/           # 布局组件（Header, Footer, Sidebar 等）
├── icons/            # 图标组件
├── form/             # 表单相关组件
└── business/         # 业务特定组件
```

---

## 7. 路由开发规范

### 7.1 路由文件结构

```typescript
// src/router/router.config.ts - 路由定义
import type { RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/about',
    name: 'about',
    // 懒加载 - 推荐
    component: () => import('../views/AboutView.vue'),
    meta: {
      title: '关于'
    }
  }
];
```

```typescript
// src/router/index.ts - 路由实例创建
import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './router.config';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
});

export default router;
```

### 7.2 路由懒加载

```typescript
// ✅ 推荐：使用动态导入实现懒加载
{
  path: '/dashboard',
  name: 'dashboard',
  component: () => import('../views/Dashboard.vue')
}

// ✅ 分组懒加载（按功能模块）
{
  path: '/admin',
  children: [
    {
      path: 'users',
      component: () => import('../views/admin/Users.vue')
    },
    {
      path: 'settings',
      component: () => import('../views/admin/Settings.vue')
    }
  ]
}
```

### 7.3 路由 Meta 定义

```typescript
// ✅ 推荐：定义 meta 类型
declare module 'vue-router' {
  interface RouteMeta {
    title?: string;
    requiresAuth?: boolean;
    roles?: string[];
    keepAlive?: boolean;
  }
}

// 使用示例
{
  path: '/profile',
  name: 'profile',
  component: () => import('../views/Profile.vue'),
  meta: {
    title: '用户中心',
    requiresAuth: true,
    keepAlive: true
  }
}
```

---

## 8. 状态管理规范

### 8.1 Pinia Store 结构

```typescript
// src/stores/counter.ts
import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

// ✅ 推荐：使用 Composition API 风格
export const useCounterStore = defineStore('counter', () => {
  // 状态
  const count = ref(0);
  
  // 计算属性
  const doubleCount = computed(() => count.value * 2);
  
  // 方法
  function increment() {
    count.value++;
  }
  
  function reset() {
    count.value = 0;
  }
  
  // 导出
  return { count, doubleCount, increment, reset };
});
```

### 8.2 Store 模块化

```typescript
// src/stores/index.ts - Store 入口
import { createPinia } from 'pinia';

const store = createPinia();
// 可选：持久化插件
// import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// store.use(piniaPluginPersistedstate)

export default store;

// 导出所有 Store
export * from './counter';
export * from './user';
```

### 8.3 Store 使用示例

```vue
<script setup lang="ts">
import { useCounterStore } from '@/stores/counter';

// ✅ 在组件中使用
const counterStore = useCounterStore();

// 访问状态
console.log(counterStore.count);

// 访问计算属性
console.log(counterStore.doubleCount);

// 调用方法
counterStore.increment();

// ✅ 使用 storeToRefs 保持响应性
import { storeToRefs } from 'pinia';
const { count, doubleCount } = storeToRefs(counterStore);
</script>
```

### 8.4 Store 最佳实践

```typescript
// ✅ 推荐：异步操作封装
export const useUserStore = defineStore('user', () => {
  const userInfo = ref<UserInfo | null>(null);
  const loading = ref(false);
  
  async function fetchUserInfo() {
    loading.value = true;
    try {
      userInfo.value = await api.getUserInfo();
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  }
  
  return { userInfo, loading, fetchUserInfo };
});

// ✅ 推荐：持久化配置（如需要）
export const useSettingsStore = defineStore('settings', () => {
  const theme = ref('light');
  return { theme };
}, {
  persist: {
    key: 'app-settings',
    paths: ['theme']
  }
});
```

---

## 9. 样式开发规范

### 9.1 样式文件组织

```
src/styles/
├── index.scss        # 样式入口（导入其他样式）
├── reset.scss        # CSS Reset
├── variables.scss    # SCSS 变量
├── mixin.scss        # SCSS 混入
└── *.module.scss     # CSS Modules 文件
```

### 9.2 全局变量定义

```scss
// src/styles/variables.scss
$background-color: #f8f8f8;
$theme-color: #07b0b8;
$text-color: #333333;
$border-color: #e0e0e0;

// 响应式断点
$breakpoint-sm: 576px;
$breakpoint-md: 768px;
$breakpoint-lg: 1024px;
$breakpoint-xl: 1280px;
```

### 9.3 混入定义

```scss
// src/styles/mixin.scss
// 清除浮动
@mixin clearfix {
  &:after {
    content: "";
    display: table;
    clear: both;
  }
}

// 文字截断
@mixin textoverflow($clamp: 1) {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: $clamp;
  -webkit-box-orient: vertical;
}

// Flex 布局
@mixin flexbox($jc: space-between, $ai: center, $fd: row, $fw: nowrap) {
  display: flex;
  justify-content: $jc;
  align-items: $ai;
  flex-direction: $fd;
  flex-wrap: $fw;
}
```

### 9.4 组件样式规范

```vue
<!-- ✅ 推荐：使用 scoped 样式 -->
<style scoped lang="scss">
.container {
  padding: 20px;
  
  // 使用变量
  background-color: $background-color;
  
  // 使用混入
  @include flexbox(center, center);
  
  .title {
    color: $theme-color;
    font-size: 18px;
    
    // 深度选择器（修改子组件样式）
    :deep(.child-component) {
      margin-top: 10px;
    }
  }
}
</style>

<!-- ✅ 响应式设计 -->
<style scoped lang="scss">
@media (min-width: $breakpoint-lg) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
}
</style>
```

### 9.5 全局样式注入

项目在 Vite 中配置了全局样式注入：

```typescript
// vite.config.ts
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

这意味着所有 SCSS 文件都可以直接使用变量和混入，无需手动导入。

---

## 10. Git 提交规范

### 10.1 分支管理

```
main          # 主分支，稳定版本
├── develop   # 开发分支
├── feature/* # 功能分支 (feature/login, feature/dashboard)
├── bugfix/*  # Bug 修复分支
└── release/* # 发布分支
```

### 10.2 提交信息格式

采用约定式提交规范：

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Type 类型说明**：

| 类型 | 说明 | 示例 |
|------|------|------|
| feat | 新功能 | feat: 添加用户登录功能 |
| fix | Bug 修复 | fix: 修复表单验证错误 |
| docs | 文档更新 | docs: 更新 README |
| style | 代码格式（不影响逻辑） | style: 调整代码缩进 |
| refactor | 重构（不是新功能或修复） | refactor: 重构用户模块 |
| perf | 性能优化 | perf: 优化列表渲染性能 |
| test | 测试相关 | test: 添加单元测试 |
| chore | 构建/工具变动 | chore: 升级 Vite 版本 |
| revert | 回滚提交 | revert: 回滚提交 abc123 |

**Scope 范围说明**（可选）：

```
feat(router): 添加路由守卫
fix(store): 修复状态更新问题
docs(readme): 更新安装说明
```

### 10.3 提交示例

```bash
# ✅ 推荐
git commit -m "feat: 添加用户登录页面"
git commit -m "fix(router): 修复路由跳转问题"
git commit -m "refactor(stores): 重构用户状态管理"

# ❌ 不推荐
git commit -m "修复问题"
git commit -m "update"
git commit -m "改动"
```

### 10.4 Git Ignore 配置

```gitignore
# 构建产物
dist/
dist-ssr/

# 依赖
node_modules/

# 日志
*.log
npm-debug.log*

# 自动生成文件（不应提交）
auto-import.d.ts
.eslintrc-auto-import.json
components.d.ts

# IDE 配置
.vscode/*
!.vscode/extensions.json
.idea/

# 本地环境变量
*.local
.env.local
.env.*.local
```

---

## 11. 构建配置说明

### 11.1 NPM Scripts

```bash
# 开发
npm run dev          # 启动开发服务器

# 构建
npm run build        # 类型检查 + 构建
npm run build-only   # 仅构建（无类型检查）
npm run preview      # 预览构建产物

# 代码质量
npm run lint         # ESLint 检查并修复
npm run format       # Prettier 格式化
npm run type-check   # TypeScript 类型检查
```

### 11.2 构建输出配置

```typescript
// build/vite/build.ts
{
  sourcemap: true,              // 生成 Source Map
  cssCodeSplit: true,           // CSS 代码分割
  minify: 'terser',             // 使用 Terser 压缩
  assetsInlineLimit: 4096,      // 小于 4KB 内联
  chunkSizeWarningLimit: 2000,  // Chunk 大小警告阈值
  
  rollupOptions: {
    output: {
      chunkFileNames: 'static/js/[name]-[hash].js',
      entryFileNames: 'static/js/[name]-[hash].js',
      assetFileNames: 'static/[ext]/[name]-[hash][extname]'
    }
  },
  
  terserOptions: {
    compress: {
      drop_console: false,      // 生产环境保留 console
      drop_debugger: true       // 移除 debugger
    }
  }
}
```

### 11.3 插件配置

| 插件 | 用途 |
|------|------|
| @vitejs/plugin-vue | Vue 单文件组件支持 |
| @vitejs/plugin-vue-jsx | Vue JSX 支持 |
| unplugin-auto-import | 自动导入 Vue API |
| unplugin-vue-components | 组件自动注册 |
| vite-plugin-compression | 构建压缩（gzip/brotli） |
| vite-plugin-vue-devtools | Vue DevTools |

### 11.4 环境变量

```typescript
// types/global.d.ts
declare interface ViteEnv {
  VITE_ENV: string;              // 环境名称
  VITE_OUTPUT_DIR: string;       // 输出目录
  VITE_PUBLIC_PATH: string;      // 公共路径
  VITE_PORT: string;             // 端口号
  VITE_BUILD_COMPRESS: string;   // 压缩类型
  VITE_BASE_API: string;         // API 基础路径
}
```

---

## 12. 最佳实践建议

### 12.1 API 自动导入

项目配置了 `unplugin-auto-import`，以下 API 无需手动导入：

```vue
<script setup lang="ts">
// ✅ 无需导入，直接使用
const count = ref(0);           // Vue ref
const doubled = computed(() => count.value * 2);  // Vue computed
const router = useRouter();     // Vue Router
const store = useCounterStore(); // Pinia Store

// 自动生成的类型文件：src/auto-import.d.ts
// ESLint 配置文件：.eslintrc-auto-import.json
</script>
```

### 12.2 组件懒加载

```typescript
// ✅ 推荐：页面级组件懒加载
component: () => import('../views/AboutView.vue')

// ✅ 推荐：大组件条件加载
<script setup lang="ts">
const showHeavy = ref(false);
const HeavyComponent = defineAsyncComponent(() => 
  import('./components/HeavyComponent.vue')
);
</script>

<template>
  <HeavyComponent v-if="showHeavy" />
</template>
```

### 12.3 避免 Direct DOM 操作

```vue
<script setup lang="ts">
// ❌ 不推荐
document.getElementById('app');

// ✅ 推荐：使用 ref
const containerRef = ref<HTMLElement | null>(null);

onMounted(() => {
  if (containerRef.value) {
    containerRef.value.focus();
  }
});
</script>

<template>
  <div ref="containerRef"></div>
</template>
```

### 12.4 响应式数据解构

```vue
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCounterStore } from '@/stores/counter';

const store = useCounterStore();

// ❌ 不推荐：直接解构会失去响应性
const { count } = store;

// ✅ 推荐：使用 storeToRefs
const { count, doubleCount } = storeToRefs(store);

// 方法可以直接解构
const { increment, reset } = store;
</script>
```

### 12.5 TypeScript 严格模式建议

虽然项目关闭了部分严格规则，但建议：

```typescript
// ✅ 推荐：明确的类型定义
interface User {
  id: number;
  name: string;
  email: string;
}

// ✅ 推荐：使用 unknown 而非 any
function parseJson(data: string): unknown {
  return JSON.parse(data);
}

// ✅ 推荐：类型守卫
function isUser(data: unknown): data is User {
  return typeof data === 'object' && 
         data !== null && 
         'id' in data && 
         'name' in data;
}
```

### 12.6 性能优化建议

```vue
<script setup lang="ts">
// ✅ 大列表使用虚拟滚动
// 推荐使用 vue-virtual-scroller 或类似库

// ✅ 计算属性缓存
const filteredList = computed(() => 
  list.value.filter(item => item.active)
);

// ✅ 避免在模板中使用复杂表达式
// ❌ 不推荐
<template>
  <div>{{ items.filter(i => i.active).map(i => i.name).join(',') }}</div>
</template>

// ✅ 推荐：使用计算属性
<template>
  <div>{{ activeItemNames }}</div>
</template>
<script setup lang="ts">
const activeItemNames = computed(() => 
  items.value.filter(i => i.active).map(i => i.name).join(',')
);
</script>
```

### 12.7 错误处理

```typescript
// ✅ 推荐：统一的错误处理
async function safeRequest<T>(fn: () => Promise<T>): Promise<T | null> {
  try {
    return await fn();
  } catch (error) {
    console.error('Request failed:', error);
    return null;
  }
}

// 使用示例
const data = await safeRequest(() => api.getUserInfo());
if (data) {
  // 处理数据
}
```

---

## 附录

### A. 常用命令速查

```bash
# 创建新组件
# 文件位置：src/components/NewComponent.vue

# 创建新页面
# 文件位置：src/views/NewPage.vue
# 路由配置：src/router/router.config.ts

# 创建新 Store
# 文件位置：src/stores/newStore.ts
# 导出配置：src/stores/index.ts

# 类型检查
npm run type-check

# 格式化代码
npm run format

# 修复 ESLint 问题
npm run lint
```

### B. 目录快速创建模板

```bash
# 新功能模块目录结构
src/
├── views/
│   └── Feature/
│       ├── index.vue          # 主页面
│       └── components/        # 功能内组件
├── stores/
│   └── feature.ts             # 功能 Store
├── router/
│   └── modules/
│       └── feature.ts         # 功能路由
└── types/
    └── feature.d.ts           # 功能类型
```

### C. 组件模板

```vue
<script setup lang="ts">
/**
 * 组件名称：XXX
 * 组件描述：XXX
 * 作者：XXX
 * 日期：XXX
 */

import { ref, computed, onMounted } from 'vue';

// Props
interface Props {
  title: string;
  visible?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  visible: false
});

// Emits
const emit = defineEmits<{
  (e: 'update', value: string): void;
  (e: 'close'): void;
}>();

// 状态
const loading = ref(false);

// 计算属性
const displayTitle = computed(() => props.title.toUpperCase());

// 方法
function handleAction() {
  emit('update', 'value');
}

// 生命周期
onMounted(() => {
  // 初始化逻辑
});
</script>

<template>
  <div class="component-wrapper">
    <h2>{{ displayTitle }}</h2>
    <button @click="handleAction">操作</button>
  </div>
</template>

<style scoped lang="scss">
.component-wrapper {
  padding: 20px;
}
</style>
```

---

> 最后更新：2026-04-18
> 基于 vue_base_template 项目整理