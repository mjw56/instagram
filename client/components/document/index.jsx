import { render } from 'inferno';

import './style.scss';

export default function Document({ children, ...props }) {
    return (
        <html>
            <head>
                <title>{props.title}</title>
                <link rel="stylesheet" href={`/${props.stylesheet}.css`} />
            </head>

            <body>
                { children }
            </body>

        </html>
    );
}
