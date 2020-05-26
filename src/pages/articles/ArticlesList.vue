<template>
    <el-card class="article-list-card" shadow="never">
        <el-row :gutter="24">
            <el-col :span="8" v-for="(item, index) in blogList" :key="index">
                <el-card  :body-style="{ padding: '0px' }"
                          class="article-card"
                          shadow="hover">
                    <img src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg" class="image">
                    <el-row>
                        <el-col>
                            <div>
                                <el-card class="article-info-card" @click.native="articleDetailClick(item.blogId)" shadow="never">
                                    <div slot="header" class="article-title">
                                        {{item.blogTitle}}
                                    </div>
                                    <div class="article-cover-text">
                                        分类: {{item.blogType}}
                                    </div>
                                    <el-divider></el-divider>
                                    <el-row :grunt="24">
                                        <el-col :span="12">
                                            <el-tag v-for="(o, index) in item.blogTagListJson" :key="index" style="margin: 5px; float: left">{{o.name}}</el-tag>
                                        </el-col>
                                        <el-col :span="12">
                                            <div>
                                                <el-tag style="width: 70%">2020-8-7</el-tag>
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
        <el-pagination
                background
                layout="prev, pager, next"
                :current-page="pageIndex"
                @current-change="currentChange"
                @prev-click="currentChange"
                @next-click="currentChange"
                :total="total">
        </el-pagination>
    </el-card>
</template>

<script>
  import {request} from "../../network/request";

  export default {
      name: "ArticlesList",
      data() {
          return {
              //当前页数
              pageIndex: 1,
              //总页数
              total: 100,

              //每页大小
              pageSize: 6,

              //文章列表
              blogList: [],
          };
      },
      activated() {
          request({
              url: '/blog/selectAll',
              method: 'get'
          }).then( res => {
              let resData = res.data;
              console.log(resData);
              if(resData.status === 2000) {
                  this.blogList = resData.result.data;
              }
          })
      },
      methods: {
          articleDetailClick(id) {
              console.log(id)
              let query = {
                  id
              }
              this.$router.push({
                  path: "/my-blog/article-detail",
                  query
              });
          },
          currentChange(pageIndex) {
              console.log(pageIndex);
          },
      }
  }
</script>

<style scoped>
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