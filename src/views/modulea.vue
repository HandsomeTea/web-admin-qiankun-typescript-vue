<template>
    <div id="eleModulea" />
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { start, loadMicroApp, MicroApp } from 'qiankun';

@Component
export default class ModuleA extends Vue {
    private instance: null | MicroApp = null;

    mounted(): void {
        this.instance = loadMicroApp({
            name: 'modulea',
            entry: process?.env?.NODE_ENV === 'development' ? 'http://localhost:8091' : '/module/modulea/index',
            container: '#eleModulea',
            props: {}
        });
        this.instance.mountPromise.then(() => {
            start();
        }).catch(e => {
            console.log('a error', e);
        });
    }

    destroyed(): void {
        this.instance?.unmount();
    }
}
</script>
