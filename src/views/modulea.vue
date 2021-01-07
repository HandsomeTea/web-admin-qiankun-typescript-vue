<template>
    <div id="eleModulea" />
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { start, loadMicroApp, MicroApp } from 'qiankun';
// import { start } from 'qiankun';

@Component
export default class ModuleA extends Vue {
    private instance: null | MicroApp = null;

    mounted(): void {
        // console.log('hasa', document.getElementById('appA'));
        this.instance = loadMicroApp({
            name: 'moduleA',
            entry: `${window.location.origin}/module/modulea/`,
            container: '#eleModulea',
            props: {}
        });
        start();
    }

    destroyed(): void {
        this.instance?.unmount();
    }
}
</script>
