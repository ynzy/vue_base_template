import { buildPages } from "./buildPages";
import { buildRoot } from "./buildRoot";


export function createBuild({viteEnv,project}:any){
  if(project.chunkName == 'root') {
    return buildRoot({viteEnv,project})
  }
  return buildPages({viteEnv,projects:[project]})
}