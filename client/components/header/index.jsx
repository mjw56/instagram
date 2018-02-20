import { render } from 'inferno';

import './style.scss';

export default function Header({ data = {} }) {
    return (
        <header className="header">
            <div>
                <div className="logo"/>
            </div>
        </header>
    );
}
