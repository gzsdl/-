<template>
  <div class="product_classify">
    <div class="top">
      商品分类:
      <el-select v-model="value" clearable placeholder="请选择" @change="xiala">
        <el-option
          v-for="item in data2"
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
      <button @click="tj">添加</button>
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
          <el-button type="text" size="small" @click="bj(scope.row)"
            >编辑</el-button
          >
          <el-button type="text" size="small" @click="sc(scope.row)"
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

    <!-- 编辑弹框 -->
    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-form v-model="form">
        <el-form-item label="父级" :label-width="formLabelWidth">
          <el-select v-model="form.pid" :disabled="dis">
            <el-option
              :label="v.label"
              :value="v.value"
              v-for="(v, i) in select.options"
              :key="i"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="form.cate_name"></el-input>
        </el-form-item>
        <el-form-item label="分类图标" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action="http://bw.gsruiying.com.cn/adminapi/file/category?name="
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img :src="form.pic" class="avatar" />
          </el-upload>
        </el-form-item>
        <el-form-item label="排序" :label-width="formLabelWidth">
          <el-input-number
            v-model="form.sort"
            controls-position="right"
            :min="0"
            :max="100"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-radio
            v-model="form.is_show"
            :label="v.value"
            :value="v.value"
            v-for="(v, i) in radio.options"
            :key="i"
            >{{ v.label }}</el-radio
          >
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="qd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getcategory,
  getset_show2,
  getdelete2,
  getcategoryid,
  getcategoryget,
  getjiacategory,
  getjiacreate,
} from "@/api";
export default {
  data() {
    return {
      dialogFormVisible: false,
      isShow: "",
      searchbox: "",
      page: 1,
      limit: 10,
      pid: "",
      total: 0,
      list: [],
      data: [],
      data2: [],
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
      form: {
        cate_name: "",
        is_show: "",
        pic: "",
        pid: "",
        sort: "",
      },
      formLabelWidth: "120px",
      select: {},
      frame: {},
      inputNumber: {},
      radio: {},
      id: "",
      tname: "",
      dis: "",
    };
  },
  created() {
    this.get();
  },
  methods: {
    get() {
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
        this.data2 = res.data.list;
      });
    },
    // 添加
    tj() {
      this.dialogFormVisible = true;
      this.tname = "添加";
      this.dis = false;
      getjiacreate().then((res) => {
        console.log(res);
        this.select = res.data.rules[0];
        this.frame = res.data.rules[2];
        this.inputNumber = res.data.rules[3];
        this.radio = res.data.rules[4];
      });
    },
    // 确定
    qd() {
      this.dialogFormVisible = false;
      if (this.tname == "添加") {
        getjiacategory(this.form).then((res) => {
          this.get();
        });
      } else {
        getcategoryget({ id: this.id, data: this.form }).then((res) => {
          this.get();
        });
      }
      this.form = {
        cate_name: "",
        is_show: "",
        pic: "",
        pid: "",
        sort: "",
      };
    },
    // 编辑
    bj(val) {
      this.dialogFormVisible = true;
      this.tname = "编辑";
      this.dis = true;
      this.id = val.id;
      getcategoryid(val).then((res) => {
        console.log(res);
        this.select = res.data.rules[0];
        this.frame = res.data.rules[2];
        this.inputNumber = res.data.rules[3];
        this.radio = res.data.rules[4];
        this.form = {
          cate_name: res.data.rules[1].value,
          is_show: res.data.rules[4].value,
          pic: res.data.rules[2].value,
          pid: res.data.rules[0].value,
          sort: res.data.rules[3].value,
        };
        console.log(this.form);
      });
    },
    // 删除
    sc(val) {
      getdelete2({ id: val.id }).then((res) => {
        console.log(res);
        getcategory({
          is_show: this.value2,
          cate_name: this.value,
          page: this.page,
          limit: this.limit,
          pid: this.pid,
        }).then((res) => {
          this.total = res.data.list.length;
          this.data = res.data.list;
        });
      });
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      getcategory({
        is_show: this.value2,
        cate_name: this.value,
        page: val,
        limit: this.limit,
        pid: this.pid,
      }).then((res) => {
        this.total = res.data.list.length;
        this.data = res.data.list;
      });
    },
    handleAvatarSuccess(res, file) {
      console.log(file);
      this.form.pic = URL.createObjectURL(file.raw);
      console.log(this.form.pic);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 50;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 50MB!");
      }
      console.log(this.form.pic);
      return isJPG && isLt2M;
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

<style lang="less" scoped>
.product_classify {
  width: 100%;
  height: 100%;
  img {
    width: 50px;
    height: 50px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>