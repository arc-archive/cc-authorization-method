# cc-authorization-method

A web component that extends `@advanced-rest-client/authorization-method` to allow to select a client certificate as an authorization method.

The component mixes in `@advanced-rest-client/client-certificates-consumer-mixin` that communicates with the application by using DOM events.
The application has to handle the following events for this element to work:

-   client-certificate-list - requests to list installed certificates
-   client-certificate-insert - request to insert new certificate
-   client-certificate-delete - request to delete installed certificate

Note that `-insert` and `-delete` events are not dispatched by this element but are defined in the mixin interface.

Default storage interface is provided with `@advanced-rest-client/arc-models/client-certificate-model.js` [see implementation](https://github.com/advanced-rest-client/arc-models/blob/stage/src/ClientCertificateModel.js).

An UI to manage installed certificates is provided by `@advanced-rest-client/client-certificates-panel`.

## Usage

### Installation

```bash
npm install --save @advanced-rest-client/cc-authorization-method
```

### In an html file

```html
<html>
  <head>
    <script type="module">
      import '@advanced-rest-client/cc-authorization-method/cc-authorization-method.js';
      import '@advanced-rest-client/arc-models/client-certificate-model.js';
    </script>
  </head>
  <body>
    <client-certificate-model></client-certificate-model>
    <cc-authorization-method></cc-authorization-method>
  </body>
</html>
```

### In a LitElement

```js
import { LitElement, html } from 'lit-element';
import '@advanced-rest-client/cc-authorization-method/cc-authorization-method.js';

class SampleElement extends LitElement {
  render() {
    const { amfModel, security } = this;
    return html`
    <cc-authorization-method
      type="client certificate"
      @change="${this._securityChangeHandler}"></cc-authorization-method>
    `;
  }

  _securityChangeHandler(e) {
    console.log('current authorization settings', e.target.serialize());
  }
}
customElements.define('sample-element', SampleElement);
```

## Development

```sh
git clone https://github.com/advanced-rest-client/cc-authorization-method
cd cc-authorization-method
npm install
```

### Running the demo locally

```sh
npm start
```

### Running the tests
```sh
npm test
```

### API components

This components is a part of [API components ecosystem](https://elements.advancedrestclient.com/)
