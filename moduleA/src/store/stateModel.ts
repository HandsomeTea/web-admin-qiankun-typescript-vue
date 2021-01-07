export interface RootState {
    loginStatus: boolean
    language: string
    menuHidden: boolean
    screenType: 'phone' | 'ipad' | 'spc' | 'pc' | ''
}

export interface UserState {
    username: string
}

export interface toogleSideAction {
    (): never
}

export interface setLanguageAction {
    (language: 'zh' | 'en'): never // eslint-disable-line no-unused-vars
}
