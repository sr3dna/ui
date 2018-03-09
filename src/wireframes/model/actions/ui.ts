import { Reducer } from 'redux';

import { UIState } from '@app/wireframes/model';

export const COPY = 'COPY';
export const copy: (value: string) => any = (value: string) => {
    return { type: COPY, payload: value };
};

export const SET_ZOOM = 'SET_ZOOM';
export const setZoom: (value: number) => any = (value: number) => {
    return { type: SET_ZOOM, payload: value };
};

export const SELECT_TAB = 'SELECT_TAB';
export const selectTab: (value: string) => any = (value: string) => {
    return { type: SELECT_TAB, payload: value };
};

export const SET_SHOW_LEFT_SIDEBAR = 'SET_SHOW_LEFT_SIDEBAR';
export const setShowLeftSidebar: (value: boolean) => any = (value: boolean) => {
    return { type: SET_SHOW_LEFT_SIDEBAR, payload: value };
};

export const SET_RIGHT_SIDEBAR = 'SET_SHOW_RIGHT_SIDEBAR';
export const setShowRightSidebar: (value: boolean) => any = (value: boolean) => {
    return { type: SET_RIGHT_SIDEBAR, payload: value };
};

export function ui(): Reducer<UIState> {
    const reducer: Reducer<UIState> = (state: UIState, action: any) => {
        switch (action.type) {
            case SET_ZOOM:
                return {...state, zoom: action.payload };
            case COPY:
                return {...state, clipboard: action.payload };
            case SELECT_TAB:
                return {...state, selectedTab: action.payload };
            case SET_SHOW_LEFT_SIDEBAR:
                return {...state, showLeftSidebar: action.payload };
            case SET_RIGHT_SIDEBAR:
                return {...state, showRightSidebar: action.payload };
            default:
                return {
                    selectedTab: 'Shapes',
                    clipboard: null,
                    showLeftSidebar: true,
                    showRightSidebar: true,
                    zoom: 1
                };
        }
    };

    return reducer;
}