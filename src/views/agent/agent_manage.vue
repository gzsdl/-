<template>
  <div class="agent_manage">
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
      <div class="box1_one">
        <span>搜索</span>
        <p>
          <el-input
            placeholder="请输入内容"
            v-model="nickname"
            class="input-with-select"
            style="width: 200px"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              type="primary"
              @click="sou"
            ></el-button>
          </el-input>
        </p>
      </div>
    </div>
    <div class="nav">
      <i
        v-for="(v, i) in data.list"
        :key="i"
        :class="`el-icon-${v.className}`"
      ></i>
    </div>
    <el-table :data="data" style="width: 100%">
      <el-table-column prop="uid" label="商品ID"> </el-table-column>
      <el-table-column prop="name" label="商品图">
        <template slot-scope="props">
          <img :src="props.row.avatar" alt="" />
        </template>
      </el-table-column>
      <el-table-column label="用户信息" width="180">
        <template slot-scope="props">
          <div>
            <p>昵称：{{ props.row.nickname }}</p>
            <p>姓名：{{ props.row.real_name }}</p>
            <p>电话：{{ props.row.phone }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="spread_time" label="推广用户数量">
      </el-table-column>
      <el-table-column prop="order_count" label="订单数量"> </el-table-column>
      <el-table-column prop="order_price" label="订单金额"> </el-table-column>
      <el-table-column prop="brokerage_money" label="雇佣金额">
      </el-table-column>
      <el-table-column prop="extract_count_price" label="已提现金额">
      </el-table-column>
      <el-table-column prop="extract_count_num" label="提现次数">
      </el-table-column>
      <el-table-column prop="new_money" label="未提现金额"> </el-table-column>
      <el-table-column prop="spread_name" label="上级推广人"> </el-table-column>
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
      :page-sizes="[10, 15, 20, 25]"
      :page-size="10"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getagent, getstatistics } from "@/api";
export default {
  data() {
    return {
      data: [],
      datalist: "",
      activeName: "",
      total: 0,
      limit: 10,
      page: 1,
      currentPage4: 1,
      nickname: "",
    };
  },
  created() {
    this.get();
    getstatistics().then((res) => {
      this.datalist = res.data.res;
      console.log(this.datalist);
    });
  },
  methods: {
    get() {
      getagent({
        nickname: this.nickname,
        data: this.activeName,
        limit: this.limit,
        page: this.page,
      }).then((res) => {
        this.total = res.data.count;
        this.data = res.data.list;
      });
    },
    handle() {
      this.get();
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
      this.get();
    },
  },
};
</script>

<style lang="less" scoped>
.agent_manage {
  width: 100%;
  height: 100%;
  .top {
    width: 100%;
    .box1_one {
      width: 100%;
      display: flex;
      align-items: center;
      span {
        display: inline-block;
        width: 10%;
        font-size: 20px;
        text-align: center;
        padding-right: 15px;
        box-sizing: border-box;
      }
      p {
        width: 90%;
      }
    }
  }
  .nav {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    dl {
      width: 25%;
      height: 45%;
      dl {
        width: 30%;
        height: 100%;
      }
      dt {
        width: 70%;
        height: 100%;
      }
    }
  }
  img {
    width: 50px;
    height: 50px;
  }
  p {
    width: 200px;
  }
}
</style>