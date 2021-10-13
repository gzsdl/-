<template>
  <div class="admin">
    <div class="left">
      <el-menu
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-submenu :index="String(v.id)" v-for="(v, i) in list" :key="i">
          <template slot="title">
            <span @click="v.children.length > 0 ? '' : addTab(v)">{{
              v.menu_name
            }}</span>
          </template>
          <el-submenu
            :index="String(k.id)"
            v-for="(k, j) in v.children"
            :key="j"
          >
            <template slot="title"
              ><span @click="k.children.length > 0 ? '' : addTab(v, k)">{{
                k.menu_name
              }}</span></template
            >
            <el-menu-item
              v-show="k.children"
              :index="String(n.id)"
              v-for="(n, m) in k.children"
              @click="addTab(v, k, n)"
              :key="m"
              >{{ n.menu_name }}</el-menu-item
            >
          </el-submenu>
        </el-submenu>
      </el-menu>
    </div>
    <div class="right">
      <div class="top">
        <el-tabs
          v-model="editableTabsValue"
          type="card"
          closable
          @tab-remove="removeTab"
          @tab-click="clickTab"
        >
          <el-tab-pane
            v-for="item in editableTabs"
            :key="item.name"
            :label="item.title"
            :name="item.name"
          >
            <router-view></router-view>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { getmenusList } from "@/api";
export default {
  data() {
    return {
      editableTabsValue: "1",
      editableTabs: [
        {
          title: "主页",
          name: "1",
          path: "/admin/home/",
          mian: ["主页"],
        },
      ],
      FuName: "",
      ZiName: "",
      list: [],
    };
  },
  created() {
    getmenusList().then((res) => {
      console.log(res);
      let arr = [];
      res.data.forEach((v) => {
        if (v.html === "|-----") {
          arr.push(v);
          arr[arr.length - 1].children = [];
        }
        if (v.html === "|-----|-----") {
          arr[arr.length - 1].children.push(v);
          arr[arr.length - 1].children[
            arr[arr.length - 1].children.length - 1
          ].children = [];
        }
        if (v.html === "|-----|-----|-----") {
          arr[arr.length - 1].children[
            arr[arr.length - 1].children.length - 1
          ].children.push(v);
        }
      });
      console.log(arr);
      this.list = arr;
    });
    let arr = JSON.parse(sessionStorage.getItem("tabs"));
    if (arr) {
      this.editableTabs = arr;
      let luyou = window.location.hash.split("#")[1];
      arr.forEach((v, i) => {
        if (v.path == luyou) {
          this.editableTabsValue = arr[i].name;
          this.MianName = arr[i].mian;
        }
      });
    }
  },
  methods: {
    addTab(v, k, n) {
      console.log(v);
      console.log(k);
      console.log(n);
      let tabs = this.editableTabs;
      let num = 0;
      let sum = 0;
      let aum = v;
      let arr = [];
      arr.push(v.menu_name);
      if (v.children.length > 0) {
        aum = k;
        arr.push(k.menu_name);
        if (k.children.length > 0) {
          aum = n;
          arr.push(n.menu_name);
        }
      }
      console.log(tabs);
      tabs.forEach((v, i) => {
        if (v.title == aum.menu_name) {
          num++;
          sum = i;
        }
      });
      if (num == 0) {
        this.editableTabs.push({
          title: aum.menu_name,
          name: String(k.id + 2),
          path: aum.menu_path,
        });
      }
      this.editableTabsValue = String(aum.id + 2);
      this.$router.push(aum.menu_path);
      sessionStorage.setItem("tabs", JSON.stringify(this.editableTabs));
    },
    clickTab(targetName) {
      console.log(targetName);
      let tabs = this.editableTabs;
      let num = 0;
      this.editableTabsValue = targetName.name;
      tabs.forEach((v, i) => {
        if (targetName.label == v.title) {
          num = i;
        }
      });
      this.$router.push(tabs[num].path);
    },
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      let nextTabs = {};
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              console.log(nextTab);
              activeName = nextTab.name;
              nextTabs = nextTab;
            }
          }
        });
      }

      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter((tab) => tab.name !== targetName);
      this.$router.push(nextTabs.path);
      sessionStorage.setItem("tabs", JSON.stringify(this.editableTabs));
    },
  },
};
</script>
<style lang="less" scoped>
.admin {
  width: 100%;
  height: 100%;
  display: flex;
  .left {
    width: 20%;
    height: 100%;
  }
  .right {
    width: 100%;
    height: 100%;
  }
}
</style>