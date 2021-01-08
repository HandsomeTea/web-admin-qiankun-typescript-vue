import 'babel-polyfill';
import Vue from 'vue';
import { Route } from 'vue-router';
// import { registerMicroApps, start } from 'qiankun';
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
    router,
    store,
    i18n,
    render: h => h(view),
    watch: {
        $route(to: Route /*, from*/) {
            if (to.meta.title) {
                document.title = `elementUI — ${to.meta.title}`;
            }
        },
        lang() {
            if (this.$i18n.locale !== this.lang) {
                this.$i18n.locale = this.lang;
            }
        }
    },
    created() {
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
    },
    computed: {
        lang() {
            return store.state.language;
        }
    }
}).$mount('#app');

// // 非开发环境下，即服务器环境(生产/测试环境)下才执行
// if (process?.env?.NODE_ENV !== 'development') {
//     const getRootData = {
//         data: { auth: false },
//         fns: [{
//             name: '_LOGIN',
//             _LOGIN(data: any) {
//                 console.log(`父应用返回信息${data}`);
//             }
//         }]
//     };

//     let ModuleHtmlText = '';
//     let ModuleIsLoading = false;
//     const render = (props: { appContent: string, loading: boolean }) => {
//         console.log(props);
//         ModuleHtmlText = props.appContent;
//         ModuleIsLoading = props.loading;
//     };

//     registerMicroApps([
//         {
//             name: 'moduleA',
//             entry: '/module/modulea/',
//             container: '#eleModulea',
//             render,
//             activeRule: (location) => {
//                 return location.href.includes('/modulea');
//             },
//             props: getRootData
//         },
//         {
//             name: 'moduleB',
//             entry: '/module/moduleb/',
//             container: '#eleModuleb',
//             render,
//             activeRule: (location) => {
//                 return location.href.includes('/moduleb');
//             },
//             props: getRootData
//         }], {
//         // beforeLoad: [
//         //     app => {
//         //         console.log('before load', app);
//         //     }
//         // ], // 挂载前回调
//         // beforeMount: [
//         //     app => {
//         //         console.log('before mount', app);
//         //     }
//         // ], // 挂载后回调
//         // afterUnmount: [
//         //     app => {
//         //         console.log('after unload', app);
//         //     }
//         // ] // 卸载后回调
//     });

//     // setDefaultMountApp('/index');

//     // 启动
//     // start();
// }

// registerMicroApps([{
//     name: 'moduleA',
//     entry: '/module/modulea/',
//     container: '#eleModulea',
//     activeRule: '/modulea'
// }, {
//     name: 'moduleB',
//     entry: '/module/moduleb/',
//     container: '#eleModuleb',
//     activeRule: '/moduleb'
// }]);
// start();
