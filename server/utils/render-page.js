const InfernoServer = require('inferno-server');
const { createElement } = require('inferno-create-element');

function renderPage(component, pageElements, props) {
  return (`
      <html>
          <head>
              <title>${pageElements.title}</title>
              ${ (pageElements.cssFiles || []).map(fileName => (
                `<link rel="stylesheet" href="/${fileName}" />`
              ))}
          </head>

          <body>
              <div id="root">
                  ${InfernoServer.renderToString(createElement(component, props, null))}
              </div>

              ${ (pageElements.jsFiles || []).map(fileName => (
                  `<script src="${fileName}" />`
              ))}

              ${ props && 
                  `<script>var APP_DATA = ${JSON.stringify(props)};</script>`
              }
          </body>
      </html>
  `);
}

module.exports = renderPage;
