import { html } from 'lit-element';
import { ArcDemoPage } from '@advanced-rest-client/arc-demo-helper/ArcDemoPage.js';
import { DataGenerator } from '@advanced-rest-client/arc-data-generator/arc-data-generator.js';
import '@advanced-rest-client/arc-demo-helper/arc-interactive-demo.js';
import '@advanced-rest-client/arc-models/client-certificate-model.js';
import '@anypoint-web-components/anypoint-button/anypoint-button.js';
import '@anypoint-web-components/anypoint-checkbox/anypoint-checkbox.js';
import '@advanced-rest-client/client-certificates-panel/certificate-import.js';
import '@anypoint-web-components/anypoint-dialog/anypoint-dialog.js';
import '@anypoint-web-components/anypoint-dialog/anypoint-dialog-scrollable.js';
import '../cc-authorization-method.js';


class DemoPage extends ArcDemoPage {
  constructor() {
    super();
    this.initObservableProperties([
      'demoState',
      'compatibility',
      'outlined',
      'mainChangesCounter',
      'allowNone',
      'allowImportButton',
      'importOpened',
    ]);
    this._componentName = 'cc-authorization-method';
    this.demoStates = ['Filled', 'Outlined', 'Anypoint'];
    this.demoState = 0;
    this.mainChangesCounter = 0;

    this._demoStateHandler = this._demoStateHandler.bind(this);
    this._toggleMainOption = this._toggleMainOption.bind(this);
    this._mainChangeHandler = this._mainChangeHandler.bind(this);
    this.generateData = this.generateData.bind(this);
    this.deleteData = this.deleteData.bind(this);
    this._certImportHandler = this._certImportHandler.bind(this);
    this._closeImportHandler = this._closeImportHandler.bind(this);

    window.addEventListener('client-certificate-import', this._certImportHandler);
  }

  _toggleMainOption(e) {
    const { name, checked } = e.target;
    this[name] = checked;
  }

  _demoStateHandler(e) {
    const state = e.detail.value;
    this.demoState = state;
    this.outlined = state === 1;
    this.compatibility = state === 2;
  }

  _mainChangeHandler(e) {
    this.mainChangesCounter++;
    const data = e.target.serialize();
    console.log(data);
  }

  async generateData() {
    await DataGenerator.insertCertificatesData();
    const e = new CustomEvent('data-imported', {
      bubbles: true
    });
    document.body.dispatchEvent(e);
  }

  async deleteData() {
    const e = new CustomEvent('destroy-model', {
      detail: {
        models: ['client-certificates']
      },
      bubbles: true
    });
    document.body.dispatchEvent(e);
  }

  _certImportHandler() {
    this.importOpened = true;
  }

  _closeImportHandler() {
    this.importOpened = false;
  }

  _demoTemplate() {
    const {
      demoStates,
      darkThemeActive,
      compatibility,
      outlined,
      mainChangesCounter,
      demoState,
      allowNone,
      allowImportButton,
    } = this;
    return html`
      <section class="documentation-section">
        <h3>Interactive demo</h3>
        <p>
          This demo lets you preview the Client certificate authorization method element with various
          configuration options.
        </p>
        <arc-interactive-demo
          .states="${demoStates}"
          .selectedState="${demoState}"
          @state-chanegd="${this._demoStateHandler}"
          ?dark="${darkThemeActive}"
        >

          <cc-authorization-method
            ?compatibility="${compatibility}"
            ?outlined="${outlined}"
            ?none="${allowNone}"
            ?importButton="${allowImportButton}"
            slot="content"
            @change="${this._mainChangeHandler}"
          ></cc-authorization-method>

          <label slot="options" id="textAreaOptionsLabel">Options</label>
          <anypoint-checkbox
            aria-describedby="textAreaOptionsLabel"
            slot="options"
            name="allowNone"
            @change="${this._toggleMainOption}"
          >
            Allow none
          </anypoint-checkbox>
          <anypoint-checkbox
            aria-describedby="textAreaOptionsLabel"
            slot="options"
            name="allowImportButton"
            @change="${this._toggleMainOption}"
          >
            Allow import
          </anypoint-checkbox>
        </arc-interactive-demo>

        <p>Change events counter: ${mainChangesCounter}</p>

        <div class="data-options">
          <h3>Data options</h3>
          <anypoint-button @click="${this.generateData}">Generate data</anypoint-button>
          <anypoint-button @click="${this.deleteData}">Clear data</anypoint-button>
        </div>
      </section>

      ${this._importDialog()}
    `;
  }

  _introductionTemplate() {
    return html `
      <section class="documentation-section">
        <h2>Introduction</h2>
        <p>
          A web component to render accessible certificates based authorization form.
        </p>
        <p>
          This component implements Material Design styles.
        </p>
      </section>
    `;
  }

  _usageTemplate() {
    return html `
      <section class="documentation-section">
        <h2>Usage</h2>
        <p>Anypoint dropdown menu comes with 2 predefied styles:</p>
        <ul>
          <li><b>Filled</b> (default)</li>
          <li>
            <b>Compatibility</b> - To provide compatibility with Anypoint design
          </li>
        </ul>
      </section>`;
  }

  _importDialog() {
    const { importOpened } = this;
    return html`
    <anypoint-dialog ?opened="${importOpened}">
      <h2>Import a certificate</h2>
      <anypoint-dialog-scrollable>
        <certificate-import @close="${this._closeImportHandler}"></certificate-import>
      </anypoint-dialog-scrollable>
    </anypoint-dialog>
    `;
  }

  contentTemplate() {
    return html`
      <h2>Client certificate authorization method</h2>
      <client-certificate-model></client-certificate-model>
      ${this._demoTemplate()}
      ${this._introductionTemplate()}
      ${this._usageTemplate()}
    `;
  }
}

const instance = new DemoPage();
instance.render();
window._demo = instance;
