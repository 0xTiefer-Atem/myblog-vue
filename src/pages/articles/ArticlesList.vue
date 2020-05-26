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
                                <el-card class="article-info-card" @click.native="articleDetailClick" shadow="never">
                                    <div slot="header" class="article-title">
                                        {{item.blogTitle}}
                                    </div>
                                    <div class="article-cover-text">
                                        {{item.blogType}}
                                    </div>
                                    <el-divider></el-divider>
                                    <el-row :grunt="24">
                                        <el-col :span="12">
                                            <el-tag v-for="(o, index) in item.blogTagList" :key="index" style="margin: 5px; float: left">{{o.name}}</el-tag>
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
                blogList: [
                    {
                        id: 1,
                        blogId: "001",
                        blogType: "技术",
                        blogTagList: [
                            {
                                name: "java"
                            },
                            {
                                name: "hashMap"
                            },
                            {
                                name: "源码"
                            }
                        ],
                        blogTitle: "几个Hash容器的区别",
                        blogContent: "<p><strong class=\"ql-size-large ql-font-monospace\">HashMap和Hashtable的区别</strong></p><p><br></p><p><span class=\"ql-font-monospace\">两者最主要的区别在于Hashtable是线程安全，而HashMap则非线程安全</span></p><p><br></p><p><span class=\"ql-font-monospace\">Hashtable的实现方法里面都添加了synchronized关键字来确保线程同步，因此相对而言HashMap性能会高一些，我们平时使用时若无特殊需求建议使用HashMap，在多线程环境下若使用HashMap需要使用Collections.synchronizedMap()方法来获取一个线程安全的集合（Collections.synchronizedMap()实现原理是Collections定义了一个SynchronizedMap的内部类，这个类实现了Map接口，在调用方法时使用synchronized来保证线程同步,当然了实际上操作的还是我们传入的HashMap实例，简单的说就是Collections.synchronizedMap()方法帮我们在操作HashMap时自动添加了synchronized来实现线程同步，类似的其它Collections.synchronizedXX方法也是类似原理）</span></p><p><br></p><p><br></p><blockquote><span class=\"ql-font-monospace\">HashMap可以使用null作为key，而Hashtable则不允许null作为key</span></blockquote><blockquote><span class=\"ql-font-monospace\">虽说HashMap支持null值作为key，不过建议还是尽量避免这样使用，因为一旦不小心使用了，若\t\t\t因此引发一些问题，排查起来很是费事</span></blockquote><blockquote><span class=\"ql-font-monospace\">HashMap以null作为key时，总是存储在table数组的第一个节点上</span></blockquote><blockquote><span class=\"ql-font-monospace\">HashMap是对Map接口的实现，HashTable实现了Map接口和Dictionary抽象类</span></blockquote><blockquote><span class=\"ql-font-monospace\">HashMap的初始容量为16，Hashtable初始容量为11，两者的填充因子默认都是0.75</span></blockquote><blockquote><span class=\"ql-font-monospace\">HashMap扩容时是当前容量翻倍即:capacity*2，Hashtable扩容时是容量翻倍+1即:capacity*2+1</span></blockquote><blockquote><span class=\"ql-font-monospace\">两者计算hash的方法不同</span></blockquote><p><br></p><p><br></p><p><span class=\"ql-font-monospace\">Hashtable计算hash是直接使用</span><span class=\"ql-font-monospace hljs-meta\">key</span><span class=\"ql-font-monospace\">的hashcode对</span><span class=\"ql-font-monospace hljs-meta\">table</span><span class=\"ql-font-monospace\">数组的长度直接进行取模</span></p><pre class=\"ql-syntax\" spellcheck=\"false\">int hash = key.hashCode();\nint index = (hash &amp; 0x7FFFFFFF) % tab.length;\n</pre><p><br></p><p><br></p><p><span class=\"ql-font-monospace\">HashMap计算hash对key的hashcode进行了二次hash，以获得更好的散列值，然后对table数组长度取摸</span></p><pre class=\"ql-syntax\" spellcheck=\"false\">static int hash(int h) {\n        // This function ensures that hashCodes that differ only by// constant multiples at each bit position have a bounded// number of collisions (approximately 8 at default load factor).\n        h ^= (h &gt;&gt;&gt; 20) ^ (h &gt;&gt;&gt; 12);\n        return h ^ (h &gt;&gt;&gt; 7) ^ (h &gt;&gt;&gt; 4);\n}\n\n static int indexFor(int h, int length) {\n        return h &amp; (length-1);\n}\n</pre><p><span class=\"ql-font-monospace\">&nbsp;</span></p><p><span class=\"ql-font-monospace\">HashMap和Hashtable的底层实现都是数组+链表结构实现</span></p><p><br></p><p><br></p><p><br></p><p><strong class=\"ql-size-large ql-font-monospace\">HashSet和HashMap、Hashtable的区别</strong></p><p><span class=\"ql-font-monospace\">除开HashMap和Hashtable外，还有一个hash集合HashSet，可以为空，有所区别的是HashSet不是key value结构，仅仅是存储不重复的元素，相当于简化版的HashMap，只是包含HashMap中的key而已﻿</span></p><p><br></p><p><span class=\"ql-font-monospace\">通过查看源码也证实了这一点，HashSet内部就是使用HashMap实现，只不过HashSet里面的HashMap所有的value都是同一个Object而已，因此HashSet也是非线程安全的，至于HashSet和Hashtable的区别，HashSet就是个简化的HashMap的，所以你懂的</span></p><p><span class=\"ql-font-monospace\">下面是HashSet几个主要方法的实现</span></p><pre class=\"ql-syntax\" spellcheck=\"false\">  private transient HashMap map;\n  private static final Object PRESENT = new Object();\n  \n  public HashSet() {\n    map = new HashMap();\n    }\n public boolean contains(Object o) {\n    return map.containsKey(o);\n    }\n public boolean add(E e) {\n    return map.put(e, PRESENT)==null;\n    }\n public boolean add(E e) {\n    return map.put(e, PRESENT)==null;\n    }\n public boolean remove(Object o) {\n    return map.remove(o)==PRESENT;\n    }\n\n\n public void clear() {\n    map.clear();\n }\n</pre><p><br></p>",
                        createTime: "2020-05-18T15:15:01.000+0000"
                    },
                    {
                        id: 1,
                        blogId: "001",
                        blogType: "技术",
                        blogTagList: [
                            {
                                name: "java"
                            },
                            {
                                name: "hashMap"
                            },
                            {
                                name: "源码"
                            }
                        ],
                        blogTitle: "几个Hash容器的区别",
                        blogContent: "<p><strong class=\"ql-size-large ql-font-monospace\">HashMap和Hashtable的区别</strong></p><p><br></p><p><span class=\"ql-font-monospace\">两者最主要的区别在于Hashtable是线程安全，而HashMap则非线程安全</span></p><p><br></p><p><span class=\"ql-font-monospace\">Hashtable的实现方法里面都添加了synchronized关键字来确保线程同步，因此相对而言HashMap性能会高一些，我们平时使用时若无特殊需求建议使用HashMap，在多线程环境下若使用HashMap需要使用Collections.synchronizedMap()方法来获取一个线程安全的集合（Collections.synchronizedMap()实现原理是Collections定义了一个SynchronizedMap的内部类，这个类实现了Map接口，在调用方法时使用synchronized来保证线程同步,当然了实际上操作的还是我们传入的HashMap实例，简单的说就是Collections.synchronizedMap()方法帮我们在操作HashMap时自动添加了synchronized来实现线程同步，类似的其它Collections.synchronizedXX方法也是类似原理）</span></p><p><br></p><p><br></p><blockquote><span class=\"ql-font-monospace\">HashMap可以使用null作为key，而Hashtable则不允许null作为key</span></blockquote><blockquote><span class=\"ql-font-monospace\">虽说HashMap支持null值作为key，不过建议还是尽量避免这样使用，因为一旦不小心使用了，若\t\t\t因此引发一些问题，排查起来很是费事</span></blockquote><blockquote><span class=\"ql-font-monospace\">HashMap以null作为key时，总是存储在table数组的第一个节点上</span></blockquote><blockquote><span class=\"ql-font-monospace\">HashMap是对Map接口的实现，HashTable实现了Map接口和Dictionary抽象类</span></blockquote><blockquote><span class=\"ql-font-monospace\">HashMap的初始容量为16，Hashtable初始容量为11，两者的填充因子默认都是0.75</span></blockquote><blockquote><span class=\"ql-font-monospace\">HashMap扩容时是当前容量翻倍即:capacity*2，Hashtable扩容时是容量翻倍+1即:capacity*2+1</span></blockquote><blockquote><span class=\"ql-font-monospace\">两者计算hash的方法不同</span></blockquote><p><br></p><p><br></p><p><span class=\"ql-font-monospace\">Hashtable计算hash是直接使用</span><span class=\"ql-font-monospace hljs-meta\">key</span><span class=\"ql-font-monospace\">的hashcode对</span><span class=\"ql-font-monospace hljs-meta\">table</span><span class=\"ql-font-monospace\">数组的长度直接进行取模</span></p><pre class=\"ql-syntax\" spellcheck=\"false\">int hash = key.hashCode();\nint index = (hash &amp; 0x7FFFFFFF) % tab.length;\n</pre><p><br></p><p><br></p><p><span class=\"ql-font-monospace\">HashMap计算hash对key的hashcode进行了二次hash，以获得更好的散列值，然后对table数组长度取摸</span></p><pre class=\"ql-syntax\" spellcheck=\"false\">static int hash(int h) {\n        // This function ensures that hashCodes that differ only by// constant multiples at each bit position have a bounded// number of collisions (approximately 8 at default load factor).\n        h ^= (h &gt;&gt;&gt; 20) ^ (h &gt;&gt;&gt; 12);\n        return h ^ (h &gt;&gt;&gt; 7) ^ (h &gt;&gt;&gt; 4);\n}\n\n static int indexFor(int h, int length) {\n        return h &amp; (length-1);\n}\n</pre><p><span class=\"ql-font-monospace\">&nbsp;</span></p><p><span class=\"ql-font-monospace\">HashMap和Hashtable的底层实现都是数组+链表结构实现</span></p><p><br></p><p><br></p><p><br></p><p><strong class=\"ql-size-large ql-font-monospace\">HashSet和HashMap、Hashtable的区别</strong></p><p><span class=\"ql-font-monospace\">除开HashMap和Hashtable外，还有一个hash集合HashSet，可以为空，有所区别的是HashSet不是key value结构，仅仅是存储不重复的元素，相当于简化版的HashMap，只是包含HashMap中的key而已﻿</span></p><p><br></p><p><span class=\"ql-font-monospace\">通过查看源码也证实了这一点，HashSet内部就是使用HashMap实现，只不过HashSet里面的HashMap所有的value都是同一个Object而已，因此HashSet也是非线程安全的，至于HashSet和Hashtable的区别，HashSet就是个简化的HashMap的，所以你懂的</span></p><p><span class=\"ql-font-monospace\">下面是HashSet几个主要方法的实现</span></p><pre class=\"ql-syntax\" spellcheck=\"false\">  private transient HashMap map;\n  private static final Object PRESENT = new Object();\n  \n  public HashSet() {\n    map = new HashMap();\n    }\n public boolean contains(Object o) {\n    return map.containsKey(o);\n    }\n public boolean add(E e) {\n    return map.put(e, PRESENT)==null;\n    }\n public boolean add(E e) {\n    return map.put(e, PRESENT)==null;\n    }\n public boolean remove(Object o) {\n    return map.remove(o)==PRESENT;\n    }\n\n\n public void clear() {\n    map.clear();\n }\n</pre><p><br></p>",
                        createTime: "2020-05-18T15:15:01.000+0000"
                    },
                    {
                        id: 1,
                        blogId: "001",
                        blogType: "技术",
                        blogTagList: [
                            {
                                name: "java"
                            },
                            {
                                name: "hashMap"
                            },
                            {
                                name: "源码"
                            }
                        ],
                        blogTitle: "几个Hash容器的区别",
                        blogContent: "<p><strong class=\"ql-size-large ql-font-monospace\">HashMap和Hashtable的区别</strong></p><p><br></p><p><span class=\"ql-font-monospace\">两者最主要的区别在于Hashtable是线程安全，而HashMap则非线程安全</span></p><p><br></p><p><span class=\"ql-font-monospace\">Hashtable的实现方法里面都添加了synchronized关键字来确保线程同步，因此相对而言HashMap性能会高一些，我们平时使用时若无特殊需求建议使用HashMap，在多线程环境下若使用HashMap需要使用Collections.synchronizedMap()方法来获取一个线程安全的集合（Collections.synchronizedMap()实现原理是Collections定义了一个SynchronizedMap的内部类，这个类实现了Map接口，在调用方法时使用synchronized来保证线程同步,当然了实际上操作的还是我们传入的HashMap实例，简单的说就是Collections.synchronizedMap()方法帮我们在操作HashMap时自动添加了synchronized来实现线程同步，类似的其它Collections.synchronizedXX方法也是类似原理）</span></p><p><br></p><p><br></p><blockquote><span class=\"ql-font-monospace\">HashMap可以使用null作为key，而Hashtable则不允许null作为key</span></blockquote><blockquote><span class=\"ql-font-monospace\">虽说HashMap支持null值作为key，不过建议还是尽量避免这样使用，因为一旦不小心使用了，若\t\t\t因此引发一些问题，排查起来很是费事</span></blockquote><blockquote><span class=\"ql-font-monospace\">HashMap以null作为key时，总是存储在table数组的第一个节点上</span></blockquote><blockquote><span class=\"ql-font-monospace\">HashMap是对Map接口的实现，HashTable实现了Map接口和Dictionary抽象类</span></blockquote><blockquote><span class=\"ql-font-monospace\">HashMap的初始容量为16，Hashtable初始容量为11，两者的填充因子默认都是0.75</span></blockquote><blockquote><span class=\"ql-font-monospace\">HashMap扩容时是当前容量翻倍即:capacity*2，Hashtable扩容时是容量翻倍+1即:capacity*2+1</span></blockquote><blockquote><span class=\"ql-font-monospace\">两者计算hash的方法不同</span></blockquote><p><br></p><p><br></p><p><span class=\"ql-font-monospace\">Hashtable计算hash是直接使用</span><span class=\"ql-font-monospace hljs-meta\">key</span><span class=\"ql-font-monospace\">的hashcode对</span><span class=\"ql-font-monospace hljs-meta\">table</span><span class=\"ql-font-monospace\">数组的长度直接进行取模</span></p><pre class=\"ql-syntax\" spellcheck=\"false\">int hash = key.hashCode();\nint index = (hash &amp; 0x7FFFFFFF) % tab.length;\n</pre><p><br></p><p><br></p><p><span class=\"ql-font-monospace\">HashMap计算hash对key的hashcode进行了二次hash，以获得更好的散列值，然后对table数组长度取摸</span></p><pre class=\"ql-syntax\" spellcheck=\"false\">static int hash(int h) {\n        // This function ensures that hashCodes that differ only by// constant multiples at each bit position have a bounded// number of collisions (approximately 8 at default load factor).\n        h ^= (h &gt;&gt;&gt; 20) ^ (h &gt;&gt;&gt; 12);\n        return h ^ (h &gt;&gt;&gt; 7) ^ (h &gt;&gt;&gt; 4);\n}\n\n static int indexFor(int h, int length) {\n        return h &amp; (length-1);\n}\n</pre><p><span class=\"ql-font-monospace\">&nbsp;</span></p><p><span class=\"ql-font-monospace\">HashMap和Hashtable的底层实现都是数组+链表结构实现</span></p><p><br></p><p><br></p><p><br></p><p><strong class=\"ql-size-large ql-font-monospace\">HashSet和HashMap、Hashtable的区别</strong></p><p><span class=\"ql-font-monospace\">除开HashMap和Hashtable外，还有一个hash集合HashSet，可以为空，有所区别的是HashSet不是key value结构，仅仅是存储不重复的元素，相当于简化版的HashMap，只是包含HashMap中的key而已﻿</span></p><p><br></p><p><span class=\"ql-font-monospace\">通过查看源码也证实了这一点，HashSet内部就是使用HashMap实现，只不过HashSet里面的HashMap所有的value都是同一个Object而已，因此HashSet也是非线程安全的，至于HashSet和Hashtable的区别，HashSet就是个简化的HashMap的，所以你懂的</span></p><p><span class=\"ql-font-monospace\">下面是HashSet几个主要方法的实现</span></p><pre class=\"ql-syntax\" spellcheck=\"false\">  private transient HashMap map;\n  private static final Object PRESENT = new Object();\n  \n  public HashSet() {\n    map = new HashMap();\n    }\n public boolean contains(Object o) {\n    return map.containsKey(o);\n    }\n public boolean add(E e) {\n    return map.put(e, PRESENT)==null;\n    }\n public boolean add(E e) {\n    return map.put(e, PRESENT)==null;\n    }\n public boolean remove(Object o) {\n    return map.remove(o)==PRESENT;\n    }\n\n\n public void clear() {\n    map.clear();\n }\n</pre><p><br></p>",
                        createTime: "2020-05-18T15:15:01.000+0000"
                    },
                    {
                        id: 1,
                        blogId: "001",
                        blogType: "技术",
                        blogTagList: [
                            {
                                name: "java"
                            },
                            {
                                name: "hashMap"
                            },
                            {
                                name: "源码"
                            }
                        ],
                        blogTitle: "几个Hash容器的区别",
                        blogContent: "<p><strong class=\"ql-size-large ql-font-monospace\">HashMap和Hashtable的区别</strong></p><p><br></p><p><span class=\"ql-font-monospace\">两者最主要的区别在于Hashtable是线程安全，而HashMap则非线程安全</span></p><p><br></p><p><span class=\"ql-font-monospace\">Hashtable的实现方法里面都添加了synchronized关键字来确保线程同步，因此相对而言HashMap性能会高一些，我们平时使用时若无特殊需求建议使用HashMap，在多线程环境下若使用HashMap需要使用Collections.synchronizedMap()方法来获取一个线程安全的集合（Collections.synchronizedMap()实现原理是Collections定义了一个SynchronizedMap的内部类，这个类实现了Map接口，在调用方法时使用synchronized来保证线程同步,当然了实际上操作的还是我们传入的HashMap实例，简单的说就是Collections.synchronizedMap()方法帮我们在操作HashMap时自动添加了synchronized来实现线程同步，类似的其它Collections.synchronizedXX方法也是类似原理）</span></p><p><br></p><p><br></p><blockquote><span class=\"ql-font-monospace\">HashMap可以使用null作为key，而Hashtable则不允许null作为key</span></blockquote><blockquote><span class=\"ql-font-monospace\">虽说HashMap支持null值作为key，不过建议还是尽量避免这样使用，因为一旦不小心使用了，若\t\t\t因此引发一些问题，排查起来很是费事</span></blockquote><blockquote><span class=\"ql-font-monospace\">HashMap以null作为key时，总是存储在table数组的第一个节点上</span></blockquote><blockquote><span class=\"ql-font-monospace\">HashMap是对Map接口的实现，HashTable实现了Map接口和Dictionary抽象类</span></blockquote><blockquote><span class=\"ql-font-monospace\">HashMap的初始容量为16，Hashtable初始容量为11，两者的填充因子默认都是0.75</span></blockquote><blockquote><span class=\"ql-font-monospace\">HashMap扩容时是当前容量翻倍即:capacity*2，Hashtable扩容时是容量翻倍+1即:capacity*2+1</span></blockquote><blockquote><span class=\"ql-font-monospace\">两者计算hash的方法不同</span></blockquote><p><br></p><p><br></p><p><span class=\"ql-font-monospace\">Hashtable计算hash是直接使用</span><span class=\"ql-font-monospace hljs-meta\">key</span><span class=\"ql-font-monospace\">的hashcode对</span><span class=\"ql-font-monospace hljs-meta\">table</span><span class=\"ql-font-monospace\">数组的长度直接进行取模</span></p><pre class=\"ql-syntax\" spellcheck=\"false\">int hash = key.hashCode();\nint index = (hash &amp; 0x7FFFFFFF) % tab.length;\n</pre><p><br></p><p><br></p><p><span class=\"ql-font-monospace\">HashMap计算hash对key的hashcode进行了二次hash，以获得更好的散列值，然后对table数组长度取摸</span></p><pre class=\"ql-syntax\" spellcheck=\"false\">static int hash(int h) {\n        // This function ensures that hashCodes that differ only by// constant multiples at each bit position have a bounded// number of collisions (approximately 8 at default load factor).\n        h ^= (h &gt;&gt;&gt; 20) ^ (h &gt;&gt;&gt; 12);\n        return h ^ (h &gt;&gt;&gt; 7) ^ (h &gt;&gt;&gt; 4);\n}\n\n static int indexFor(int h, int length) {\n        return h &amp; (length-1);\n}\n</pre><p><span class=\"ql-font-monospace\">&nbsp;</span></p><p><span class=\"ql-font-monospace\">HashMap和Hashtable的底层实现都是数组+链表结构实现</span></p><p><br></p><p><br></p><p><br></p><p><strong class=\"ql-size-large ql-font-monospace\">HashSet和HashMap、Hashtable的区别</strong></p><p><span class=\"ql-font-monospace\">除开HashMap和Hashtable外，还有一个hash集合HashSet，可以为空，有所区别的是HashSet不是key value结构，仅仅是存储不重复的元素，相当于简化版的HashMap，只是包含HashMap中的key而已﻿</span></p><p><br></p><p><span class=\"ql-font-monospace\">通过查看源码也证实了这一点，HashSet内部就是使用HashMap实现，只不过HashSet里面的HashMap所有的value都是同一个Object而已，因此HashSet也是非线程安全的，至于HashSet和Hashtable的区别，HashSet就是个简化的HashMap的，所以你懂的</span></p><p><span class=\"ql-font-monospace\">下面是HashSet几个主要方法的实现</span></p><pre class=\"ql-syntax\" spellcheck=\"false\">  private transient HashMap map;\n  private static final Object PRESENT = new Object();\n  \n  public HashSet() {\n    map = new HashMap();\n    }\n public boolean contains(Object o) {\n    return map.containsKey(o);\n    }\n public boolean add(E e) {\n    return map.put(e, PRESENT)==null;\n    }\n public boolean add(E e) {\n    return map.put(e, PRESENT)==null;\n    }\n public boolean remove(Object o) {\n    return map.remove(o)==PRESENT;\n    }\n\n\n public void clear() {\n    map.clear();\n }\n</pre><p><br></p>",
                        createTime: "2020-05-18T15:15:01.000+0000"
                    },
                ],
            };
        },
        methods: {
            articleDetailClick() {
                this.$router.push("/my-blog/article-detail");
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