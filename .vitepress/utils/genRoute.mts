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
 */

interface RouteItem {
  text: string;
  link?: string;
  collapsed?:boolean;
  items?: RouteItem[];
}

const genRouteItem = (dirName:string):RouteItem =>{
    // 如果是文件夹就接着递归
    // 如果是md文件,就返回一个或者多个路由
    return {
        text: dirName,
        collapsed: false,    // 默认展开
    }
}

const getList = (dirName:string):RouteItem[] =>{
    return [
        {
            text: '前端小记',
            collapsed: false,    // 默认展开
            items: [
                { text: 'css小记', link: '/doc-code/front/css/display的用法' },
            ]
        }
    ]
}

