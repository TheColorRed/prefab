namespace prefab {
  export class dropdown {

    protected element: HTMLElement;
    protected dropdown: HTMLElement;

    public static init() {
      let dropdowns = document.querySelectorAll('.dropdown') as NodeListOf<HTMLElement>;
      for (let dd of dropdowns) {
        new dropdown(<HTMLElement>dd.previousElementSibling, dd);
      }
    }

    public constructor(element: HTMLElement, dropdown: HTMLElement) {
      this.element = element;
      this.dropdown = dropdown;
      this.element.addEventListener('click', this.click.bind(this))
      document.addEventListener('click', this.click.bind(this))
    }

    protected click(e: MouseEvent) {
      e.stopPropagation();
      if (e.currentTarget == this.element) {
        this.dropdown.classList.toggle('show');
      } else if (e.currentTarget == document) {
        this.dropdown.classList.remove('show');
      }
    }
  }
}