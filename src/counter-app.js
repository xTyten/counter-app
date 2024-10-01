import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

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
      }

      #button-wrapper {
        width: 100%;
        height: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
      }

      #minus, #plus {
        width: 188px;
        height: 184px;
        font-size: 64px;
      }
    `];
  }

  render() {
    return html`
      <!--
      <div class="wrapper">
        <div>${this.title}</div>
        <slot></slot>
      </div>
      -->
      <div id="counter-wrapper">
        <div id="counter">
          <h2>${this.counter}</h2>
        </div>
        <div id="button-wrapper">
          <button id="minus" @click=${this.handleButtonClick}>-</button>
          <button id="plus" @click=${this.handleButtonClick}>+</button>
        </div>
      </div>
    `;
  }

  handleButtonClick() {
    console.log("Button clicked!");
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