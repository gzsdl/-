<template>
  <div class="home">
    <div class="top">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>卡片名称</span>
          <el-button>操作按钮</el-button>
        </div>
        <div v-for="o in 4" :key="o" class="text item">
          {{ "列表内容 " + o }}
        </div>
        <div slot="footer" class="clearfix">
          <span>卡片名称</span>
          <el-button>操作按钮</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getheader } from "@/api";
export default {
  data() {
    return {};
  },
  created() {
    getheader().then((res) => {
      console.log(res);
    });
  },
};
</script>

<style>
</style>