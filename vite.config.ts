import { fileURLToPath, URL } from 'node:url';

import { defineConfig, loadEnv } from 'vite';
import type { ConfigEnv } from 'vite';

import { createProxy } from './build/vite/proxy';
import { wrapperEnv } from './build/utils';
import { createVitePlugins } from './build/vite/plugin';
import { createBuild } from './build/vite/build';
import path from 'node:path';


// 多页面配置开始-------------------------------------- 获取pnpm run dev后缀来运行对应的项目
// 引入多页面配置文件
const project = require('./scripts/multiPages.json')
const projectName = process.argv.find(arg => arg.startsWith('--config.project='));
let filterProjects: any = []
if (projectName) {
  const [, value] = projectName.split('=');
  console.log('Project name:', value);
  filterProjects = project.filter((ele) => {
    // 过滤出用户输入的单独打包的配置项
    return ele.chunk.toLowerCase() === value.toLowerCase()
  })
  console.log(`--------单独构建：${filterProjects[0]['chunkName']}--------`)
} else {
  filterProjects = project
}
/** 多页面配置 */
const multiPages = (p) => {
  const pages = {}
  p.forEach((ele) => {
    const htmlUrl = path.resolve(
      __dirname,
      `src/Project/${ele.chunk}/index.html`
    )
    pages[ele.chunk] = htmlUrl
  })

  return pages
}
/**多页面打包 */
const multiBuild = (p) => {
  const buildOutputConfigs: any = []
  p.forEach((ele) => {
    // 配置多出口打包
    buildOutputConfigs.push({
      dir: `dist/${ele.chunk}/`,
      // chunkFileNames: 'static/js/[hash].js', // 引入文件名的名称
      // entryFileNames: 'static/js/[hash].js', // 包的入口文件名称
      // assetFileNames: 'static/[ext]/[hash].[ext]', // 资源文件像 字体，图片等
      experimentalMinChunkSize: 5 * 1024, // 生成的chunk最小体积，小于这个值的chunk会被合并到一个文件中}
      // assetFileNames: '[ext]/[name]-[hash].[ext]',
      // chunkFileNames: 'static/js/[name]-[hash].js',
      // entryFileNames: 'static/js/[name]-[hash].js',
      chunkFileNames: 'static/js/[name]-[hash].js',
      entryFileNames: 'static/js/[name]-[hash].js',
      manualChunks(id) {
        if (id.includes('node_modules')) {
          return id.toString().match(/\/node_modules\/(?!.pnpm)(?<moduleName>[^\\/]*)\//)?.groups!.moduleName ?? 'vender';
        }
      },
      assetFileNames: 'build/[ext]/[hash].[ext]', // 资源文件像 字体，图片等
    })
  })
  return buildOutputConfigs
}
// 多页面配置结束 --------------------------------------

const target = 'http://XXX';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv) => {
  const root = process.cwd(); // 当前工作目录
  const isBuild = command === 'build'; // 是否是构建 serve
  const env = loadEnv(mode, root); // 加载env环境
  // The boolean type read by loadEnv is a string. This function can be converted to boolean type
  const viteEnv = wrapperEnv(env);
  console.log('viteEnv', viteEnv);
  console.log('\x1B[33m%s\x1b[0m', '正在运行的环境:', viteEnv.VITE_ENV);
  return {
    root: `./src/project/${filterProjects[0]['chunk']}`,
    // base: isBuild ? './' : '/',
    base: './',
    server: {
      host: true
      // proxy: createProxy(viteEnv, target)
    },
    plugins: [...createVitePlugins(viteEnv, isBuild)],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@project': fileURLToPath(new URL('./src/project', import.meta.url)),
        '@daWoSi': fileURLToPath(new URL('./src/project/daWoSi', import.meta.url))
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          charset: false, // 避免出现: build时的 @charset 必须在第一行的警告
          additionalData: `
            @import "@/styles/mixin.scss";
            @import "@/styles/variables.scss";
            `
        }
      }
    },
    build: {
      rollupOptions: {
        //配置多页应用程序入口文件
        input: multiPages(filterProjects),
        //打包到目标目录
        output: multiBuild(filterProjects)
        // output: {
        //   chunkFileNames: 'static/js/[hash].js', // 引入文件名的名称
        //   entryFileNames: 'static/js/[hash].js', // 包的入口文件名称
        //   assetFileNames: 'static/[ext]/[hash].[ext]', // 资源文件像 字体，图片等
        //   experimentalMinChunkSize: 5 * 1024, // 生成的chunk最小体积，小于这个值的chunk会被合并到一个文件中}
        // }
      }
    },
    // build: createBuild(viteEnv)
  };
});
