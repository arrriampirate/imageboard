import React from 'react';

export default class FileLoader extends React.Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        let files = this.input.files;
        let data  = new FormData();

        for (let i = 0; i < files.length; i++) {
            data.append('file[]', files[i]);
        }

        this.props.handleAdd(data);
    }

    render() {
        return (
            <div className="file-loader">
                <input className="file-loader__input"
                       type="file"
                       name="file"
                       onChange={this.handleChange}
                       ref={input => this.input = input} multiple />
            </div>
        );
    }
}