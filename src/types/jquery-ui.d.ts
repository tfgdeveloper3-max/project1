import "jquery";

declare global {
    interface JQuery<TElement = HTMLElement> {
        tooltip(options?: JQueryUI.TooltipOptions): JQuery<TElement>;
        tooltip(methodName: "destroy" | "disable" | "enable" | "close" | "open"): JQuery<TElement>;
        tooltip(methodName: string, ...args: unknown[]): unknown;

        draggable(options?: JQueryUI.DraggableOptions): JQuery<TElement>;
        draggable(methodName: "destroy" | "disable" | "enable"): JQuery<TElement>;
        draggable(methodName: string, ...args: unknown[]): unknown;

        effect(options: unknown): JQuery<TElement>;
        effect(effect: string, options?: unknown, duration?: number | string, complete?: Function): JQuery<TElement>;
    }
}

export { };