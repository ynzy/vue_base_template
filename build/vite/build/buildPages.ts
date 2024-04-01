import path from "path"

/** 多页面配置 */
const multiPages = (projects) => {
  const pages = {
    // main: path.resolve( __dirname, `../../../index.html` )
  }
  projects.forEach((ele) => {
    const htmlUrl = path.resolve(
      __dirname,
      `../../../src/project/${ele.chunk}/index.html`
    )
    pages[ele.chunk] = htmlUrl
  })
  // console.log('pages',pages);
  
  return pages
}
/**多页面打包 */
const multiBuild = (projects) => {
  const buildOutputConfigs: any = []
  projects.forEach((ele) => {
    // 配置多出口打包
    buildOutputConfigs.push({
      // dir: `dist/${ele.chunk}/`,
      chunkFileNames: 'static/js/[name]-[hash].js', // 引入文件名的名称
      entryFileNames: 'static/js/[name]-[hash].js', // 包的入口文件名称
      manualChunks(id) { // 拆分第三方模块
        if (id.includes('node_modules')) {
          return id.toString().match(/\/node_modules\/(?!.pnpm)(?<moduleName>[^\\/]*)\//)?.groups!.moduleName ?? 'vender';
        }
      },
      assetFileNames: 'build/[ext]/[hash].[ext]', // 资源文件像 字体，图片等
      experimentalMinChunkSize: 5 * 1024, // 生成的chunk最小体积，小于这个值的chunk会被合并到一个文件中}
    })
  })
  return buildOutputConfigs
}

/**
 * 打包多页面配置
 * @param param0 
 * @returns 
 */
export function buildPages({ projects }: any) {
  console.log('projects',projects);
  
  return {
    rollupOptions: {
      //配置多页应用程序入口文件
      input: multiPages(projects),
      //打包到目标目录
      output: multiBuild(projects)
    }
  }
} 