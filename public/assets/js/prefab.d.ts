/// <reference types="node" />
declare namespace prefab {
    class tooltip {
        static tipsAdded: number;
        protected element: HTMLElement;
        protected timeout: NodeJS.Timer;
        protected tipsize: ClientRect;
        static init(): void;
        constructor(element: HTMLElement);
        protected hover(e: MouseEvent): void;
        protected positionTooltip(target: HTMLElement, tip: HTMLElement): void;
        protected hoverLeave(e: MouseEvent): void;
    }
}
