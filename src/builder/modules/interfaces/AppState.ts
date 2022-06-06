export enum CurrentPage {
    main = 'Main',
    builder = 'FormBuilder',
    componentTest = 'ComponentTest'
}

export interface AppState {
    currentPage: CurrentPage;
}