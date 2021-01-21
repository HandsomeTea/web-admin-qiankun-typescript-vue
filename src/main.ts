import 'babel-polyfill';
import Vue from 'vue';
import { Route } from 'vue-router';
import { initGlobalState } from 'qiankun';
import store from './store';
import router from './router';
import i18n from './lang';
import view from './views/index.vue';
import Tips from './ui-frame/ui-tips';
import './ui-frame';
import './assets';
Vue.config.productionTip = false;
Vue.config.performance = true;
Vue.config.errorHandler = async (error: Error /*, vm, info*/) => {
    Tips.error(`${error}`);
};
Vue.config.warnHandler = (msg: string /*, vm, trace*/) => {
    console.error(msg); /* eslint-disable-line no-console */
};

new Vue({
    data: {
        toModuleParams: initGlobalState()
    },
    router,
    store,
    i18n,
    render: h => h(view),
    created() {
        this.toModuleParams = initGlobalState({ platform: '', lang: '', action: '' });
        store.dispatch('setScreenType');
    },
    mounted() {
        let waitForResizeEndTimer: null | number = null;

        window.onresize = () => {
            const waitTime = 500;

            if (waitForResizeEndTimer === null) {
                waitForResizeEndTimer = window.setTimeout(() => {
                    store.dispatch('setScreenType');
                }, waitTime);
            } else {
                clearTimeout(waitForResizeEndTimer);
                waitForResizeEndTimer = window.setTimeout(() => {
                    store.dispatch('setScreenType');
                }, waitTime);
            }
        };

        this.toModuleParams.onGlobalStateChange((state: Record<string, unknown>) => {
            // eslint-disable-next-line no-console
            console.log('主应用监听全局通信变化', state);
        });
    },
    computed: {
        lang() {
            return store.state.language;
        },
        platform() {
            return store.state.screenType;
        }
    },
    watch: {
        $route(to: Route /*, from*/) {
            if (to.meta.title) {
                document.title = `elementUI — ${to.meta.title}`;
            }
        },
        lang() {
            this.$i18n.locale = this.lang;
            this.toModuleParams.setGlobalState({ lang: this.lang });
        },
        platform() {
            this.toModuleParams.setGlobalState({ platform: this.platform });
        }
    }
}).$mount('#app');
