<template>
    <el-container style="height: 100%;">
        <el-header>
            <el-row :gutter="20">
                <el-col :span="8" :offset="6">
                    <el-menu router
                             :default-active="activePath"
                             class="el-menu-demo"
                             mode="horizontal"
                             @select="handleSelect">
                        <el-menu-item
                                :key="index"
                                :index="baseUrl + menu.menuPath "
                                v-for="(menu, index) in menuList">
                            {{menu.menuName}}
                        </el-menu-item>
                    </el-menu>
                </el-col>
<!--                <el-col :span="5">-->
<!--                    <el-input :value="searchWord" class="home-button" placeholder="搜索文章内容"></el-input>-->
<!--                </el-col>-->
<!--                <el-col :span="1">-->
<!--                    <el-button class="home-button" icon="el-icon-search" circle></el-button>-->
<!--                </el-col>-->
            </el-row>
        </el-header>

        <el-container>
            <el-aside width="350px">
                <el-card style="margin-left: 5px;border-radius: 30px;" shadow="never">
                    <el-row>
                        <el-col>
                            <el-avatar shape="square" :size="150" src="https://avatars2.githubusercontent.com/u/41837316?s=460&u=a0defd7228d4f3553f6047340f6d68fdea8105d4&v=4"></el-avatar>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <span class="my-name">0xTiefer_Atem</span><br>
                            <el-divider style="margin: 0px"></el-divider>
                            <span class="my-motto">Technology changes the world</span>
                            <el-divider></el-divider>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-link href="https://github.com/Ich12138" style="margin: 0px" :underline="false">
                                <el-avatar class="my-icon" size="small" src="https://s.cn.bing.net/th?id=AMMS_538ac5fe8754dd7df7589f49378971dc&w=39&h=39&c=7&rs=1&qlt=90&p=0&cdv=1&pid=RS">
                                </el-avatar>
                            </el-link>
                        </el-col>
                    </el-row>
                        <h4 style="margin: 0px">个人能力值</h4>
                        <el-card shadow="hover" class="skill-card" v-for="(item, index) in skillInfoList" :key="index">
                            <el-row :gutter="24">
                                <el-col :span="10">
                                    <div class="skill-text">
                                        {{item.skillName}}
                                    </div>
                                </el-col>
                                <el-col :span="14">
                                    <el-progress class="skill-progress"  :percentage="item.skillPercentage" :show-text="false"></el-progress>
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
                    },{
                        menuName: '个人',
                        menuPath: '/personal'
                    }
                ],
                skillInfoList: [
                    {
                        skillName: '学习能力',
                        skillPercentage: 95,
                        skillCondition: ''
                    },
                    {
                        skillName: 'java',
                        skillPercentage: 85,
                    },
                    {
                        skillName: '算法',
                        skillPercentage: 50,
                    },
                    {
                        skillName: 'vue',
                        skillPercentage: 70,
                    },
                    {
                        skillName: '数据结构',
                        skillPercentage: 80,
                    }
                ],

            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
                this.activePath = key
            }
        }
    }
</script>

<style scoped>
    .home-button {
        margin-top: 10px;
    }

    .my-icon {
        margin: 0px;
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



</style>