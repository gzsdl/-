<template>
  <div class="level">
    <el-table :data="data" border style="width: 100%">
      <el-table-column prop="id" label="ID"> </el-table-column>
      <el-table-column prop="name" label="等级图标">
        <template slot-scope="props">
          <img :src="props.row.image" alt="" />{{ props.row.store_name }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="等级名称"> </el-table-column>
      <el-table-column prop="grade" label="等级"> </el-table-column>
      <el-table-column prop="discount" label="享受折扣"> </el-table-column>
      <el-table-column label="是否显示">
        <template slot-scope="props">
          <el-switch
            v-model="props.row.is_show"
            @change="huan(props.row.id, props.row.is_show)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="explain" label="	等级说明"> </el-table-column>
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
import { getvip_list } from "@/api";
export default {
  data() {
    return {
      data: [],
      currentPage4: 1,
      total: 0,
      page: 1,
      limit: 5,
    };
  },
  created() {
    getvip_list({ page: this.page, limit: this.limit }).then((res) => {
      console.log(res);
      this.data = res.data.list;
      this.total = res.data.count;
    });
  },
  methods: {
    handleSizeChange(val) {
      this.limit = val;
      getrule({ page: this.page, limit: this.limit }).then((res) => {
        console.log(res);
        this.data = res.data.list;
        this.total = res.data.count;
      });
    },
    handleCurrentChange(val) {
      this.page = val;
      getrule({ page: this.page, limit: this.limit }).then((res) => {
        console.log(res);
        this.data = res.data.list;
        this.total = res.data.count;
      });
    },
    huan(id, isshow) {
      console.log(id);
      console.log(isshow);
    },
  },
};
</script>

<style lang="less" scoped>
.level {
  width: 100%;
  height: 100%;
  img {
    width: 50px;
    height: 50px;
  }
}
</style>