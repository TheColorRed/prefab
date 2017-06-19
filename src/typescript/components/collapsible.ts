namespace prefab {
  export class collapsible {

    protected a: HTMLAnchorElement;
    protected li: HTMLLIElement;

    public static init(): void {
      let lis = document.querySelectorAll('nav li.collapsible') as NodeListOf<HTMLLIElement>;
      for (let li of lis) {
        new collapsible(li, <HTMLAnchorElement>li.querySelector('a'));
      }
    }

    public constructor(li: HTMLLIElement, a: HTMLAnchorElement) {
      this.li = li;
      this.a = a;
      this.a.addEventListener('click', this.aClick.bind(this));
    }
    private aClick(e: MouseEvent) {
      e.preventDefault();
      this.a.parentElement ? this.a.parentElement.classList.toggle('active') : null;
    }
  }
}