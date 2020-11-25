/**
 * 
 */

Vue.component('blog-post', {
     props: ['post'],
     methods: {
      callIn(incdec) {
// console.log(this.post.title);
//this.post.postFontSize += 0.1;
       //this.$emit('enlarge-text',incdec);
    	  this.postFontSize += incdec;
      }
     },
     data() {
    	 return{
    		 postFontSize: 1
    	 };
     },
     template: `
      <div class="blog-post" :style="{ fontSize: postFontSize + 'em' }">      
        <h3>{{ post.title }}</h3>
        老板：<slot></slot>
        <button v-on:click="callIn(0.1)">
                    放大文本
        </button>
        <button v-on:click="callIn(-0.1)">
                    缩小文本
         </button>
        <div v-html="post.content"></div><br/>
              注释：<div v-html="post.comments"></div>      
      </div>`
   });

  var app = new Vue({
     el: '#app',
     methods: {
      scale(large){
       //this.postFontSize += large;
      }
     },
     components:{
      //HelloCom
     },
     data: {
   // ddbbt,
   //postFontSize: 1,
      posts: [
          { id: 1, title: '我的Vue之旅',content:'haha',publishedAt:'星期1',comments:'东方饭店反对法',postFontSize: 1},
          { id: 2, title: '用Vue来写博客',content:'hehe',publishedAt:'星期2',comments:'东方饭店对付对付的方法',postFontSize: 1},
          { id: 3, title: 'Vue为什么如此有趣呢',content:'hihi',publishedAt:'星期3',comments:'东方饭店湖广会馆很',postFontSize: 1}
       ]
     }
   });


