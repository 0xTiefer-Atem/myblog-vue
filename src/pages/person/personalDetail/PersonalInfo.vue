<template>
  <el-card class="work-card" shadow="never">
    <el-page-header @back="goBack" :content="pageHeader">
    </el-page-header>
    <mavon-editor
        :subfield="false"
        :defaultOpen="'preview'"
        :toolbarsFlag="false"
        :editable="false"
        :boxShadow="false"
        :scrollStyle="true"
        codeStyle="atom-one-dark"
        v-model="personalDetail.blogRawContent"/>
  </el-card>
</template>

<script>
import {request} from "@/network/request";


export default {
  name: "WorkInfo",
  data() {
    return {
      personalDetail: {},
      pageHeader: '',
    }
  },
  activated() {
    this.getBlogDetail()
  },
  methods: {


    //获取具体博客内容
    getBlogDetail() {
      let blogNo = this.$route.query.blogNo;
      if (blogNo === '002') {
        this.pageHeader = '工作经历'
      } else {
        this.pageHeader = '教育经历'
      }
      console.log(blogNo);
      request({
        url: 'blog/query/one?blogNo=' + blogNo
      }).then(res => {
        let resData = res.data;
        console.log(resData);
        if (resData.status === 200) {
          this.personalDetail = resData.result.data;
        }
      })
    },
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
</style>