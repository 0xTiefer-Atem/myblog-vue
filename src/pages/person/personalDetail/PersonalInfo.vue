<template>
  <el-card class="work-card" shadow="never">
    <el-page-header @back="goBack" :content="pageHeader">
    </el-page-header>
<!--    <div class="ql-snow">-->
<!--      <div class="ql-editor" v-html="workDetail.blogContent" v-hljs></div>-->
<!--    </div>-->
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
      let id = this.$route.query.id;
      if (id === '002') {
        this.pageHeader = '项目经历'
      } else {
        this.pageHeader = '教育经历'
      }
      console.log(id);
      request({
        url: 'blog/query/one?blogId=' + id
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

.work-card-header {
  font-weight: bold;
  text-align: left;
}
</style>