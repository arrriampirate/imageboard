import React from 'react';
import File from './file';
import FileLoader from './file-loader';
import Fullscreen from './fullscreen';

import axios from 'axios';

export default class Board extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            files: [],
            fullscreen: {
                show: false,
                src: '',
                name: ''
            }
        };

        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit   = this.handleEdit.bind(this);
        this.handleAdd    = this.handleAdd.bind(this);
        this.handleOpen   = this.handleOpen.bind(this);
        this.handleClose  = this.handleClose.bind(this);
    }

    componentDidMount() {
        axios.post('/load').then(result => {
            this.setState({
                files: result.data
            });
        });
    }

    handleDelete(id) {
        axios.delete('/delete/' + id).then(result => {
            let updated = this.state.files.filter(el => el._id !== id);
            this.setState({
                files: updated
            });
        });
    }

    handleEdit(id, name) {
        axios.post('/edit/' + id, { name: name }).then(result => {
            let updated = this.state.files.map(el => {
                if (el._id === id) el.name = name;
                return el;
            });

            this.setState({
                files: updated
            });
        });
    }

    handleAdd(data) {
        axios.post('/add/', data).then(result => {
            this.setState({
                files: [...this.state.files, ...result.data]
            });
        });
    }

    handleOpen(src, name) {
        this.setState({
            fullscreen: {
                open: true,
                src: src,
                name: name
            }
        });
    }

    handleClose() {
        this.setState({
            fullscreen: {
                open: false,
                src: '',
                name: ''
            }
        });
    }

    render() {
        let content = 'Nothing to show';

        if (this.state.files.length) {
            content = this.state.files.map(el => <File
                src={el.src}
                name={el.name}
                id={el._id}
                key={el._id}
                handleDelete={this.handleDelete}
                handleEdit={this.handleEdit}
                handleOpen={this.handleOpen} />
            )
        }

        return (
            <React.Fragment>
                <header className="header">
                    <div className="logo">Imageboard</div>
                </header>
                <div className="board">
                    {content}
                </div>
                <FileLoader handleAdd={this.handleAdd} />
                <Fullscreen {...this.state.fullscreen} handleClose={this.handleClose} />
            </React.Fragment>
        );
    }
}