/// <reference types="node" />
declare namespace prefab {
    class tooltip {
        protected element: HTMLElement;
        protected tip: HTMLElement;
        protected timeout: NodeJS.Timer;
        protected tipsize: ClientRect;
        static init(): void;
        constructor(element: HTMLElement, tip: HTMLElement);
        protected hover(e: MouseEvent): void;
        protected hoverLeave(e: MouseEvent): void;
        protected positionTooltip(): void;
    }
}
