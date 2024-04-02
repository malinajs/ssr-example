
import { JSDOM } from 'jsdom';
import app from './ssr-bundle.mjs';

import fs from 'fs';

const index_html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>test</title>
    <script defer src='/bundle.js'></script>
    {head}
  </head>
  <body>
    {body}
    <div style="color: red; margin-top: 40px;">loading...</div>
  </body>
</html>`;

const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);

global.document = dom.window.document;

app(dom.window.document.body);


setTimeout(() => {
  document.body.querySelectorAll('input').forEach(input => {
    if(input.checked) input.setAttribute('checked', 'checked');
    if(input.selected) input.setAttribute('selected', 'selected');
    if(input.value) input.setAttribute('value', input.value);
  });

  let result = index_html.replace('{head}', dom.window.document.head.innerHTML)
    .replace('{body}', dom.window.document.body.innerHTML);
  console.log(result);
  fs.writeFileSync('./public/index.html', result);
}, 10);
