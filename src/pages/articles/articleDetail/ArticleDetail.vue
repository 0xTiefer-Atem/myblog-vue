<template>

    <el-card
            :body-style="{ padding: '0px' }"
            class="article-detail-card"
            shadow="never">
        <div slot="header" class="article-title">
            <el-page-header @back="goBack">
            </el-page-header>{{article.title}}
        </div>


        <div class="ql-snow">
            <div class="ql-editor" v-html="article.content" v-hljs></div>
        </div>
        <el-divider></el-divider>
        <div class="article-footer">
            <el-row :grunt="24">
                <el-col :span="6" :offset="2">
                    <span class="article-footer-msg article-footer-span">标签</span>
                    <el-divider direction="vertical"></el-divider>
                    <el-tag class="article-footer-tag" v-for="(o, index) in article.tag" :key="index">
                        {{o.name}}
                    </el-tag>
                </el-col>
                <el-col :span="6" :offset="2">
                    <span class="article-footer-msg article-footer-time">时间</span>
                    <el-divider direction="vertical"></el-divider>
                    <el-tag>{{article.createTime}}</el-tag>
                </el-col>
            </el-row>
        </div>

    </el-card>

</template>

<script>

    export default {
        name: "ArticleDetail",
        data() {
            return {
                article: {
                    title: "几个Hash容器的区别",
                    content: "<p><strong class=\"ql-font-monospace ql-size-large\">HashMap和Hashtable的区别</strong></p><p><br></p><p><span class=\"ql-font-monospace\">两者最主要的区别在于Hashtable是线程安全，而HashMap则非线程安全</span></p><p><br></p><p><span class=\"ql-font-monospace\">Hashtable的实现方法里面都添加了synchronized关键字来确保线程同步，因此相对而言HashMap性能会高一些，我们平时使用时若无特殊需求建议使用HashMap，在多线程环境下若使用HashMap需要使用Collections.synchronizedMap()方法来获取一个线程安全的集合（Collections.synchronizedMap()实现原理是Collections定义了一个SynchronizedMap的内部类，这个类实现了Map接口，在调用方法时使用synchronized来保证线程同步,当然了实际上操作的还是我们传入的HashMap实例，简单的说就是Collections.synchronizedMap()方法帮我们在操作HashMap时自动添加了synchronized来实现线程同步，类似的其它Collections.synchronizedXX方法也是类似原理）</span></p><p><br></p><p><br></p><blockquote><span class=\"ql-font-monospace\">HashMap可以使用null作为key，而Hashtable则不允许null作为key</span></blockquote><blockquote><span class=\"ql-font-monospace\">虽说HashMap支持null值作为key，不过建议还是尽量避免这样使用，因为一旦不小心使用了，若\t\t\t因此引发一些问题，排查起来很是费事</span></blockquote><blockquote><span class=\"ql-font-monospace\">HashMap以null作为key时，总是存储在table数组的第一个节点上</span></blockquote><blockquote><span class=\"ql-font-monospace\">HashMap是对Map接口的实现，HashTable实现了Map接口和Dictionary抽象类</span></blockquote><blockquote><span class=\"ql-font-monospace\">HashMap的初始容量为16，Hashtable初始容量为11，两者的填充因子默认都是0.75</span></blockquote><blockquote><span class=\"ql-font-monospace\">HashMap扩容时是当前容量翻倍即:capacity*2，Hashtable扩容时是容量翻倍+1即:capacity*2+1</span></blockquote><blockquote><span class=\"ql-font-monospace\">两者计算hash的方法不同</span></blockquote><p><br></p><p><br></p><p><span class=\"ql-font-monospace\">Hashtable计算hash是直接使用</span><span class=\"hljs-meta ql-font-monospace\">key</span><span class=\"ql-font-monospace\">的hashcode对</span><span class=\"hljs-meta ql-font-monospace\">table</span><span class=\"ql-font-monospace\">数组的长度直接进行取模</span></p><pre class=\"ql-syntax\" spellcheck=\"false\"><span class=\"hljs-type\">int</span> hash = key.hashCode();\n" +
                        "<span class=\"hljs-type\">int</span> <span class=\"hljs-keyword\">index</span> = (hash &amp; <span class=\"hljs-number\">0x7FFFFFFF</span>) % tab.<span class=\"hljs-built_in\">length</span>;\n" +
                        "</pre><p><br></p><p><br></p><p><span class=\"ql-font-monospace\">HashMap计算hash对key的hashcode进行了二次hash，以获得更好的散列值，然后对table数组长度取摸</span></p><pre class=\"ql-syntax\" spellcheck=\"false\">static <span class=\"hljs-type\">int</span> hash(<span class=\"hljs-type\">int</span> h) {\n" +
                        "        // This <span class=\"hljs-keyword\">function</span> ensures that hashCodes that differ <span class=\"hljs-keyword\">only</span> <span class=\"hljs-keyword\">by</span>// <span class=\"hljs-keyword\">constant</span> multiples at <span class=\"hljs-keyword\">each</span> <span class=\"hljs-type\">bit</span> position have a bounded// number <span class=\"hljs-keyword\">of</span> collisions (approximately <span class=\"hljs-number\">8</span> at <span class=\"hljs-keyword\">default</span> <span class=\"hljs-keyword\">load</span> factor).\n" +
                        "        h ^= (h &gt;&gt;&gt; <span class=\"hljs-number\">20</span>) ^ (h &gt;&gt;&gt; <span class=\"hljs-number\">12</span>);\n" +
                        "        <span class=\"hljs-keyword\">return</span> h ^ (h &gt;&gt;&gt; <span class=\"hljs-number\">7</span>) ^ (h &gt;&gt;&gt; <span class=\"hljs-number\">4</span>);\n" +
                        "}\n" +
                        "\n" +
                        " static <span class=\"hljs-type\">int</span> indexFor(<span class=\"hljs-type\">int</span> h, <span class=\"hljs-type\">int</span> length) {\n" +
                        "        <span class=\"hljs-keyword\">return</span> h &amp; (length<span class=\"hljs-number\">-1</span>);\n" +
                        "}\n" +
                        "</pre><p><span class=\"ql-font-monospace\">&nbsp;</span></p><p><span class=\"ql-font-monospace\">HashMap和Hashtable的底层实现都是数组+链表结构实现</span></p><p><br></p><p><br></p><p><br></p><p><strong class=\"ql-font-monospace ql-size-large\">HashSet和HashMap、Hashtable的区别</strong></p><p><span class=\"ql-font-monospace\">除开HashMap和Hashtable外，还有一个hash集合HashSet，可以为空，有所区别的是HashSet不是key value结构，仅仅是存储不重复的元素，相当于简化版的HashMap，只是包含HashMap中的key而已<span class=\"ql-cursor\">﻿</span></span></p><p><br></p><p><span class=\"ql-font-monospace\">通过查看源码也证实了这一点，HashSet内部就是使用HashMap实现，只不过HashSet里面的HashMap所有的value都是同一个Object而已，因此HashSet也是非线程安全的，至于HashSet和Hashtable的区别，HashSet就是个简化的HashMap的，所以你懂的</span></p><p><span class=\"ql-font-monospace\">下面是HashSet几个主要方法的实现</span></p><pre class=\"ql-syntax\" spellcheck=\"false\">  <span class=\"hljs-keyword\">private</span> <span class=\"hljs-keyword\">transient</span> <span class=\"hljs-keyword\">HashMap</span> <span class=\"hljs-built_in\">map</span>;\n" +
                        "  <span class=\"hljs-keyword\">private</span> <span class=\"hljs-keyword\">static</span> <span class=\"hljs-keyword\">final</span> <span class=\"hljs-keyword\">Object</span> PRESENT = <span class=\"hljs-keyword\">new</span> <span class=\"hljs-keyword\">Object</span>();\n" +
                        "  \n" +
                        "  <span class=\"hljs-keyword\">public</span> HashSet() {\n" +
                        "    <span class=\"hljs-built_in\">map</span> = <span class=\"hljs-keyword\">new</span> <span class=\"hljs-keyword\">HashMap</span>();\n" +
                        "    }\n" +
                        " <span class=\"hljs-keyword\">public</span> <span class=\"hljs-built_in\">boolean</span> contains(<span class=\"hljs-keyword\">Object</span> o) {\n" +
                        "    <span class=\"hljs-keyword\">return</span> <span class=\"hljs-built_in\">map</span>.containsKey(o);\n" +
                        "    }\n" +
                        " <span class=\"hljs-keyword\">public</span> <span class=\"hljs-built_in\">boolean</span> <span class=\"hljs-built_in\">add</span>(E e) {\n" +
                        "    <span class=\"hljs-keyword\">return</span> <span class=\"hljs-built_in\">map</span>.put(e, PRESENT)==<span class=\"hljs-keyword\">null</span>;\n" +
                        "    }\n" +
                        " <span class=\"hljs-keyword\">public</span> <span class=\"hljs-built_in\">boolean</span> <span class=\"hljs-built_in\">add</span>(E e) {\n" +
                        "    <span class=\"hljs-keyword\">return</span> <span class=\"hljs-built_in\">map</span>.put(e, PRESENT)==<span class=\"hljs-keyword\">null</span>;\n" +
                        "    }\n" +
                        " <span class=\"hljs-keyword\">public</span> <span class=\"hljs-built_in\">boolean</span> remove(<span class=\"hljs-keyword\">Object</span> o) {\n" +
                        "    <span class=\"hljs-keyword\">return</span> <span class=\"hljs-built_in\">map</span>.remove(o)==PRESENT;\n" +
                        "    }\n" +
                        "\n" +
                        "\n" +
                        " <span class=\"hljs-keyword\">public</span> <span class=\"hljs-keyword\">void</span> <span class=\"hljs-built_in\">clear</span>() {\n" +
                        "    <span class=\"hljs-built_in\">map</span>.<span class=\"hljs-built_in\">clear</span>();\n" +
                        " }\n" +
                        "</pre>",
                    tag:[
                        {
                            name: 'java'
                        },
                        {
                            name: 'hashMap'
                        },
                        {
                            name: '源码'
                        },
                    ],
                    createTime: "2020-08-09"
                }
            }
        },

        computed: {
            editor() {
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