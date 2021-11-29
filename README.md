# ZhiMa Framework

> 芝麻框架⭐ - 芝麻是数企前端容器框架，芝麻虽小点点滴滴积少成多。

ZhiMa Framework诞生的目的：

- 统一代码，规范化。
- 可拓展、可维护。
- 提升开发效率，开发只需考虑解决具体功能即可。

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [More](#more)

## Install

```shell
yarn add dz-transform
# or
npm i dz-transform -S
```

## Usage

```typescript
import Transform from 'dz-transform'

const info = {name: 'bob', test: 999}
const infoType = {name: String, age: Number, sex: String, list: Array, info: Object}
const defaultInfo = {name: 'hello', age: 20}
const newInfo = new Transform(infoType, info, defaultInfo).getData()

// 转换后的值如下
// {
//     "name": "bob",
//     "age": 20,
//     "sex": "-",
//     "list": [],
//     "info": {}
// }
```

需要说明一点的是，`defaultInfo` 也可以不用传，这样插件会选择一个合适的值用来补全。再来看看转换数组的表现：

```typescript
import Transform from 'dz-transform'

const arr = [
    {age: 18},
    {sex: "man"}
];
const arrItemType = {
    name: String,
    age: Number,
    sex: String,
    list: Array,
    info: Object
};
const defaultArrItem = {
    name: "Bob",
    age: 20,
    sex: "Women",
    list: [
        "Hello",
        "World"
    ],
    info: {slogan: "Hello world!"}
};
const newArr = new Transform(arrItemType, arr, defaultArrItem).getData();

// 转换后的值如下
// [
//     {
//         "name": "Bob",
//         "age": 18,
//         "sex": "Women",
//         "list": [
//             "Hello",
//             "World"
//         ],
//         "info": {
//             "slogan": "Hello world!"
//         }
//     },
//     {
//         "name": "Bob",
//         "age": 20,
//         "sex": "man",
//         "list": [
//             "Hello",
//             "World"
//         ],
//         "info": {
//             "slogan": "Hello world!"
//         }
//     }
// ]
```

## More

编写 DzTransform 的初衷就是我们平时开发时后端的接口会返回大量的不需要的垃圾数据，以及我们前端需要的数据后端返回为 `null`
或者直接就不存在。为了避免这样的问题出现，我们前端需要写很多不优雅的判断，于是心血来潮写了这一款插件。初版的功能实现大概花了两三个小时，心里还有很多想法，由于时间的原因没能想出更优雅、简洁的 api
调用。后期有机会会持续更新下去，只有一个遵旨——简单好用。<br>
更多信息请前往我的 [博客](https://blog.csdn.net/dizuncainiao)


