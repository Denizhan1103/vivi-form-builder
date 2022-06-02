export enum CurrentPage {
    main = 'Main',
    builder = 'FormBuilder'
}

export interface AppState {
    currentPage: CurrentPage;
}