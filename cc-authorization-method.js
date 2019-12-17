import { CcAuthorizationMethod } from './src/CcAuthorizationMethod.js';
export {
  METHOD_CC,
  defaultItemTemplate,
  certItemTemplate,
  emptyTemplate,
  contentTemplate,
  dateTimeTemplate,
  selectedHandler,
} from './src/CcAuthorizationMethod.js';
export { CcAuthorizationMethod };

window.customElements.define('cc-authorization-method', CcAuthorizationMethod);
