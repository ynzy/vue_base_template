
import type { BuildOptions } from 'vite'

/**
 * 打包根页面配置
 * @param viteEnv 
 * @returns 
 */
export function buildRoot({viteEnv,project}:any): BuildOptions {
    const { VITE_OUTPUT_DIR } = viteEnv
    return {
        // sourcemap: false, // 构建后是否生成 source map 文件
        // cssCodeSplit: true, // 禁用 CSS 代码拆分,将整个项目中的所有 CSS 将被提取到一个 CSS 文件中
        // brotliSize: true, // 关闭打包计算
        // target: 'esnext',
        minify: 'terser', // 混淆器, terser 构建后文件体积更小, esbuild
        //小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项
        // assetsInlineLimit: 4096,
        // chunkSizeWarningLimit: 2000, // chunk 大小警告的限制（以 kbs 为单位）
        // assetsDir: 'static', // 静态资源目录
        // rollup 打包配置
        rollupOptions: {
            output: {
                dir: `dist/${project.chunk}/`,
                chunkFileNames: 'static/js/[name]-[hash].js',
                entryFileNames: 'static/js/[name]-[hash].js',
                // assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
                manualChunks(id: string) { // 拆分第三方模块
                    if (id.includes('node_modules')) {
                      const moduleName = id.toString().match(/\/node_modules\/(?!.pnpm)([^\\/]+)/)?.[1];
                      return moduleName ? moduleName : 'vender';
                    }
                    return undefined; // 对于非node_modules的模块，不需要手动拆分则返回undefined
                  },
                  assetFileNames: 'build/[ext]/[hash].[ext]', // 资源文件像 字体，图片等
                  experimentalMinChunkSize: 5 * 1024, // 生成的chunk最小体积，小于这个值的chunk会被合并到一个文件中}
            }
        },
        // 压缩配置
        terserOptions: {
            compress: {
                drop_console: false, // 生产环境移除console
                drop_debugger: true // 生产环境移除debugger
            }
        }
    } as BuildOptions
}
