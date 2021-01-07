<template>
    <el-container>
        <router-view></router-view>
    </el-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Layout extends Vue {

}
</script>
