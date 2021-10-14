<template>
  <div class="product_classify">
    <div class="top">
      商品分类:
      <el-select v-model="value" clearable placeholder="请选择" @change="xiala">
        <el-option
          v-for="item in data"
          :key="item.value"
          :label="item.label"
          :value="item.cate_name"
        >
        </el-option>
      </el-select>
      状态:
      <el-select
        v-model="value2"
        clearable
        placeholder="请选择"
        @change="xiala2"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      分类名称:<input type="text" v-model="searchbox" /><button @click="sou">
        搜索
      </button>
    </div>
    <el-table
      :data="data"
      style="width: 100%"
      row-key="id"
      border
      lazy
      :load="load"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="ID"> </el-table-column>
      <el-table-column prop="cate_name" label="分类名称" width="200">
      </el-table-column>
      <el-table-column label="商品图">
        <template slot-scope="props">
          <img :src="props.row.pic" alt="" />
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="排序"> </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="props">
          <el-switch
            :value="Boolean(props.row.is_show)"
            @change="huan(props.row.id, !Boolean(props.row.is_show))"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="text" size="small">编辑</el-button>
          <el-button type="text" size="small" @click="huishou(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getcategory, getset_show2 } from "@/api";
export default {
  data() {
    return {
      isShow: "",
      searchbox: "",
      page: 1,
      limit: 10,
      pid: "",
      total: 0,
      list: [],
      data: [],
      currentPage4: 1,
      value: "",
      options: [
        {
          value: 1,
          label: "显示",
        },
        {
          value: 0,
          label: "隐藏",
        },
      ],
      value2: "",
    };
  },
  created() {
    getcategory({
      is_show: this.value2,
      cate_name: this.value,
      page: this.page,
      limit: this.limit,
      pid: this.pid,
    }).then((res) => {
      console.log(res);
      this.total = res.data.list.length;
      this.data = res.data.list;
    });
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      getcategory({
        is_show: this.value2,
        cate_name: this.value,
        page: val,
        limit: this.limit,
        pid: this.pid,
      }).then((res) => {
        console.log(res);

        this.total = res.data.list.length;
        this.data = res.data.list;
      });
    },
    load(tree, treeNode, resolve) {},
    huan(a, b) {
      getset_show2({ id: a, isShow: Number(b) }).then((res) => {
        console.log(res);
        getcategory({
          is_show: this.value2,
          cate_name: this.value,
          page: this.page,
          limit: this.limit,
          pid: this.pid,
        }).then((res) => {
          console.log(res);

          this.total = res.data.list.length;
          this.data = res.data.list;
        });
      });
    },
    huishou(val) {
      console.log(val);
    },
    sou() {
      getcategory({
        is_show: this.value2,
        cate_name: this.searchbox,
        page: this.page,
        limit: this.limit,
        pid: this.pid,
      }).then((res) => {
        console.log(res);
        this.total = res.data.list.length;
        this.data = res.data.list;
      });
    },
    xiala() {
      getcategory({
        is_show: this.value2,
        cate_name: this.value,
        page: this.page,
        limit: this.limit,
        pid: this.pid,
      }).then((res) => {
        this.total = res.data.count;
        this.data = res.data.list;
      });
    },
    xiala2() {
      getcategory({
        is_show: this.value2,
        cate_name: this.value,
        page: this.page,
        limit: this.limit,
        pid: this.pid,
      }).then((res) => {
        this.total = res.data.count;
        this.data = res.data.list;
      });
    },
  },
};
</script>

<style>
</style>