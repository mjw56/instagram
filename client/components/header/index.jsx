import { render } from 'inferno';
import { Link } from 'inferno-router';

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
