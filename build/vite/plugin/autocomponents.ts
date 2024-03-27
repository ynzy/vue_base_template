/**
 *  Introduces component library styles on demand.
 * https://github.com/antfu/unplugin-vue-components
 */
import path from 'path';
import Components from 'unplugin-vue-components/vite';

export function configAutoComponentsPlugin() {
  return Components({
    // 指定组件位置，默认是src/components
    dirs: [
      path.resolve(__dirname, '../../../src/common/components'),
      path.resolve(__dirname, '../../../src/project/daWoSi/components'),
    ],
    // ui库解析器
    resolvers: [],
    extensions: ['vue', 'tsx'],
    // 配置文件生成位置
    dts: 'components.d.ts',
    directives: false,
    // 搜索子目录
    deep: true,
    // 允许子目录作为组件的命名空间前缀。
    directoryAsNamespace: false
    // include:[]
  });
}
