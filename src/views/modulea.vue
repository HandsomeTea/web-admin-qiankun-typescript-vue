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
        // 初始化时传给子服务的数据
        const props: ModuleParams = {
            platform: 'pc',
            lang: 'zh-cn'
        };

        this.instance = loadMicroApp({
            name: 'modulea',
            entry: process?.env?.NODE_ENV === 'development' ? 'http://localhost:8091/#/modulea' : '/module/modulea/index',
            container: '#eleModulea',
            props: props as unknown as Record<string, unknown>
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
        this.instance = null;
    }
}
</script>
