<template>
  <el-card
      :body-style="{ padding: '0px' }"
      class="article-detail-card"
      shadow="never">
    <div slot="header" class="article-title">
      <el-page-header @back="goBack">
      </el-page-header>
      {{ blogDetail.blogTitle }}
      <el-divider content-position="right">
        <el-button type="text" icon="el-icon-download" @click="downLoadMdFile">下载md文件</el-button>
      </el-divider>
    </div>

    <mavon-editor
        :subfield="false"
        :defaultOpen="'preview'"
        :toolbarsFlag="false"
        :editable="false"
        :boxShadow="false"
        :scrollStyle="true"
        codeStyle="atom-one-dark"
        v-model="blogDetail.blogRawContent"/>

    <el-divider></el-divider>
    <div class="article-footer">
      <el-row :grunt="24">
        <el-col :span="6" :offset="2">
          <span class="article-footer-msg article-footer-span">标签</span>
          <el-divider direction="vertical"></el-divider>
          <el-tag class="article-footer-tag" v-for="(o, index) in blogDetail.blogTagList" :key="index">
            {{ o.name }}
          </el-tag>
        </el-col>
        <el-col :span="6" :offset="2">
          <span class="article-footer-msg article-footer-time">时间</span>
          <el-divider direction="vertical"></el-divider>
          <el-tag>{{ dateFormat(blogDetail.createTime) }}</el-tag>
        </el-col>
      </el-row>
    </div>

  </el-card>

</template>

<script>
import {request} from "@/network/request";
import moment from 'moment'

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
    /*日期处理*/
    dateFormat(date) {
      return moment(date).format("YYYY-MM-DD HH:mm")
    },

    //获取具体博客内容
    getBlogDetail() {
      let blogNo = this.$route.query.blogNo;
      console.log(blogNo);
      request({
        url: '/blog/query/one?blogNo=' + blogNo
      }).then(res => {
        let resData = res.data;
        if (resData.status === 200) {
          this.blogDetail = resData.result.data;
          this.blogDetail.blogTagList = JSON.parse(this.blogDetail.blogTagList)
          console.log(this.blogDetail);
        }
      })
    },

    //下载md文件
    downLoadMdFile() {
      window.location.href = "http://47.107.64.157:9192/api/blog/download/md?blogNo=" + this.blogDetail.blogNo;
    },

    //返回上一级页面
    goBack() {
      this.$router.back();
    }
  },
  computed: {}
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

.mavon-editor {
  height: 600px;
}

</style>