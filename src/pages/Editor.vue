<template>
    <el-card class="ql-editor-card">
            <el-upload
                id = "img-uploader"
                  class="img-uploader"
                  :action="qiniuForm"
                  :data="qiniuForm"
                  :accept="'image/*'"
                  :headers="header"
                  :show-file-list="false"
                  :on-success="uploadSuccess"
                  :on-error="uploadError"
                  :before-upload="beforeUpload">
            </el-upload>
        <quill-editor
                class="ql-editor"
                v-model="content"
                ref="myQuillEditor"
                :options="editorOption"
                @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                @change="onEditorChange($event)">
        </quill-editor>
    </el-card>

</template>

<script>
    import hljs from 'highlight.js'
    import { quillEditor } from "vue-quill-editor"; //调用编辑器
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';
    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // 切换按钮
        ['blockquote', 'code-block'],
        [{'header': 1}, {'header': 2}],               // 自定义按钮值
        [{'list': 'ordered'}, {'list': 'bullet'}],
        [{'script': 'sub'}, {'script': 'super'}],      // 上标/下标
        [{'indent': '-1'}, {'indent': '+1'}],          // 缩进
        [{'direction': 'rtl'}],                         // 文本方向
        [{'size': ['small', false, 'large', 'huge']}],  // 自定义下拉
        [{'header': [1, 2, 3, 4, 5, 6, false]}],
        [{'color': []}, {'background': []}],          // 具有主题默认值的下拉列表
        [{'font': []}],
        [{'align': []}],
        ['clean'],
        ['link', 'image', 'video']
    ]

    //七牛云上传域名: http(s)://upload-z2.qiniup.com
    //七牛云的AK: eiHzK04yfyyh-EymPKICBT-WFpanee7HXxXoDG78
    //七牛云的SK: 0kHNdQYXaD1cpgERUam2kbNuQpJbPZaHYR4OtU49
    export default {
        name: "Editor",
        components: {
            quillEditor
        },
        created() {
            this.editorOption.modules.syntax = {
                highlight: text => hljs.highlightAuto(text).value
            }
        },
        mounted() {

        },
        data() {
            return {
                content: "",
                editorOption: {
                    placeholder: '请输入文本...',
                    modules: {
                        toolbar: {
                            container: toolbarOptions,  // 工具栏
                            handlers: {
                                'image': function (value) {
                                    if (value) {
                                        console.log(value);
                                        document.querySelector('#img-uploader input').click()
                                    } else {
                                        this.quill.format('image', false);
                                    }
                                }
                            }
                        },
                    },
                },
                uploadUrl: "",
                qiniuForm: {
                    
                }
            }
        },
        methods: {
            onEditorReady(editor) { // 准备编辑器

            },
            onEditorBlur() {
            }, // 失去焦点事件
            onEditorFocus() {
            }, // 获得焦点事件
            onEditorChange({quill, html, text}) {
                // 内容改变事件
                console.log(html)
                this.content = html
            },
            // 上传图片前
            beforeUpload(res, file) {
            },
            // 上传图片成功
            uploadSuccess(res, file) {
            },
            // 上传图片失败
            uploadError(res, file) {
            }

        },
        computed: {
            editor() {
                return this.$refs.myQuillEditor.quill;
            },
        }
    }
</script>

<style scoped>

    .ql-editor{
        height:800px;
    }
</style>