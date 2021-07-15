import Vue from 'vue'
import { quillEditor, Quill } from 'vue-quill-editor'

// import ImageResize from 'quill-image-resize-module'

// Introduce the video module and register
import video from '~/utils/quill-video-image-module/video'

window.Quill = Quill
window.QuillVideo = video
Vue.component('quill-editor', quillEditor)
