<template>
    <div id="eleModuleb" />
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { start, loadMicroApp, MicroApp } from 'qiankun';
import { Action, State } from 'vuex-class';
import { setLanguageAction } from '../store/stateModel';

@Component
export default class ModuleB extends Vue {
    private instance: null | MicroApp = null;

    @Action('setLanguage') setLang: setLanguageAction;
    @State('language') lang: string;

    private get language() {
        return this.lang;
    }

    private timer: null | number = null;

    created(): void {
        this.timer = window.setInterval(() => {
            if (this.language === 'zh') {
                this.setLang('en');
            } else {
                this.setLang('zh');
            }
        }, 3000);
    }

    mounted(): void {
        // 初始化时传给子服务的数据
        const props: ModuleParams = {
            platform: 'pc',
            lang: 'zh-cn'
        };

        this.instance = loadMicroApp({
            name: 'moduleb',
            entry: process?.env?.NODE_ENV === 'development' ? 'http://localhost:8092/#/moduleb-router' : '/test/myconsole/module/moduleb/moduleb-router',
            container: '#eleModuleb',
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
        if (this.timer) {
            clearInterval(this.timer);
        }
    }
}
</script>
