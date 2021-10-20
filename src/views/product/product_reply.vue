<template>
  <div class="product_reply">
    <div class="top">
      <div class="box1_one">
        <span>时间选择</span>
        <p>
          <el-tabs v-model="activeName" type="card" @tab-click="handle">
            <el-tab-pane label="全部" name=""></el-tab-pane>
            <el-tab-pane label="今天" name="today"></el-tab-pane>
            <el-tab-pane label="昨天" name="yesterday"></el-tab-pane>
            <el-tab-pane label="最近7天" name="lately7"></el-tab-pane>
            <el-tab-pane label="最近30天" name="lately30"></el-tab-pane>
            <el-tab-pane label="本月" name="month"></el-tab-pane>
            <el-tab-pane label="今年" name="year"></el-tab-pane>
          </el-tabs>
        </p>
      </div>

      评价状态：
      <el-select v-model="value" clearable placeholder="请选择" @change="xiala">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      商品信息：<input type="text" v-model="Store_name" />
      <br />用户名称：<input type="text" v-model="account" />
      <button @click="sou">搜索</button>
      <button @click="tj">添加</button>
    </div>
    <el-table :data="data" border style="width: 100%">
      <el-table-column label="商品信息">
        <template slot-scope="props">
          <img :src="props.row.image" alt="" />{{ props.row.store_name }}
        </template>
      </el-table-column>
      <el-table-column prop="account" label="用户名称"> </el-table-column>
      <el-table-column prop="score" label="评分"> </el-table-column>
      <el-table-column label="评价内容">
        <template slot-scope="props">
          <dl>
            <dt>{{ props.row.comment }}</dt>
            <dd><img :src="props.row.pics && props.row.pics[0]" alt="" /></dd>
          </dl>
        </template>
      </el-table-column>
      <el-table-column prop="merchant_reply_content" label="回复内容">
      </el-table-column>
      <el-table-column prop="add_time" label="评价时间"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >回复</el-button
          >
          <el-button type="text" size="small" @click="sc(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :page-sizes="[15, 10, 5, 1]"
      :page-size="15"
    >
    </el-pagination>

    <el-dialog title="回复内容" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-input
          type="textarea"
          :rows="4"
          placeholder="请输入内容"
          v-model="form.content"
        >
        </el-input>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="qx">取 消</el-button>
        <el-button type="primary" @click="qd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getreply, getset_reply } from "@/api";
export default {
  data() {
    return {
      activeName: "",
      data: [],
      time: "",
      pj: null,
      Store_name: "",
      account: "",
      currentPage4: 1,
      total: 0,
      page: 1,
      limit: 15,
      value: "",
      options: [
        {
          value: 1,
          label: "已回复",
        },
        {
          value: 0,
          label: "未回复",
        },
      ],
      dialogFormVisible: false,
      form: {
        content: "",
      },
      formLabelWidth: "120px",
      id: "",
    };
  },
  created() {
    this.get();
  },
  methods: {
    get() {
      getreply({
        data: this.activeName,
        is_reply: this.value,
        Store_name: this.Store_name,
        account: this.account,
        page: this.page,
        limit: this.limit,
      }).then((res) => {
        console.log(res);
        this.data = res.data.list;
        this.total = res.data.count;
      });
    },
    handleSizeChange(val) {
      this.limit = val;
      this.get();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.get();
    },
    xiala() {
      this.get();
    },
    handleClick(val) {
      console.log(val.id);
      this.dialogFormVisible = true;
      this.id = val.id;
    },
    sou() {
      this.get();
    },
    handle() {
      this.get();
    },
    // 添加
    tj() {},
    qd() {
      this.dialogFormVisible = false;
      getset_reply({ id: this.id, data: this.form }).then((res) => {
        console.log(res);
        this.get();
      });
    },
    qx() {
      this.dialogFormVisible = false;
      this.form.content = "";
    },
  },
};
</script>

<style lang="less" scoped>
.product_reply {
  width: 100%;
  height: 100%;
  img {
    width: 50px;
    height: 50px;
  }
  dl {
    width: 80px;
    height: 80px;
    dt {
      width: 100%;
      height: 30px;
      color: aqua;
    }
    dd {
      width: 100%;
      height: 50px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>