<template>
  <el-card class="article-list-card" shadow="never">
    <el-row :gutter="24">
      <el-col v-if="blogList.length !== 0" :span="8" v-for="(item, index) in blogList" :key="index">
        <el-card :body-style="{ padding: '0px' }"
                 class="article-card"
                 shadow="hover">
          <img :src="item.blogCoverUrl" class="image">
          <el-row>
            <el-col>
              <div>
                <el-card class="article-info-card" @click.native="articleDetailClick(item.blogNo)" shadow="never">
                  <div slot="header" class="article-title">
                    {{ item.blogTitle }}
                  </div>
                  <div class="article-cover-text">
                    概要: {{ item.blogOverview }}
                  </div>
                  <el-divider></el-divider>
                  <el-row :grunt="24">
                    <el-col :span="12">
                      <el-tag v-for="(o, index) in item.blogTagList" :key="index" style="margin: 5px; float: left">
                        {{ o.name }}
                      </el-tag>
                    </el-col>
                    <el-col :span="12">
                      <div>
                        <el-tag style="width: 70%">{{ dateFormat(item.createTime) }}</el-tag>
                      </div>
                    </el-col>
                  </el-row>
                </el-card>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col v-else>
        <div>暂无数据</div>
      </el-col>
    </el-row>
    <el-pagination
        background
        layout="prev, pager, next"
        :current-page="pageIndex"
        @current-change="currentPageChange"
        @prev-click="currentPageChange"
        @next-click="currentPageChange"
        :page-size="pageSize"
        :total="total">
    </el-pagination>
  </el-card>
</template>

<script>
import {request} from "@/network/request";
import moment from "_moment@2.29.0@moment";

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
    this.currentPageChange(1)
  },
  methods: {
    /*日期处理*/
    dateFormat(date) {
      return moment(date).format("YYYY-MM-DD HH:mm")
    },
    articleDetailClick(blogNo) {
      // console.log(blogNo)
      let query = {
        blogNo
      }
      this.$router.push({
        path: "/my-blog/article-detail",
        query
      });
    },
    currentPageChange(pageIndex) {
      request({
        url: '/blog/list?pageNum=' + pageIndex + '&pageSize=' + this.pageSize,
        method: 'get'
      }).then(res => {
        let resData = res.data;
        console.log(resData);
        if (resData.status === 200) {
          let pageData = resData.result.data;
          this.pageIndex = pageData.pageNum;
          this.blogList = resData.result.data.list;
          this.optBlogTagList()
          this.total = pageData.total;
          // console.log(this.blogList)
        } else {
          this.$message.error("文章查询失败")
        }
      })
    },

    //数据处理
    optBlogTagList() {
      for (let i = 0; i < this.blogList.length; i++) {
        this.blogList[i].blogTagList = JSON.parse(this.blogList[i].blogTagList)
      }
    }
  }
}
</script>

<style scoped>
.image {
  width: 100%;
  height: 297px;
  display: block;
}

.article-card {
  border-radius: 30px;
  margin: 10px;
}

.article-list-card {
  border-radius: 30px;
}

.article-cover-text {
  margin: 10px;
  text-indent: 34px;
  text-align: left;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

}

.article-title {
  font-weight: bold;
  text-align: left;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>