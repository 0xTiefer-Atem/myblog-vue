<template>
    <el-card class="work-card" shadow="never">
        <el-page-header @back="goBack" content="学生经历">
        </el-page-header>
        <div class="ql-snow">
            <div class="ql-editor" v-html="work.content" v-hljs></div>
        </div>
    </el-card>
</template>

<script>
    export default {
        name: "WorkInfo",
        data() {
            return {
                work: {
                    content: "<p><strong>技能列表</strong></p><p><strong>语言</strong>：熟练<strong>&nbsp;</strong>Java<strong>&nbsp;</strong>语言，了解<strong>&nbsp;</strong>go<strong>&nbsp;</strong>语言,熟悉<strong>&nbsp;</strong>C，C++。</p><p><br></p><p><strong>基础</strong>：&nbsp;熟悉<strong>&nbsp;</strong>Jvm<strong>&nbsp;</strong>的内存结构、垃圾收集器、GC<strong>&nbsp;</strong>算法、性能调优、面向对象开发、并发</p><p>\t           编程以及类加载机制、java 锁机制、I/O 模型、java线程池、socket编程。</p><p>\t           熟悉 Tcp\\ip、Udp 以及 Http 协议，熟悉 OSI 七层网络模型。</p><p><br></p><p><strong>技能</strong>：熟悉<strong>&nbsp;</strong>MySQL<strong>&nbsp;</strong>及<strong>&nbsp;</strong>redis<strong>&nbsp;</strong>、MySQL 锁机制，redis 分布式锁。</p><p>\t\t\t  熟悉redis<strong>&nbsp;</strong>的分布式原理，<strong>&nbsp;</strong>MySQL 缓存策略。</p><p>\t          熟练使用 SpringBoot、Netty、MyBatis 等开源框架、AOP，IOC以及动态代理原理。</p><p>\t          熟练 Nginx 框架的部署以及反向代理等使用方法。</p><p>\t          熟悉 Linux 操作系统，擅长常用基本命令。</p><p>\t          熟悉&nbsp;Git 分布式版本控制工具，自己写项目中在使用。</p><p>              了解前端基础知识(html,js,css)、VUE 框架以及 Element UI 的常用组件，可以编写简单的前端代码，有小型的 VUE 项目开发经验。</p><p>\t          了解大数据（<em>elas</em>tlcsearch<span style=\"color: rgb(51, 51, 51);\">、</span>&nbsp;hadoop、 zookeeper、 hbase 等）。</p><p>\t          了解 shell 编程，可以编写简单的 shell 脚本。</p><p><br></p><p><strong>项目经历</strong></p><p><img src=\"//:0\" height=\"3\" width=\"545\"></p><p>\t<strong>项目一: 小智搜索</strong></p><p><strong>             项目简介</strong>：本项目是一个基于<strong>&nbsp;</strong><em>elas</em>tlcsearch<strong>&nbsp;</strong>搜索服务引擎，通过关键字进行信息搜索，后期通过搜索次数可以对数据进行高低排序。</p><p><strong>             项目负责：</strong>我所负责的模块是通过关键字进行数据信息的查询，整体运用<strong>&nbsp;</strong>JAVA<strong>&nbsp;</strong>语言，通过使用库连接池来提高数据库的吞吐量和抗压能力，运用 redis 来缓存 key 失效数据。主框架是 netty，根据 URL 的接口调用,根据 url 里的字段利用反射实现方法的调用实现了发送邮件等慢速接口， 应用 nginx 来实现静态页面分发，部署服务器以及维护，与小组成员实现了前后联调，使用 jmeter 压测，上线。其余模块也均参与开发。</p><p><br></p><p>\t<strong>项目二：云智就医</strong></p><p><strong>            项目简介：</strong>该项目是一个在线医院预约服务以及后台管理的一套系统，用户端使用该平台进行看病预约，医生排班查询，查看预约记录等功能，医院后台可以进行挂号操作，病例管理，排号显示，职员管理等功能。</p><p><strong>           项目负责: </strong>该项目由我全部负责，从前台页面编写，到后台接口设计与实现，用户端与医院管理系统前端均使用 vue 与 element-ui 编写，使用 axios 框架进行网络请求，使用vue-cli进行前端开发，后台统一使用 java 语言开发，用springboot 搭建后台框架，redis 进行数据缓存，mysql作为数据库，使用 websocket 长连接进行消息通知，利用nginx实现静态页面分发。</p><p><br></p><p><br></p><p><strong>获得荣誉</strong></p><p><br></p><p>2018年08月在《电脑迷》发表过文章，国内期刊号：CN 50-1163/TP</p><p><br></p><p>2019年06月13日获得计算机软件著作权</p><p><br></p><p>获得全过数学建模大赛优秀奖</p><p><br></p><p><br></p><p><br></p><p><strong>教育经历</strong></p><p><img src=\"//:0\" height=\"3\" width=\"545\"></p><p>2016.09 – 2020.07 天职师大 (全日制统招本科) 软件工程系</p><p><br></p><p><strong>个人评价</strong></p><p><img src=\"//:0\" height=\"3\" width=\"545\"></p><p><span style=\"background-color: rgb(255, 255, 255);\">有在校一年以上与老师共同开发经历，主要负责后端开发，积极向上，有良好的人际沟通能力，良好的工作协调能力，踏实肯干的工作精神，不断学习新技术，对知识有强烈的求知欲，良好的编程能力和编程习惯。</span></p><p><br></p><p><br></p><p><strong>联系方式</strong>: 15810227076 | 1144502582@qq.com</p><p><strong>Github</strong>: <a href=\"https://github.com/Ich12138\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(0, 0, 255);\"><u>https://github.com/Ich12138</u></a></p><p><strong>英语水平</strong>：六级</p>"
                }
            }
        },
        methods: {
            //返回上一级页面
            goBack() {
                this.$router.back();
            }
        }
    }
</script>

<style scoped>
    .work-card {
        border-radius: 30px;
    }

    .work-card-header {
        font-weight: bold;
        text-align: left;
    }
</style>