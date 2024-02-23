<template>
  <div class="role_box">
   <FilterHeaderVue>
      <template #left>
         <div class="left_box">
            <el-button>添加角色</el-button>
            <el-button>删除</el-button>
            <el-button>禁用</el-button>
            <el-button>启用</el-button>
         </div>
      </template>
      <template #right>
         <div class="left_box">
            <el-input label='用户名' placeholder="请输入组名" suffix-icon="search"></el-input>
         </div>
      </template>
   </FilterHeaderVue>
   <div class="table_box">
      <el-table :data="roleList" stripe size="large" class="role_table">
         <el-table-column type="selection" :width="50" align="center"></el-table-column>
         <el-table-column label="组别名称" prop="label"></el-table-column>
         <el-table-column label="权限" prop="authority"></el-table-column>
         <el-table-column label="修改时间" prop="upload_date"></el-table-column>
         <el-table-column label="创建时间" prop="created_date"></el-table-column>
         <el-table-column label="状态" prop="avtive">
            <template v-slot="scope">
               <span v-if="scope.row.active">
                   <el-tag type="success">启用</el-tag>
               </span>
               <span v-else>
                   <el-tag type="danger">禁用</el-tag>
               </span>
            </template>
         </el-table-column>
         <el-table-column label="操作" width="90px">
            <div class="edit_group">
               <el-button type="primary" icon="edit"/>
               <el-button type="danger" icon="DeleteFilled"/>
            </div>
         </el-table-column>
      </el-table>
      <div class="cll-footer">
        <el-pagination
          :current-page="1"
          :total="15"
          :page-size="10"
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
let roleList = reactive([
   { label: '超级管理员', active: true, upload_date: '2023-08-25 03:15:21', created_date: '2023-12-25 03:15:21', authority: '超级管理员' },
   { label: '管理员', active: true, upload_date: '2023-08-25 03:15:21', created_date: '2023-12-25 03:15:21', authority: '控制台等66项' },
   { label: '普通', active: true, upload_date: '2023-08-25 03:15:21', created_date: '2023-12-25 03:15:21', authority: '管理数据23项' },
   { label: '游客', active: true, upload_date: '2023-08-25 03:15:21', created_date: '2023-12-25 03:15:21', authority: '仅访问' },
])
function handleSizeChange () {}
function handleCurrentChange () {}
</script>
<style lang="scss">
.role_box{
   width: 100%;
   height: 100%;
   background: white;
   .table_box{
      height: 50px;
   }
   .role_table{
      cursor: pointer;
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
 .edit_group{
   display: flex;
   justify-content: space-between;
   align-items: center;
 }
}
</style>
<style lang="scss" scoped>
::v-deep(.el-button--primary){
   border: 0px;
   width: 24px !important;
   height: 24px !important;
   padding: 0;
   .el-icon{
      font-size: 17px !important;
   }
}
::v-deep(.el-button--danger){
   border: 0px;
   width: 24px !important;
   height: 24px !important;
   padding: 0;
   .el-icon{
      font-size: 14px !important;
   }
}
</style>
 