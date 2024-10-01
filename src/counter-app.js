import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { classMap } from 'lit/directives/class-map.js'

export class counterApp extends DDDSuper(LitElement) {

  static get tag() {
    return "counter-app";
  }

  constructor() {
    super();
    this.title = "";
    this.counter = 1;
    this.min = 0;
    this.max = 10;
  }

  static get properties() {
    return {
      title: { type: String },
      counter: { type: Number },
      min: { type: Number },
      max: { type: Number },
    };
  }

  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
        font-size: var(--counter-app-font-size, var(--ddd-font-size-s));
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      div {
        padding: 0;
        margin: 0;
      }

      #counter-wrapper {
        width: 400px;
        height: 400px;
        display: flex;
        flex-direction: column;
        border: solid;
        background-color: #fff;
      }

      #counter {
        width: 100%;
        height: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      h2 {
        font-size: 128px;
        font-family: Lato;
      }

      #button-wrapper {
        width: 100%;
        height: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
      }

      #minus {
        width: 188px;
        height: 184px;
        font-size: 64px;
        font-family: Lato;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        background-color: #fce5e3;
      }
      #plus {
        width: 188px;
        height: 184px;
        font-size: 64px;
        font-family: Lato;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        background-color: #e3fce9;
      }
      #minus:hover, #minus:focus {
        box-shadow: none;
        background-color: #edd7d5;
      } 
      #plus:hover, #plus:focus {
        box-shadow: none;
        background-color: #d3ebd9;
      }
    `];
  }

  render() {
    const classes = {
      'eighteen': this.counter === 18,
      'twentyOne': this.counter === 21,
      'minOrMax': this.counter === this.min || this.counter === this.max
    };

    return html`
      <!--
      <div class="wrapper">
        <div>${this.title}</div>
        <slot></slot>
      </div>
      -->
      <style>
        .minOrMax {
          color: grey;
        }
        .eighteen {
          color: #03bafc;
        }
        .twentyOne {
          color: #ff9ef2;
        }
      </style>

      <confetti-container id="confetti">
        <div id="counter-wrapper">
          <div id="counter">
            <h2 class="${classMap(classes)}">${this.counter}</h2>
          </div>
          <div id="button-wrapper">
            <button id="minus" @click=${this.minusButtonClick} ?disabled="${this.min === this.counter}">-</button>
            <button id="plus" @click=${this.plusButtonClick} ?disabled="${this.max === this.counter}">+</button>
          </div>
        </div>
      </confetti-container>
    `;
  }

  minusButtonClick() {
    console.log("Minus button clicked!");
    if (this.counter > this.min) {
      this.counter -= 1;
    }
  }
  plusButtonClick() {
    console.log("Plus button clicked!");
    if (this.counter < this.max) {
      this.counter += 1;
    }
  }

  updated(changedProperties) {
    if (changedProperties.has('counter')) {
      if(this.counter === 21) {
        console.log("Equal to 21");
        this.makeItRain();
      }
    }
  }
  
  makeItRain() {
    console.log("makeItRain() is now running");
    // this is called a dynamic import. It means it won't import the code for confetti until this method is called
    // the .then() syntax after is because dynamic imports return a Promise object. Meaning the then() code
    // will only run AFTER the code is imported and available to us
    import("@haxtheweb/multiple-choice/lib/confetti-container.js").then(
      (module) => {
        // This is a minor timing 'hack'. We know the code library above will import prior to this running
        // The "set timeout 0" means "wait 1 microtask and run it on the next cycle.
        // this "hack" ensures the element has had time to process in the DOM so that when we set popped
        // it's listening for changes so it can react
        setTimeout(() => {
          // forcibly set the poppped attribute on something with id confetti
          // while I've said in general NOT to do this, the confetti container element will reset this
          // after the animation runs so it's a simple way to generate the effect over and over again
          this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
        }, 0);
      }
    );
  }
  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(counterApp.tag, counterApp);