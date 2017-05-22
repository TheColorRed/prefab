namespace prefab {

  export class tooltip {
    public static tipsAdded = 0;
    protected element: HTMLElement;
    protected timeout: NodeJS.Timer;
    protected tipsize: ClientRect;

    public static init() {
      let tips = document.querySelectorAll('.tool-tip') as NodeListOf<HTMLElement>;
      for (let tip of tips) {
        let p = tip.parentElement;
        if (p) { p.removeChild(tip); }
      }
      let tiphovers = document.querySelectorAll('.tooltip') as NodeListOf<HTMLElement>;
      for (let tip of tiphovers) {
        this.tipsAdded++;
        new tooltip(tip);
      }
    }

    public constructor(element: HTMLElement) {
      this.element = element;
      element.addEventListener('mouseover', this.hover.bind(this));
      element.addEventListener('mouseleave', this.hoverLeave.bind(this));
      let tipid = 'tip-' + tooltip.tipsAdded;
      // Modify the title tag
      element.setAttribute('data-title', (element.getAttribute('title') || element.getAttribute('data-title') || ''));
      element.setAttribute('data-target-id', tipid);
      element.removeAttribute('title');

      // Setup the custom tooltip
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

    protected hover(e: MouseEvent) {
      e.preventDefault();
      let target = e.target as HTMLElement;
      let tip = document.querySelector('#' + target.getAttribute('data-target-id')) as HTMLElement;
      let delay = parseInt(target.getAttribute('open-delay') || target.getAttribute('data-open-delay') || '200');
      clearTimeout(this.timeout);
      // console.log(this.tipsize)
      this.timeout = setTimeout(() => {
        this.positionTooltip(target, tip);
      }, delay);
    }

    protected positionTooltip(target: HTMLElement, tip: HTMLElement) {
      if (target && tip) {
        let rect = target.getBoundingClientRect();
        let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
          scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        let position = target.getAttribute('position') || target.getAttribute('data-positon') || null;
        position = typeof position == 'string' ? position.toLowerCase() : null;
        switch (position) {
          case 'top':
            tip.style.left = ((rect.left + scrollLeft + rect.width / 2) - (this.tipsize.width / 2)) + 'px'
            tip.style.top = (rect.top + scrollTop - this.tipsize.height) - 5 + 'px';
            break;
          case 'left':
            tip.style.left = (rect.left + scrollLeft - this.tipsize.width - 5) + 'px'
            tip.style.top = ((rect.top + scrollTop) - 5) + 'px';
            break;
          case 'right':
            tip.style.left = (rect.left + scrollLeft + rect.width + 5) + 'px'
            tip.style.top = ((rect.top + scrollTop) - 5) + 'px';
            break;
          case 'bottom':
          default:
            tip.style.left = ((rect.left + scrollLeft + rect.width / 2) - (this.tipsize.width / 2)) + 'px'
            tip.style.top = rect.bottom + scrollTop + 5 + 'px';
            break;
        }
        tip.classList.add('show');
      }
    }

    protected hoverLeave(e: MouseEvent) {
      e.preventDefault();
      let target = e.target as HTMLElement;
      let tip = document.querySelector('#' + target.getAttribute('data-target-id'));
      let delay = parseInt(target.getAttribute('close-delay') || target.getAttribute('data-close-delay') || '0');
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        tip ? tip.classList.remove('show') : null;
      }, delay);
    }
  }

}