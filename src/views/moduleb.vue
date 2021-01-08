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
            entry: '/module/moduleb/index',
            container: '#eleModuleb',
            props: {}
        });
        this.instance.mountPromise.then(() => {
            start();
            console.log('b status', this.instance?.getStatus());
        }).catch(e => {
            console.log('b error', e);
        });

    }

    destroyed(): void {
        this.instance?.unmount();
    }
}
</script>
