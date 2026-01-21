import fs from 'fs';
import url from 'url';
import path from 'path';

const rootPath = process.cwd();
const currentPath = path.dirname(url.fileURLToPath(import.meta.url));


/**
 * todo:我需要生成一个路由,路由的结构如下
 *  {
 *    text: '前端小记',
 *    collapsed: false,    // 默认展开
 *    items: [
 *      { text: 'css小记', link: '/doc-code/front/css/display的用法' },
 *    ]
 *  },
 *  输入一个文件夹路径,递归返回一个路由数组
 *  如果是文件夹(非asset文件,就递归)
 *  如果是文件
 *      是index.md文件,使用上一层文件夹的名称作为路由名称
 *          为什么需要使用index.md?因为我需要独立一个文件夹结构,比如一个文章对应一个asset文件夹资源,这样子可以将文章和图片资源单独合成一个文件夹
*       非index.md文件,使用文件名作为路由名称
 */

interface RouteItem {
  text: string;
  link?: string;
  collapsed?:boolean;
  items?: RouteItem[];
}

// 判断是否是文件夹
const isDir = (pathName:string) => {
    try {
        if(!fs.existsSync(pathName)) return false;
        const stat = fs.statSync(pathName);
        return stat.isDirectory();
    } catch (err) {
        return false;
    }
}

const WHITE_LIST = ['asset','assets'];
const isWhiteList = (dirName:string) =>{
    return WHITE_LIST.includes(dirName);
}



// const genRouteItem = (dirName:string):RouteItem[] =>{
//     const tempArr:RouteItem[] = [];
//     // 如果是文件夹就接着递归
//     if (isDir(dirName)){
//         genRouteItem('')
//     }else if(dirName.endsWith('.md')){
//         if(dirName === 'index.md'){
//             tempArr.push({
//                 text: dirName,
//                 link: `/${dirName.replace('.md', '')}`,
//             })
//         }else{
//             tempArr.push({
//                 text: dirName.replace('.md', ''),
//                 link: `/${dirName.replace('.md', '')}`,
//             })
//         }
//     }
//     // 如果是md文件,就返回一个或者多个路由
//     return tempArr as RouteItem[];
// }

// const getList = (dirName:string):RouteItem[] =>{
//     return [
//         {
//             text: '前端小记',
//             collapsed: false,    // 默认展开
//             items: [
//                 { text: 'css小记', link: '/doc-code/front/css/display的用法' },
//             ]
//         }
//     ]
// }

// 输入目录名称,读取
const getList = (pathStr:string) =>{
    const fullPathStr = path.resolve(rootPath,pathStr);
    const res:RouteItem[] = [];

    const filesList = fs.readdirSync(fullPathStr);
    if(filesList.length === 0){
        return res;
    } 
    else{
        // 读取每个文件夹里面的内容(包括子文件夹和文件)
        for(let i= 0;i<filesList.length;i++){
            if(isDir(path.resolve(fullPathStr , filesList[i]))){
                // 如果下一级文件夹里面只有一个.md,且这个.md文件的文件名和文件夹名称相同或者为index,就直接以当前文件夹名称作为link
                const children = fs.readdirSync(path.resolve(fullPathStr , filesList[i]))
                if(children?.length === 1){
                    // 对于非index.md文件,直接以文件名作为路由名称,link也直接以文件名作为路由名称,不需要多加一层文件夹
                    if(children[0] === 'index.md'){
                        res.push({
                            text: filesList[i],
                            link: `/${pathStr + '/' + filesList[i]}`,
                        })
                    }else if(children[0].replace('.md', '') === filesList[i] ){
                        res.push({
                            text: filesList[i],
                            link: `/${pathStr + '/' + filesList[i]} + '/' + ${filesList[i]}`,
                        })
                    }
                }
                // 递归调用
                else{
                    // 过滤掉白名单里面的例如asset文件夹
                    if(isWhiteList(filesList[i])) continue;
                    if(fs.readdirSync(path.resolve(fullPathStr , filesList[i])).length === 1 ){
                        res.push({
                            text: filesList[i],
                            // 对于index.md,vitepress会默认解析
                            link: `/${pathStr + '/' + filesList[i]}`,
                        })
                    }else{
                        res.push({
                            text: filesList[i],
                            collapsed: false,    // 默认展开
                            items: getList(pathStr + '/' + filesList[i]),
                        })
                    }
                }
            }else if(filesList[i].endsWith('.md')){
                if(filesList[i] === 'index.md'){
                    res.push({
                        text: pathStr.split('/').pop() || '',
                        link: `/${pathStr.replace('.md', '')}`,
                    })
                }else{
                    console.log('找到非index的md了',filesList[i])
                    console.log('push的内容',{
                        text: filesList[i].replace('.md', ''),
                        link: `/${(pathStr + '/' + filesList[i]).replace('.md', '')}`,
                    })
                    res.push({
                        text: filesList[i].replace('.md', ''),
                        link: `/${(pathStr + '/' + filesList[i]).replace('.md', '')}`,
                    })
                }
            }
        }
    }
    return res as RouteItem[]
}
// 先读取一下根目录
export const setSideBar = (preFix:string = 'doc-')=>{
    // const dirPath = path.resolve(rootPath,pathName);
    const filesList = fs.readdirSync(rootPath)
    const filterList = filesList.filter((item) => item.startsWith(preFix));
    const routeList =  filterList.map((item)=>{
        return {
            text: item,
            collapsed: false,    // 默认展开
            items: getList(item),
        }
    })
    console.dir(routeList, { depth: null });
    return routeList
}

// console.log(fs.readdirSync('doc-code/front/css'))

// setSideBarName('1111');