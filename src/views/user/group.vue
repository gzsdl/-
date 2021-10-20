<template>
  <div class="group">
    <el-table :data="data" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="150"> </el-table-column>
      <el-table-column prop="group_name" label="分组名称"> </el-table-column>
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
      :page-size="15"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getlist } from "@/api";
export default {
  data() {
    return {
      data: [],
      currentPage4: 1,
      total: 0,
      page: 1,
      limit: 15,
    };
  },
  created() {
    getlist({ page: this.page, limit: this.limit }).then((res) => {
      console.log(res);
      this.data = res.data.list;
      this.total = res.data.count;
    });
  },
  methods: {
    handleSizeChange(val) {
      this.limit = val;
      getlist({ page: this.page, limit: this.limit }).then((res) => {
        console.log(res);
        this.data = res.data.list;
        this.total = res.data.count;
      });
    },
    handleCurrentChange(val) {
      this.page = val;
      getlist({ page: this.page, limit: this.limit }).then((res) => {
        console.log(res);
        this.data = res.data.list;
        this.total = res.data.count;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.group {
  width: 100%;
  height: 100%;
}
</style>