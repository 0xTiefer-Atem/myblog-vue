<template>
    <el-card
            :body-style="{ padding: '0px' }"
            class="article-detail-card"
            shadow="never">
        <div slot="header" class="article-title">
            <el-page-header @back="goBack">
            </el-page-header>{{blogDetail.blogTitle}}
        </div>


        <div class="ql-snow">
            <div  class="ql-editor" v-hljs v-highlight-b v-html="blogDetail.blogContent">
            </div>
        </div>
        <el-divider></el-divider>
        <div class="article-footer">
            <el-row :grunt="24">
                <el-col :span="6" :offset="2">
                    <span class="article-footer-msg article-footer-span">标签</span>
                    <el-divider direction="vertical"></el-divider>
                    <el-tag class="article-footer-tag" v-for="(o, index) in blogDetail.blogTagListJson" :key="index">
                        {{o.name}}
                    </el-tag>
                </el-col>
                <el-col :span="6" :offset="2">
                    <span class="article-footer-msg article-footer-time">时间</span>
                    <el-divider direction="vertical"></el-divider>
                    <el-tag>{{blogDetail.createTime}}</el-tag>
                </el-col>
            </el-row>
        </div>

    </el-card>

</template>

<script>
    import {request} from "../../../network/request";

    export default {
        name: "ArticleDetail",
        data() {
            return {
                blogDetail: {}
            }
        },
        activated() {
            this.getBlogDetail();
        },
        methods: {
            //获取具体博客内容

            getBlogDetail() {
                let id = this.$route.query.id;
                console.log(id);
                request({
                    url: '/blog/selectOne?id=' + id
                }).then(res => {
                    let resData = res.data;
                    console.log(resData);
                    if(resData.status === 2000) {
                        this.blogDetail = resData.result.data;
                    }
                })
            },


            //返回上一级页面
            goBack() {
                this.$router.back();
            }
        },
        computed: {
        }
    }

</script>

<style>

    .article-detail-card {
        border-radius: 30px;
    }

    .article-title {
        font-weight: bold;
        font-size: 30px;
    }

    .article-footer {
        margin-bottom: 20px;
    }

    .article-footer-tag {
        margin: 10px;
    }

    .article-footer-msg {
        color: #182555;
    }


</style>