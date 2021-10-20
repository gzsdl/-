<template>
  <div class="list">
    <header>
      <!-- 17.用户列表能通过名称进行条件查询，点击重置按钮，清空搜索框，还原表格初始状态数据 -->
      <!-- 调用接口重新渲染数据即可 -->
      <input type="text" v-model="searchBox" /><button @click="searchFun">
        搜索</button
      ><button @click="chongZhi">重置</button>
    </header>
    <div class="main">
      <div class="BlueDiv" v-show="isShow">
        已选择{{ num }}项 余额总数{{ price }}
      </div>
      <!-- 用户管理页面表格渲染 -->
      <!-- 使用了element里的el-table渲染 -->
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="expand"> </el-table-column>
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="uid" label="ID"> </el-table-column>
        <el-table-column label="头像">
          <template slot-scope="props">
            <img :src="props.row.avatar" alt="" />
          </template>
        </el-table-column>
        <el-table-column prop="nickname" label="姓名"> </el-table-column>
        <el-table-column prop="level" label="会员等级"> </el-table-column>
        <el-table-column prop="group_id" label="分组"> </el-table-column>
        <el-table-column prop="spread_uid_nickname" label="推荐人">
        </el-table-column>
        <el-table-column prop="user_type" label="用户类型"> </el-table-column>
        <el-table-column prop="now_money" label="余额"> </el-table-column>
        <el-table-column label="编辑">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 用户列表表格能进行分页，页标跳转 -->
      <!-- 使用了element里的el-pagination渲染 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[3, 5, 6, 9]"
        :page-size="9"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <el-dialog title="编辑" :visible.sync="dialogFormVisible" :center="true">
      <el-form v-model="form">
        <el-form-item
          v-for="(v, i) in data"
          :key="i"
          :label="v.title"
          :label-width="formLabelWidth"
        >
          <el-input
            :disabled="i == 0"
            :type="v.props.type"
            v-model="form[v.field]"
            :placeholder="v.placeholder"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="qd">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getuser, getedit, gethtml } from "@/api";
export default {
  data() {
    return {
      tableData: [],
      tableData2: [],
      page: 1,
      limit: 9,
      total: 0,
      searchBox: "",
      isShow: false,
      num: 0,
      dialogFormVisible: false,
      price: 0,
      data: {},
      form: {},
      formLabelWidth: "120px",
      action: "",
    };
  },
  created() {
    this.getSJ();
  },
  methods: {
    getSJ() {
      getuser({
        nickname: this.searchBox,
        page: this.page,
        limit: this.limit,
      }).then((res) => {
        console.log(res);
        this.tableData = res.data.list;
        this.tableData2 = res.data.list;
        this.total = res.data.count;
      });
    },
    qd() {
      gethtml({ action: this.action, data: this.form }).then((res) => {
        console.log(res, 12);
      });
      console.log(this.form);
      this.dialogFormVisible = false;
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      if (val.length == 0) {
        this.isShow = false;
      } else {
        this.isShow = true;
        this.num = val.length;
        let sum = 0;
        val.forEach((v) => {
          sum += Number(v.now_money);
        });
        this.price = parseFloat(sum).toFixed(2);
      }
    },
    handleSizeChange(val) {
      this.limit = val;
      this.getSJ();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getSJ();
    },
    searchFun() {
      this.getSJ();
    },
    chongZhi() {
      this.searchBox = "";
      this.getSJ();
    },
    handleEdit(val) {
      getedit(val.uid).then((res) => {
        console.log(res);
        this.data = res.data.rules;
        let arr = {};
        res.data.rules.forEach((v) => {
          arr[v.field] = v.value;
        });
        this.form = arr;
        this.action = res.data.action;
      });
      this.dialogFormVisible = true;
    },
  },
};
</script>

<style lang="less" scoped>
.list {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  header {
    width: 100%;
    height: 50px;
  }
  .main {
    width: 100%;
    flex: 1;
    .BlueDiv {
      width: 100%;
      height: 30px;
      background: #f0faff;
    }
    .el-table {
      width: 100%;
      height: 100%;
    }
    img {
      width: 50px;
      height: 50px;
    }
  }
}
</style>