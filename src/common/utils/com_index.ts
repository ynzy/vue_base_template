export const com_Function = ()=>{
    console.log('通用方法')
}

/**
 * @Description: 动态加载图片
 * @param {*} src 图片地址
 */
export async function loadImage(src: string): Promise<string> {
    let srcArr = src.split('/');
    let firstStr = srcArr.shift();
    let url = '';
    if (firstStr === '@') {
        url = `/src/${ srcArr.join('/') }`;
    } else {
        if (srcArr[0] === 'src') {
            url = `/src/${ srcArr.join('/') }`;
        } else if (srcArr[0] === 'rsm') {
            url = `/api/${ srcArr.join('/') }`;
        } else {
            url = src;
        }
    }
    return new Promise((resolve, resject) => {
        fetch(url).then((res) => {
            if (res.status == 200) {
                resolve(res.url);
            } else {
                resject(res.url);
                uino.manager.sunnyMessage.error(`${ src }路径的图片没有获取成功，请检查路径是否正确、文件名是否正确！`);
            }
        });
    });
}