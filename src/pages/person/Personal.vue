<template>
    <el-card class="personal-card" shadow="never">
        <el-row :gutter="24">
            <el-col :span="6" :offset="4" v-for="(info, index) in personalInfoList" :key="index">
                <el-card  :body-style="{ padding: '0px' }"
                          class="article-card"
                          shadow="hover">
                    <img src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg" class="image">
                    <el-row>
                        <el-col>
                            <div>
                                <el-card class="article-info-card" @click.native="personalDetailClick(index)" shadow="never">
                                    <div slot="header" class="article-title">
                                        自我介绍
                                    </div>
                                    <div class="article-cover-text">
                                        {{info.title}}
                                    </div>
                                    <el-divider></el-divider>
                                    <el-row :grunt="24">
                                        <el-col :span="12" :offset="12">
                                            <div>
                                                <el-tag style="width: 70%">{{info.updateTime}}</el-tag>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </el-card>
                            </div>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
    </el-card>
</template>

<script>
    export default {
        name: "Personal",
        data() {
            return {
                personalInfoList: [
                    {
                        title: "工作经历",
                        updateTime: "2020-08-09"
                    },
                    {
                        title: "学生经历",
                        updateTime: "2020-06-09"
                    },
                ]
            }
        },
        methods: {
            personalDetailClick(index) {
                if(index%2 === 0) {
                    this.$router.push("/my-blog/work-info");
                }else {
                    this.$router.push("/my-blog/student-info");
                }
            }
        }
    }
</script>

<style scoped>
    .personal-card {
        border-radius: 30px;
    }
    .image {
        width: 100%;
        display: block;
    }

    .article-card {
        border-radius: 30px;
        margin: 10px;
    }

    .article-list-card{
        border-radius: 30px;
    }

    .article-cover-text {
        margin: 10px;
        text-indent:34px;
        text-align:left;
        word-break:break-all;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;

    }

    .article-title {
        font-weight: bold;
        text-align:left;
        word-break:break-all;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

</style>