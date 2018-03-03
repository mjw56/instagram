const InfernoServer = require('inferno-server');
const { StaticRouter } = require('inferno-router');
const { createElement } = require('inferno-create-element');

function renderPage({ component, pageElements, props }) {
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
                  ${InfernoServer.renderToString(
                        createElement(StaticRouter, { location: props.url },
                            createElement(component, { data: props.data }, null)
                        )
                    )}
              </div>

              ${ props && 
                `<script>var APP_DATA = ${JSON.stringify(props)};</script>`
              }

              ${ (pageElements.jsFiles || []).map(fileName => (
                  `<script src="${fileName}"></script>`
              ))}
          </body>
      </html>
  `);
}

module.exports = renderPage;
