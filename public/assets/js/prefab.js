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
            this.timeout = setTimeout(() => this.tip.classList.remove('show', 'show-bounce', 'show-spin', 'show-slide-left', 'show-slide-right', 'show-slide-up', 'show-slide-down'), delay);
        }
        positionTooltip() {
            let rect = this.element.getBoundingClientRect();
            let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft, scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            let position = this.element.getAttribute('position') || this.element.getAttribute('data-positon') || null;
            let animation = this.element.getAttribute('animation') || this.element.getAttribute('data-animation') || 'show';
            animation = ('show-' + animation).replace('show-show', 'show');
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
            this.tip.classList.add(animation);
        }
    }
    prefab.tooltip = tooltip;
})(prefab || (prefab = {}));
var prefab;
(function (prefab) {
    class dropdown {
        constructor(element, dropdown) {
            this.element = element;
            this.dropdown = dropdown;
            this.element.addEventListener('click', this.click.bind(this));
            document.addEventListener('click', this.click.bind(this));
        }
        static init() {
            let dropdowns = document.querySelectorAll('.dropdown');
            for (let dd of dropdowns) {
                new dropdown(dd.previousElementSibling, dd);
            }
        }
        click(e) {
            e.stopPropagation();
            if (e.currentTarget == this.element) {
                this.dropdown.classList.toggle('show');
            }
            else if (e.currentTarget == document) {
                this.dropdown.classList.remove('show');
            }
        }
    }
    prefab.dropdown = dropdown;
})(prefab || (prefab = {}));
var prefab;
(function (prefab) {
    class collapsible {
        constructor(li, a) {
            this.li = li;
            this.a = a;
            this.a.addEventListener('click', this.aClick.bind(this));
        }
        static init() {
            let lis = document.querySelectorAll('nav li.collapsible');
            for (let li of lis) {
                new collapsible(li, li.querySelector('a'));
            }
        }
        aClick(e) {
            e.preventDefault();
            this.a.parentElement ? this.a.parentElement.classList.toggle('active') : null;
        }
    }
    prefab.collapsible = collapsible;
})(prefab || (prefab = {}));
document.addEventListener('DOMContentLoaded', e => {
    e.preventDefault();
    prefab.tooltip.init();
    prefab.dropdown.init();
    prefab.collapsible.init();
});
