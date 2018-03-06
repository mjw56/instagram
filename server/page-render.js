function renderPage({ title, markup, jsFiles, cssFiles, pageData }) {  
  return (`
      <html>
          <head>
              <title>${title}</title>
              ${ (cssFiles || []).map(fileName => (
                `<link rel="stylesheet" href="/${fileName}" />`
              ))}
          </head>

          <body>
              <div id="root">${markup}</div>

              ${ pageData && 
                `<script>var APP_DATA = ${JSON.stringify(pageData)};</script>`
              }

              ${ (jsFiles || []).map(fileName => (
                  `<script type="module" src="${fileName}"></script>`
              ))}
          </body>
      </html>
  `);
}

module.exports = renderPage;
