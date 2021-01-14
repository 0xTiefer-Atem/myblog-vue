<template>
  <el-container style="height: 100%;">
    <el-header>
      <el-row :gutter="20">
        <el-col :span="4" :offset="6">
          <el-menu router
                   :default-active="activePath"
                   class="el-menu-demo"
                   mode="horizontal"
                   @select="handleSelect">
            <el-menu-item
                :key="index"
                :index="baseUrl + menu.menuPath "
                v-for="(menu, index) in menuList">
              {{ menu.menuName }}
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="8">
          <el-input style="margin-top: 20px" placeholder="请输入内容" v-model="searchKey" class="input-with-select">
            <el-select style="width: 150px" v-model="type" slot="prepend" placeholder="请选择文章类型">
              <el-option v-for="item in typeList" :label="item" :value="item"></el-option>
            </el-select>
            <el-button slot="append" @click="searchBlog" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>
    </el-header>

    <el-container>
      <el-aside width="350px">
        <el-card style="margin-left: 5px;border-radius: 30px;" shadow="never">
          <el-row>
            <el-col>
              <el-avatar shape="square" :size="150" :src="userInfo.userAvatar"></el-avatar>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <span class="my-name">{{ userInfo.userName }}</span><br>
              <el-divider style="margin: 0px"></el-divider>
              <span class="my-motto">{{ userInfo.userMotor }}</span>
              <el-divider></el-divider>
            </el-col>
          </el-row>
          <el-row>
            <h4>相关网址</h4>
            <el-col>

              <el-link v-for="(item, index) in userInfo.userRelatedLinks"
                       :key="index" target="_blank"
                       :href="item.webLink"
                       type="primary"
                       :underline="false">
                <div style="margin-right: 10px">
                  {{ item.webName }}
                </div>
              </el-link>
            </el-col>
          </el-row>
          <el-divider></el-divider>
          <h4 style="margin: 10px 0px 0px;">个人能力值</h4>
          <el-card shadow="hover" class="skill-card" v-for="(item, index) in userInfo.userSkillInfoList"
                   :key="index">
            <el-row :gutter="24">
              <el-col :span="10">
                <div class="skill-text">
                  {{ item.skillName }}
                </div>
              </el-col>
              <el-col :span="14">
                <el-progress class="skill-progress" :percentage="item.skillPercentage" :show-text="false"></el-progress>
              </el-col>
            </el-row>
          </el-card>
        </el-card>
      </el-aside>
      <el-main>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {request} from "@/network/request";

export default {
  name: "Home",
  data() {
    return {
      searchWord: '',
      baseUrl: "/my-blog",
      activePath: "/my-blog/articles-list",
      menuList: [
        {
          menuName: '文章',
          menuPath: '/articles-list'
        }, {
          menuName: '个人',
          menuPath: '/personal'
        }
      ],
      userInfo: {},
      searchKey: '',
      type: '',
      typeList: ['java', '机器学习', 'test'],
    };
  },
  created() {
    request({
      url: '/blog/select/user/info?userNo=001'
    }).then(res => {
      let resData = res.data;
      if (resData.status === 200) {
        // console.log(resData.result.data)
        this.userInfo = resData.result.data
        this.userInfo.userRelatedLinks = JSON.parse(this.userInfo.userRelatedLinks)
        this.userInfo.userSkillInfoList = JSON.parse(this.userInfo.userSkillInfoList)
      } else {
        this.$message.error('个人信息加载失败')
      }
    }).catch(err => {
      this.$message.error('个人信息加载失败')
    })

    request({
      url: '/blog/query/types'
    }).then(res => {
      let resData = res.data;
      if (resData.status === 200) {
        this.typeList = resData.result.data
      }
    })
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
      this.activePath = key
    },

    searchBlog() {
      console.log(this.type, this.searchKey)
    }
  }
}
</script>

<style scoped>
.home-button {
  margin-top: 10px;
}

.my-icon {
  margin-right: 10px;
}

.skill-card {
  margin-top: 10px;
}

.skill-progress {
  margin-top: 10px;
}

.skill-text {
  font-size: 18px;
}

.my-name {
  font-weight: bold;
}

.my-motto {
  font-style: italic;
}

.web-link {
  margin-right: 100px;
}
</style>