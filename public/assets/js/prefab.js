"use strict";
var prefab;
(function (prefab) {
    class tooltip {
        constructor(element, tip) {
            this.element = element;
            this.tip = tip;
            element.addEventListener('mouseover', this.hover.bind(this));
            element.addEventListener('mouseleave', this.hoverLeave.bind(this));
            this.tipsize = this.tip.getBoundingClientRect();
            setTimeout(() => {
                this.tip.style.color = '#fff';
                this.tip.style.backgroundColor = '#000';
            }, 1000);
        }
        static init() {
            let tiphovers = document.querySelectorAll('.tooltip');
            for (let tip of tiphovers) {
                new tooltip(tip.previousElementSibling, tip);
            }
        }
        hover(e) {
            let delay = parseInt(this.element.getAttribute('open-delay') || this.element.getAttribute('data-open-delay') || '200');
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => this.positionTooltip(), delay);
        }
        hoverLeave(e) {
            let delay = parseInt(this.element.getAttribute('close-delay') || this.element.getAttribute('data-close-delay') || '0');
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => this.tip.classList.remove('show'), delay);
        }
        positionTooltip() {
            let rect = this.element.getBoundingClientRect();
            let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft, scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            let position = this.element.getAttribute('position') || this.element.getAttribute('data-positon') || null;
            position = typeof position == 'string' ? position.toLowerCase() : null;
            switch (position) {
                case 'top':
                    this.tip.style.left = ((rect.left + scrollLeft + rect.width / 2) - (this.tipsize.width / 2)) + 'px';
                    this.tip.style.top = (rect.top + scrollTop - this.tipsize.height) - 5 + 'px';
                    break;
                case 'left':
                    this.tip.style.left = (rect.left + scrollLeft - this.tipsize.width - 5) + 'px';
                    this.tip.style.top = ((rect.top + scrollTop) - (this.tipsize.height / 2) + 10) + 'px';
                    break;
                case 'right':
                    this.tip.style.left = (rect.left + scrollLeft + rect.width + 5) + 'px';
                    this.tip.style.top = ((rect.top + scrollTop) - (this.tipsize.height / 2) + 10) + 'px';
                    break;
                case 'bottom':
                default:
                    this.tip.style.left = ((rect.left + scrollLeft + rect.width / 2) - (this.tipsize.width / 2)) + 'px';
                    this.tip.style.top = rect.bottom + scrollTop + 5 + 'px';
                    break;
            }
            this.tip.classList.add('show');
        }
    }
    prefab.tooltip = tooltip;
})(prefab || (prefab = {}));
document.addEventListener('DOMContentLoaded', e => {
    e.preventDefault();
    prefab.tooltip.init();
});
