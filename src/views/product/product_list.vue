<template>
  <div class="product_list">
    <el-tabs v-model="activeName" @tab-click="activeNameClick">
      <el-tab-pane
        v-for="(v, i) in list"
        :key="i"
        :label="v.name + `(${v.count})`"
        :name="String(v.type)"
      >
        <div class="tou">
          商品分类:
          <el-select
            v-model="value"
            clearable
            placeholder="请选择"
            @change="xiala"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.cate_name"
            >
            </el-option>
          </el-select>
          商品搜索：<input type="text" v-model="searchbox" /><button
            @click="sou"
          >
            搜索
          </button>
        </div>
        <div class="tian">
          <button>添加</button>
        </div>
        <el-table :data="data" border style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form>
                <p>
                  {{ props.row.cate_name }}
                </p>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column prop="id" label="商品ID"> </el-table-column>
          <el-table-column prop="name" label="商品图">
            <template slot-scope="props">
              <img :src="props.row.image" alt="" />
            </template>
          </el-table-column>
          <el-table-column prop="store_name" label="商品名称">
          </el-table-column>
          <el-table-column prop="price" label="商品售价"> </el-table-column>
          <el-table-column prop="sales" label="销量"> </el-table-column>
          <el-table-column prop="stock" label="库存"> </el-table-column>
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
              <el-button
                @click="handleClick(scope.row)"
                type="text"
                size="small"
                >查看</el-button
              >
              <el-button type="text" size="small">编辑</el-button>

              <el-button
                v-if="Number(activeName) !== 6"
                type="text"
                size="small"
                @click="huishou(scope.row)"
                >移到回收站</el-button
              >
              <el-button
                v-else
                type="text"
                size="small"
                @click="huishou(scope.row)"
                >恢复商品</el-button
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
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {
  gettype_header,
  getproduct,
  gettree,
  getset_show,
  getdel,
} from "@/api";
export default {
  data() {
    return {
      activeName: "1",
      total: 0,
      list: [],
      data: [],
      currentPage4: 1,
      searchbox: "",
      page: 1,
      limit: 10,
      value: "",
      options: [],
    };
  },
  created() {
    gettype_header().then((res) => {
      console.log(res);
      this.list = res.data.list;
    });
    gettree().then((res) => {
      console.log(res);
      this.options = res.data;
    });
    getproduct({
      page: this.page,
      limit: this.limit,
      cate_id: 0,
      type: Number(this.activeName),
      store_name: this.searchbox,
      excel: 0,
      sales: "asc",
    }).then((res) => {
      this.data = res.data.list;
      this.total = res.data.count;
      console.log(this.data);
    });
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    activeNameClick() {
      console.log(Number(this.activeName));
      getproduct({
        page: this.page,
        limit: this.limit,
        cate_id: 0,
        type: Number(this.activeName),
        store_name: this.searchbox,
        excel: 0,
        sales: "asc",
      }).then((res) => {
        this.data = res.data.list;
        this.total = res.data.count;
        console.log(this.data);
      });
    },
    xiala() {
      let num = 0;
      this.options.forEach((v) => {
        if (this.value == v.cate_name) {
          num = v.id;
        }
      });
      getproduct({
        page: this.page,
        limit: this.limit,
        cate_id: num,
        type: Number(this.activeName),
        store_name: this.searchbox,
        excel: 0,
        sales: "asc",
      }).then((res) => {
        this.data = res.data.list;
        this.total = res.data.count;
        console.log(this.data);
      });
    },
    huan(id, isshow) {
      console.log(id);
      console.log(isshow);
      getset_show({ id: id, is_show: Number(isshow) }).then((res) => {
        console.log(res);
        gettype_header().then((res) => {
          console.log(res);
          this.list = res.data.list;
        });
        getproduct({
          page: this.page,
          limit: this.limit,
          cate_id: 0,
          type: Number(this.activeName),
          store_name: this.searchbox,
          excel: 0,
          sales: "asc",
        }).then((res) => {
          this.data = res.data.list;
          this.total = res.data.count;
          console.log(this.data);
        });
      });
    },
    sou() {
      getproduct({
        page: this.page,
        limit: this.limit,
        cate_id: 0,
        type: Number(this.activeName),
        store_name: this.searchbox,
        excel: 0,
        sales: "asc",
      }).then((res) => {
        this.data = res.data.list;
        console.log(this.data);
      });
    },
    huishou(val) {
      console.log(val.id);
      getdel(val.id).then((res) => {
        console.log(res);
        gettype_header().then((res) => {
          console.log(res);
          this.list = res.data.list;
        });
        getproduct({
          page: this.page,
          limit: this.limit,
          cate_id: 0,
          type: Number(this.activeName),
          store_name: this.searchbox,
          excel: 0,
          sales: "asc",
        }).then((res) => {
          this.data = res.data.list;
          console.log(this.data);
        });
      });
    },
    huifu(val) {
      getdel(val.id).then((res) => {
        console.log(res);
        gettype_header().then((res) => {
          console.log(res);
          this.list = res.data.list;
        });
        getproduct({
          page: this.page,
          limit: this.limit,
          cate_id: 0,
          type: Number(this.activeName),
          store_name: this.searchbox,
          excel: 0,
          sales: "asc",
        }).then((res) => {
          this.data = res.data.list;
          console.log(this.data);
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.product_list {
  width: 100%;
  height: 100%;
  img {
    width: 50px;
    height: 50px;
  }
}
</style>