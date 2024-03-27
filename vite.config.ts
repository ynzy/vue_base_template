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
const multiPages = require('./scripts/multiPages.json')
const projectName = process.argv.find(arg => arg.startsWith('--project='));
// let filterProjects: any = []
// console.log("projectName",projectName);
function getProject(projectName: string | undefined) {
  const project = {
    "chunk": "root",
    "chunkName": "root"
  }
  if(!projectName) {
    return project
  }
  const [, value] = projectName.split('=');
  // console.log('Project name:', value);
  // 如果项目名字是root，或者没有项目名字，返回root
  if(!value || value === 'root') {
    return project
  }
  // 否则返回项目名字
  const resFilters = multiPages.filter((ele:any) => {
    // 过滤出用户输入的单独打包的配置项
    return ele.chunk.toLowerCase() === value.toLowerCase()
  })
  
  // console.log(`--------单独构建：${resFilters[0]['chunkName']}--------`)
  return resFilters[0]
}

const project = getProject(projectName)
console.log(`--------运行项目：${project['chunkName']}--------`);

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
    publicDir: (()=>{
      if(project.chunkName === 'root') {
        return path.join(__dirname, "public")
      } 
      return path.join(__dirname, `src/project/${project['chunk']}/public`) 
    })(),
    // publicDir: path.join(__dirname, "public"),
    root: (()=> {
      if(project.chunkName === 'root') {
        return  './'
      } 
      return  `./src/project/${project['chunk']}`
    })(),
    // root: `./src/project/${filterProjects[0]['chunk']}`,
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
        '$project': fileURLToPath(new URL('./src/project', import.meta.url)),
        // '$daWoSi': fileURLToPath(new URL('./src/project/daWoSi', import.meta.url))
        '$daWoSi': path.resolve(__dirname, './src/project/daWoSi')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          charset: false, // 避免出现: build时的 @charset 必须在第一行的警告
          additionalData: `
            @import "@/common/assets/css/alias.scss";
          `
        }
      }
    },
    build: createBuild({viteEnv,project})
    // build: {
    //   rollupOptions: {
    //     //配置多页应用程序入口文件
    //     input: multiPages(filterProjects),
    //     //打包到目标目录
    //     output: multiBuild(filterProjects)
    //   }
    // },
    // build: createBuild(viteEnv)
  };
});
