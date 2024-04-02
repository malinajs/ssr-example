import { mountStatic } from 'malinajs';
import App from './App.xht';

setTimeout(() => {
  document.body.innerHTML = '';
  mountStatic(document.body, App);
}, 3000)
