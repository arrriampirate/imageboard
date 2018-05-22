import React from 'react';
import classNames from 'classnames';

export default class Fullscreen extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let image = this.props.src ? <img className="fullscreen-image" src={this.props.src} alt="" /> : '';
        let css   = classNames({
            'fullscreen': true,
            'fullscreen-hidden': !this.props.open
        });

        return (
            <div className={css}>
                <div className="fullscreen-name">{this.props.name}</div>
                <button className="fullscreen-close" onClick={this.props.handleClose} />
                {image}
            </div>
        );
    }
}