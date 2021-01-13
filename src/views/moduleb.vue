<template>
    <div id="eleModuleb" />
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { start, loadMicroApp, MicroApp } from 'qiankun';

@Component
export default class ModuleB extends Vue {
    private instance: null | MicroApp = null;

    mounted(): void {
        this.instance = loadMicroApp({
            name: 'moduleb',
            entry: process?.env?.NODE_ENV === 'development' ? 'http://localhost:8092/#/moduleb' : '/module/moduleb/index',
            container: '#eleModuleb',
            props: {}
        });
        this.instance.mountPromise.then(() => {
            start();
        }).catch(e => {
            // eslint-disable-next-line no-console
            console.log(e);
        });
    }

    destroyed(): void {
        this.instance?.unmount();
    }
}
</script>
