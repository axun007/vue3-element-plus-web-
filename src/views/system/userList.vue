<template>
  <div class="user_box">
   <FilterHeaderVue>
      <template #left>
         <div class="left_box">
            <el-button>添加用户</el-button>
            <el-button>删除</el-button>
            <el-button>禁用</el-button>
            <el-button>启用</el-button>
         </div>
      </template>
      <template #right>
         <div class="left_box">
            <el-input label='用户名' placeholder="请输入用户名或手机号" suffix-icon="search"></el-input>
         </div>
      </template>
   </FilterHeaderVue>
   <div class="table_box">
      <el-table :data="userList" stripe size="large" border class="user_table">
         <el-table-column type="selection" :width="50" align="center"></el-table-column>
         <el-table-column label="姓名" prop="userName" width="150"></el-table-column>
         <el-table-column label="昵称" prop="nickName" width="150"></el-table-column>
         <el-table-column label="分组" prop="grouping" width="150">
            <template v-slot="scope">
               <template v-if="scope.row.grouping === 1">
                  <el-tag type="success">超级管理员</el-tag>   
               </template>
               <template v-else-if="scope.row.grouping === 2">
                  <el-tag>管理员</el-tag>   
               </template>
               <template v-else-if="scope.row.grouping === 3">
                  <el-tag type="warning">普通用户</el-tag>   
               </template>
               <template v-else>
                  <el-tag type="info">游客</el-tag>   
               </template>
            </template>
         </el-table-column>
         <el-table-column label="手机号" prop="mobile" width="150"></el-table-column>
         <el-table-column label="地址" prop="address" align="center"></el-table-column>
         <el-table-column label="最后登录时间" prop="lateFinish_date" width="200"></el-table-column> 
         <el-table-column label="创建日期" prop="create_data" width="200"></el-table-column> 
         <el-table-column label="状态" prop="active" width="80">
            <template v-slot="scope">
               <span v-if="scope.row.active">
                   <el-tag type="success">启用</el-tag>
               </span>
               <span v-else>
                   <el-tag type="danger">禁用</el-tag>
               </span>
            </template>
         </el-table-column>
      </el-table>
      <div class="cll-footer">
        <el-pagination
          :current-page="1"
          :total="15"
          :page-size="1"
          layout="prev, pager, next, jumper, total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
   </div>
  </div>
</template>
 
<script setup>
import { reactive } from 'vue'
import FilterHeaderVue from '../../components/FilterHeader.vue'

let userList = reactive([
   {
      userName: 'tomax',
      nickName: 'ax',
      grouping: 1,
      address: '上海市普陀区金沙江路1518弄汤臣一品A座17楼6666',
      create_data: '2023-08-25 18:00:13',
      lateFinish_date: '2023-08-25 18:00:13',
      mobile: '15677849856',
      active: true
   }
])
for (let i = 1; i <= 14; i++) {
   userList.push({
      userName: 'tomax',
      nickName: 'ax',
      grouping: i % 2 === 0 ? 2 : i % 3 === 0 ? 3 : i % 4 === 0 ? 4 : 5,
      address: '上海市普陀区金沙江路1518弄汤臣一品A座17楼6666',
      create_data: '2023-08-25 18:00:13',
      lateFinish_date: '2023-08-25 18:00:13',
      mobile: '15677849856',
      active: i % 2 === 0 ? true : false
   })
}
function handleSizeChange () {}
function handleCurrentChange () {}
</script>
 
<style lang="scss">
.user_box{
   width: 100%;
   height: 100%;
   background: white;
   .table_box{
      height: 50px;
      .user_table{
         cursor: pointer;
      }
   }
   .cll-footer {
      padding: 0;
      margin-top: 10px;
      display: flex;
      justify-content: flex-end;
   .cll-actions {
      display: flex;
      .cll-btn + .cll-btn {
         margin-left: 10px;
      }
   }
   }
}
</style>
 