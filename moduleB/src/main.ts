import Vue from 'vue';
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
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
let instance = null;

const render = (props?: { container: HTMLElement }) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    if (!instance) {
        instance = new Vue({
            router,
            store,
            i18n,
            render: h => h(view)
        }).$mount(props?.container ? props?.container.querySelector('#appB') || '#appB' : '#appB');
    }
};

if (process?.env?.NODE_ENV === 'development') {
    render();
}

export async function bootstrap(): Promise<void> {
    //
}

export async function mount(props: { container: HTMLElement }): Promise<void> {
    render(props);
}

export async function unmount(): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    instance.$destroy();
    instance = null;
}

export async function update(): Promise<void> {
    //
}
