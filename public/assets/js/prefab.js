"use strict";
var prefab;
(function (prefab) {
    class tooltip {
        constructor(element) {
            this.element = element;
            element.addEventListener('mouseover', this.hover.bind(this));
            element.addEventListener('mouseleave', this.hoverLeave.bind(this));
            let tipid = 'tip-' + tooltip.tipsAdded;
            element.setAttribute('data-title', (element.getAttribute('title') || element.getAttribute('data-title') || ''));
            element.setAttribute('data-target-id', tipid);
            element.removeAttribute('title');
            let toolTipElement = document.createElement('span');
            toolTipElement.classList.add('tool-tip');
            toolTipElement.setAttribute('id', tipid);
            toolTipElement.innerText = element.getAttribute('data-title') || '';
            document.body.appendChild(toolTipElement);
            setTimeout(() => {
                toolTipElement.style.color = '#fff';
                toolTipElement.style.backgroundColor = '#000';
            }, 1000);
            this.tipsize = toolTipElement.getBoundingClientRect();
        }
        static init() {
            let tips = document.querySelectorAll('.tool-tip');
            for (let tip of tips) {
                let p = tip.parentElement;
                if (p) {
                    p.removeChild(tip);
                }
            }
            let tiphovers = document.querySelectorAll('.tooltip');
            for (let tip of tiphovers) {
                this.tipsAdded++;
                new tooltip(tip);
            }
        }
        hover(e) {
            e.preventDefault();
            let target = e.target;
            let tip = document.querySelector('#' + target.getAttribute('data-target-id'));
            let delay = parseInt(target.getAttribute('open-delay') || target.getAttribute('data-open-delay') || '200');
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                this.positionTooltip(target, tip);
            }, delay);
        }
        positionTooltip(target, tip) {
            if (target && tip) {
                let rect = target.getBoundingClientRect();
                let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft, scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                let position = target.getAttribute('position') || target.getAttribute('data-positon') || null;
                position = typeof position == 'string' ? position.toLowerCase() : null;
                switch (position) {
                    case 'top':
                        tip.style.left = ((rect.left + scrollLeft + rect.width / 2) - (this.tipsize.width / 2)) + 'px';
                        tip.style.top = (rect.top + scrollTop - this.tipsize.height) - 5 + 'px';
                        break;
                    case 'left':
                        tip.style.left = (rect.left + scrollLeft - this.tipsize.width - 5) + 'px';
                        tip.style.top = ((rect.top + scrollTop) - 5) + 'px';
                        break;
                    case 'right':
                        tip.style.left = (rect.left + scrollLeft + rect.width + 5) + 'px';
                        tip.style.top = ((rect.top + scrollTop) - 5) + 'px';
                        break;
                    case 'bottom':
                    default:
                        tip.style.left = ((rect.left + scrollLeft + rect.width / 2) - (this.tipsize.width / 2)) + 'px';
                        tip.style.top = rect.bottom + scrollTop + 5 + 'px';
                        break;
                }
                tip.classList.add('show');
            }
        }
        hoverLeave(e) {
            e.preventDefault();
            let target = e.target;
            let tip = document.querySelector('#' + target.getAttribute('data-target-id'));
            let delay = parseInt(target.getAttribute('close-delay') || target.getAttribute('data-close-delay') || '0');
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                tip ? tip.classList.remove('show') : null;
            }, delay);
        }
    }
    tooltip.tipsAdded = 0;
    prefab.tooltip = tooltip;
})(prefab || (prefab = {}));
document.addEventListener('DOMContentLoaded', e => {
    e.preventDefault();
    prefab.tooltip.init();
});
