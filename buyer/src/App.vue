<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import storage from "@/plugins/storage";
import { getBaseSite } from "@/api/common.js";
export default {
  name: "App",
  mounted() {
    this.init();
  },
  methods:{
    init(){
      if(!storage.getItem("siteName")||!storage.getItem("logoImg")||!storage.getItem("sitelogo_expiration_time")) {
        this.getSite();
      }else{
        // 如果缓存过期，则获取最新的信息
        if (new Date() > storage.getItem("sitelogo_expiration_time")) {
          this.getSite();
          return;
        }else{
          window.document.title = storage.getItem("siteName");
          //动态获取icon
          let link =document.querySelector("link[rel*='icon']") ||document.createElement("link");
            link.type = "image/x-icon";
            link.href = storage.getItem("siteIcon");
            link.rel = "shortcut icon";
            document.getElementsByTagName("head")[0].appendChild(link);
        }
      }
      
    },
    getSite(){
      //获取基本站点信息
      getBaseSite().then((res) => {
        if (res.success && res.result.settingValue) {
          let data = JSON.parse(res.result.settingValue);
          // 过期时间
          var expirationTime = new Date().setHours(new Date().getHours() + 1);
          // 存放过期时间
          storage.setItem("sitelogo_expiration_time", expirationTime);
          // 存放信息
          storage.setItem('siteName', data.siteName || 'Maollar');
          
          // ✅ 关键修改：强制使用本地logo，忽略API返回的logo
          storage.setItem('logoImg', require('@/assets/images/logo2.png'));
          
          // ✅ 关键修改：强制使用本地icon，忽略API返回的icon
          storage.setItem("siteIcon", require('@/assets/images/logo2.png')); // 或者使用专门的icon文件
          
          window.document.title = data.siteName || '喵乐商城';
          
          //动态获取icon - 使用本地icon
          let link =document.querySelector("link[rel*='icon']") ||document.createElement("link");
          link.type = "image/x-icon";
          // ✅ 使用本地icon而不是API返回的icon
          link.href = require('@/assets/images/logo2.png'); // 或者使用专门的favicon文件
          link.rel = "shortcut icon";
          document.getElementsByTagName("head")[0].appendChild(link);
        }
      });
    }
  }
};
</script>
<style lang="scss">
#app {
  @include background_color($light_background_color);
}
</style>
