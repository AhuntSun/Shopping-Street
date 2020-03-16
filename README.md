# Shopping Street

> 项目接口已更改，最新接口请联系作者！

## 项目预览

![image-20200316094953820](https://raw.githubusercontent.com/AhuntSun/BlogImg/master/ShoppingStreet/1.png)

## 项目安装

### 1.安装项目依赖

```
npm install
```

### 2.编译和运行项目
```
npm run serve
```

### 3.编译和打包项目
```
npm run build
```

## 项目目录

```
shopping street
├── .browserslistrc
├── .editorconfig                            // 统一项目的编辑器配置
├── .gitignore								 //git不进行跟踪的文件名单
├── babel.config.js							 //ES6 -> ES5配置文件
├── package-lock.json						 //项目依赖文件的详细版本信息
├── package.json                             // 项目依赖文件版本管理
├── postcss.config.js						 //css样式单位转换配置文件
├── README.md								 //项目介绍文档
├── vue.config.js                            // 项目配置文件
├── public
│   ├── index.html
│   └── logo.png
├── dist									 //项目经打包后的发布版本
├── node_modules							 //项目依赖组件
├── src                                      // 源代码文件夹
│   ├── App.vue
│   ├── main.js                              // 项目入口JS文件
│   ├── assets                               // 静态资源目录
│   │   ├── css
│   │   │   ├── base.css 					//统一样式配置
│   │   │   └── normalize.css 				//统一代码样式
│   │   └── img
│   │       ├── cart  
│   │       │   └── tick.svg
│   │       ├── common
│   │       │   ├── back.svg
│   │       │   ├── collect.svg
│   │       │   └── top.png
│   │       ├── detail
│   │       │   └── detail_bottom.png
│   │       ├── home
│   │       │   └── recommend_bg.jpg
│   │       └── tabbar
│   │           ├── category.svg
│   │           ├── category_active.svg
│   │           ├── category.svg
│   │           ├── category_active.svg
│   │           ├── home.svg
│   │           ├── home_active.svg
│   │           ├── profile.svg
│   │           └── profile_active.svg
│   ├── common                              // 公共文件
│   │   ├── mixin.js						//混入对象
│   │   └── utils.js						//工具类函数
│   ├── components 							// vue组件
│   │   ├── common                          // 公共组件(完全独立可复用的组件)
│   │   │   ├── navbar
│   │   │   │   └── NavBar.vue
│   │   │   ├── scroll
│   │   │   │   └── Scroll.vue
│   │   │   ├── swiper
│   │   │   │   ├── index.js
│   │   │   │   ├── Swiper.vue
│   │   │   │   └── SwiperItem.vue
│   │   │   └── tabbar
│   │   │   │   ├── TabBar.vue
│   │   │   │   └── TabBarItem.vue
│   │   │   ├── toast
│   │   │   │   ├── index.js
│   │   │   │   └── Toast.vue
│   │   └── content                          // 内容组件(与本项目有关联的组件)
│   │       ├── backTop
│   │       │   └── BackTop.vue
│   │       ├── checkButton
│   │       │   └── CheckButton.vue
│   │       ├── goods
│   │       │   ├── GoodsList.vue
│   │       │   └── GoodsListItem.vue
│   │       ├── mainTabbar
│   │       │   └── MainTabBar.vue
│   │       └── tabControl
│   │           └── TabControl.vue
│   ├── network                              // 网络请求模块(axios)
│   │   ├── detail.js
│   │   ├── home.js
│   │   └── request.js
│   ├── router                               // 路由配置
│   │   └── index.js
│   ├── store                                // vuex状态管理
│   │   ├── actions.js
│   │   ├── getters.js
│   │   ├── index.js
│   │   ├── mutation-type.js
│   │   └── mutations.js
│   └── views                                // 各分页组件
│       ├── cart
│       │   ├── Cart.vue
│       │   └── childComps					 //Cart分页子组件
│       │       ├── CartBottomBar.vue
│       │       ├── CartList.vue
│       │       └── CartListItem.vue
│       ├── category
│       │   ├── Category.vue
│       │   └── childComps
│       │       ├── TabContent.vue
│       │       ├── TabContentCategory.vue
│       │       ├── TabContentDetail.vue
│       │       └── TabMenu.vue
│       ├── detail
│       │   ├── Detail.vue
│       │   └── childComps
│       │       ├── DetailBaseInfo.vue
│       │       ├── DetailBottomBar.vue
│       │       ├── DetailCommentInfo.vue
│       │       ├── DetailGoodsInfo.vue
│       │       ├── DetailNavBar.vue
│       │       ├── DetailParamInfo.vue
│       │       ├── DetailShopInfo.vue
│       │       └── DetailSwiper.vue 
│       ├── home
│       │   ├── Home.vue
│       │   └── childComps
│       │       ├── FeatureView.vue
│       │       ├── GoodsList.vue
│       │       ├── GoodsListItem.vue
│       │       ├── HomeSwiper.vue
│       │       └── RecommendView.vue
│       └── profile
│           ├── childComps
│           │   ├── ListView.vue
│           │   └── UserInfo.vue
│           └── Profile.vue
└── LICENSE									 //开源协议
```

## 项目详情

该移动端项目搭载了**better-scroll**插件，使移动设备能够更加顺滑地滚动！

### 1.首页介绍

![1](https://raw.githubusercontent.com/AhuntSun/BlogImg/master/ShoppingStreet/2.png)

**多种分类商品目录可供选择；**

![image-20200316105229422](https://raw.githubusercontent.com/AhuntSun/BlogImg/master/ShoppingStreet/3.png)

**搭配vue-lazyload插件，实现图片懒加载；还有上拉加载更多，一键返回顶部功能；**

![image-20200316105430927](https://raw.githubusercontent.com/AhuntSun/BlogImg/master/ShoppingStreet/4.png)

### 2.详情页介绍

**动态分栏，可顺滑地跳转到对应的部位：**

**商品分栏，轮播图：**

![image-20200316110357922](https://raw.githubusercontent.com/AhuntSun/BlogImg/master/ShoppingStreet/5.png)

**参数分栏：**

![image-20200316110039707](https://raw.githubusercontent.com/AhuntSun/BlogImg/master/ShoppingStreet/6.png)

**评论分栏和推荐分栏：**

![image-20200316110203829](https://raw.githubusercontent.com/AhuntSun/BlogImg/master/ShoppingStreet/7.png)

### 3.购物车介绍

添加商品有相应的提示：

![image-20200316111029883](https://raw.githubusercontent.com/AhuntSun/BlogImg/master/ShoppingStreet/8.png)

**购物车功能齐全具备全选取消等功能：**

![image-20200316110725274](https://raw.githubusercontent.com/AhuntSun/BlogImg/master/ShoppingStreet/9.png)

## 更多详细内容可安装项目进行查看！
