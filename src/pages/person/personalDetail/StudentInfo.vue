<template>
    <el-card class="student-card" shadow="never">
        <el-page-header @back="goBack" content="学生经历">
        </el-page-header>
        <div class="ql-snow">
            <div class="ql-editor" v-html="student.content" v-hljs></div>
        </div>
    </el-card>
</template>

<script>
    export default {
        name: "StudentInfo",
        data() {
            return {
                student: {
                    content: "<p class=\"ql-align-justify\">\t<strong style=\"color: rgb(0, 0, 0);\" class=\"ql-size-large\">基本学习情况</strong></p><p class=\"ql-align-justify\"><span class=\"ql-size-small\">\t</span><span style=\"color: rgb(0, 0, 0);\" class=\"ql-size-small\">1、大学的绩点成绩为3.4(满分为5分)</span></p><p class=\"ql-align-justify\"><span class=\"ql-size-small\">\t</span><span style=\"color: rgb(0, 0, 0);\" class=\"ql-size-small\">2、校高数竞赛二等奖、校奖学金</span></p><p class=\"ql-align-justify\"><span class=\"ql-size-small\">\t</span><span style=\"color: rgb(0, 0, 0);\" class=\"ql-size-small\">3、在本专业的排名前三年为第三名，大四上第二名</span></p><p class=\"ql-align-justify\"><span class=\"ql-size-small\">\t</span><span style=\"color: rgb(0, 0, 0);\" class=\"ql-size-small\">4、参加了全国数学建模比赛，并获得了优秀奖</span></p><p class=\"ql-align-justify\"><span class=\"ql-size-small\">\t</span><span style=\"color: rgb(0, 0, 0);\" class=\"ql-size-small\">5、在校期间担任学习委员与院微开发协会技术部部长一职，平时为同学和社团的成员进行学习上的交流，做项目。</span></p><p class=\"ql-align-justify\"><span class=\"ql-size-small\">\t</span><span style=\"color: rgb(0, 0, 0);\" class=\"ql-size-small\">6、在计算机方面，除了在大学期间学过的专业课程，课余时间还在老师的指导下完成比赛项目，担任大学生创新创业的负责人并顺利结项，在导师的指导下与组员一同在电脑迷这部期刊下发表了文章，并申请了软件著作权。</span></p><p class=\"ql-align-justify\"><span class=\"ql-size-small\">\t</span><span style=\"color: rgb(0, 0, 0);\" class=\"ql-size-small\">7、在阿里云上申请了自己的云服务器，并在上面进行项目部署和维护，此外还申请了个人github账号(地址:&nbsp;</span><a href=\"https://github.com/Ich12138\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(0, 0, 0);\" class=\"ql-size-small\">https://github.com/Ich12138</a><span style=\"color: rgb(0, 0, 0);\" class=\"ql-size-small\">)，用作代码保存和维护，毕业设计就是与同学一起使用github协同开发。</span></p><p class=\"ql-align-justify\"><span class=\"ql-size-small\">\t</span><span style=\"color: rgb(0, 0, 0);\" class=\"ql-size-small\">8、在英语方面，通过了四级(508)、六级(431)，具备了一定的英语听、说、读、写能力，但我目前仍旧准备进一步学习，为以后阅读论文做好准备。<span class=\"ql-cursor\">﻿</span></span></p>"
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
    .student-card {
        border-radius: 30px;
    }

    .student-card-header {
        font-weight: bold;
        text-align: left;
    }
</style>