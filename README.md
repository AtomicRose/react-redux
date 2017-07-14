# react-redux-framework

## 更新日志
当前为最新的稳定版本，还缺少相关开发效率的plugins添加，敬请期待2016-07-18的提交

## 使用说明

### Step1 克隆/下载代码
使用git工具克隆或下载代码到指定目录

### Step2 安装node依赖
``` shell
npm install
```
### Step3 配置你的应用信息
* 打开```build/common.js```
* 修改你的```DEPLOY_SERVICE_PATH``` (服务器相对根目录的发布地址，例如:/doctor) 和 ```APP_ID``` (应用的ID，通常来说指定后不再改变)

### Step4 运行
``` shell
npm run start
```
访问```http://localhost:9090``` 即可看到应用

## 编码规范
### 基本规范
* js/html基本编码规范参考WIKI ```https://wiki.myzd.info/pages/viewpage.action?pageId=3309611``` 和 ```https://wiki.myzd.info/pages/viewpage.action?pageId=3866634```
* 页面埋点规范参照 ```https://git.myzd.info/common/collect-log/tree/master/h5```
### react-redux 项目规范
#### 代码风格
* 采用Visual Studio Code自带的format工具, Visual Studio Code版本大于1.3.1
* 代码缩进采用2个空格（照顾到小屏幕的的用户，@何源海）
#### 语法规范
* 严格使用ES6语法规范
* 每个js文件只包含一个React组件
* 组件名称和文件名称一致，采用驼峰命名，开头字母必须大写
* 组件申明不要使用displayName方法
``` javascript
// bad
export default {
  // your code
}
// good
const c = {
  // your code
}
export default c;
```

* 变量采用驼峰命名，开头字母必须小写。除了方法内变量允许以 ```_``` 开头外，其他一律不允许
* js/jsx中的字符串引号使用，强制使用单引号。html中属性强制使用双引号
``` javascript
// js
let str = 'abc';
// jsx
render() {
  return (
    <div>
      <input type="text" id="input">
      {this.state.type === 'wellcome' && <p classNmae="hello-style">ok, wellcome</p>}
    </div>
  )
}
```

* 使用React.PureComponent
* Component中按照生命周期来排列代码
``` javascript
calss Example extends React.PureComponent{
  // ------------START----------------
  // 在END结束前的这一些方法，必须根据现有的顺序书写，方便代码逻辑查看
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    // 
  }
  componentDidMount() {
    //
  }
  componentWillReceiveProps() {
    //
  }
  componentWillUpdate() {
    //
  }
  componentDidUpdate() {
    //
  }
  // ······
  //------------ END -----------------
  // END之后再定义自己的操作方法
  handelA() {
    //
  }
  handelB() {
    //
  }
  // ······
}
```

* 针对jsx中事件方法的命名
``` javascript
// onClick
handelClick***() {

}
// onFocus
handelFocus***() {

}
// onBlur
handelBlur***() {

}
// onChange
handelChange***() {

}
```

* 代码中禁止出现以数字命名的方法```function method1(){}``` , ```function method2(){}``` ……

