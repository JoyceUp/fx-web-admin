# woniu-admin

原型地址
https://4ycuup.axshare.com/
1

后台：
客服：https://daxf21.axshare.com
资金岗：https://g3hil9.axshare.com
系统设置：https://1iyjqt.axshare.com
财务报表：https://g3hil9.axshare.com/#g=1&p=%E8%B4%A2%E5%8A%A1%E5%AE%A1%E6%A0%B8

财务报表（入金流量，出金流量，每日账户余额表）2018-02-07
https://93az5t.axshare.com/#g=1&p=%E6%AF%8F%E6%97%A5%E8%B4%A6%E6%88%B7%E4%BD%99%E9%A2%9D%E8%A1%A8



https://93az5t.axshare.com


api地址
http://172.7.0.204:8082/fx-api-admin/swagger-ui.html#/

## 搭建开发环境

统一用yarn来管理第三方依赖

1. yarn start 启动项目
2. 发现package.json有变化的时候，执行yarn install
3. 更新下来，将nodemon.default.json copy 一份，更名为 nodemon.json 系统执行依赖于nodemon.json，这样做的目的是防止配制文件互相影响。
其中文件中的配置项execMap 对应的命令需要根据node的版本做修改。如果自己电脑的node 版本为8以上则将--debug 两个都修改为--inspect。否则不用修改。
4. mocha or mocha **.js执行单元测试


## 接口约定(已确定)

接口返回格式统一为对象，格式如下：

{
    status:Number
    msg:String
    datas:{}
}

status
    200;  //  成功
    401;  // 表示用户没有权限（令牌、用户名、密码错误）。
    403;  // 表示用户得到授权（与401错误相对），但是访问是被禁止的。
    404;  // 表示用户得到授权（与401错误相对），但是访问是被禁止的。
    505;  // 服务端未知错误
    510;  // 参数验证不通过
    511;  // 传递的json格式有误
    512;  // 结果错误

自定义状态
    0; // 状态：生效
    1; // 状态：未生效