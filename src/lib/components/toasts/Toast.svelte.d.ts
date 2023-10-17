import { SvelteComponentTyped } from "svelte";
import type { Colors, TransitionTypes, TransitionParamTypes } from '../types';
declare const __propDef: {
    props: {
        [x: string]: any;
        color?: Colors;
        simple?: boolean;
        transition?: TransitionTypes;
        params?: TransitionParamTypes;
        position?: 'tl' | 'tr' | 'bl' | 'br';
        visible?: boolean;
        divClass?: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        icon: {};
        default: {};
        extra: {};
    };
};
export declare type ToastProps = typeof __propDef.props;
export declare type ToastEvents = typeof __propDef.events;
export declare type ToastSlots = typeof __propDef.slots;
export default class Toast extends SvelteComponentTyped<ToastProps, ToastEvents, ToastSlots> {
}
export {};
