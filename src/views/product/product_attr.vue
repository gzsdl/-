<template>
  <div class="product_attr">
    <div class="top">
      <p>
        规格搜索：<input type="text" v-model="searchbox" /><button @click="sou">
          搜索
        </button>
      </p>
    </div>
    <el-table
      :data="data"
      border
      style="width: 100%"
      tooltip-effect="dark"
      ref="multipleTable"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="id" label="ID"> </el-table-column>
      <el-table-column prop="rule_name" label="规格名称"> </el-table-column>
      <el-table-column prop="attr_name" label="	商品规格"> </el-table-column>
      <el-table-column label="商品属性">
        <template slot-scope="scope">
          <p>
            <span v-for="(v, i) in scope.row.attr_value" :key="i">{{ v }}</span>
          </p>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >编辑</el-button
          >
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :page-sizes="[5, 10, 15]"
      :page-size="5"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getrule } from "@/api";
export default {
  data() {
    return {
      data: [],
      currentPage4: 1,
      total: 0,
      page: 1,
      limit: 5,
      searchbox: "",
    };
  },
  created() {
    this.get();
  },
  methods: {
    get() {
      getrule({
        page: this.page,
        limit: this.limit,
        rule_name: this.searchbox,
      }).then((res) => {
        console.log(res);
        this.data = res.data.list;
        this.total = res.data.count;
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      this.limit = val;
      this.get();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.get();
    },
    sou() {
      console.log(this.searchbox);
      this.get();
    },
  },
};
</script>

<style lang="less" scoped>
.product_attr {
  width: 100%;
  height: 100%;
}
</style>