<template>
    <div id="eleModuleb" />
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { start, loadMicroApp, MicroApp } from 'qiankun';
// import { start } from 'qiankun';

@Component
export default class ModuleB extends Vue {
    private instance: null | MicroApp = null;

    mounted(): void {
        // console.log('hasb', document.getElementById('appB'));
        this.instance = loadMicroApp({
            name: 'moduleB',
            entry: `${window.location.origin}/module/moduleb/`,
            container: '#eleModuleb',
            props: {}
        });
        start();
    }

    destroyed(): void {
        this.instance?.unmount();
    }
}
</script>
