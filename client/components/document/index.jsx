import { render } from 'inferno';

import './style.scss';

export default function Document({ children }) {
    return (
        <html>
            <head>
                <link rel="stylesheet" href="/bundle.css" />
            </head>

            <body>
                { children }
            </body>

        </html>
    );
}
