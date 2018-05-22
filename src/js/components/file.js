import React from 'react';

export default class File extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: props.name,
            editMode: false,
        };

        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit   = this.handleEdit.bind(this);
        this.handleOpen   = this.handleOpen.bind(this);
    }

    handleDelete() {
        this.props.handleDelete(this.props.id);
    }

    handleEdit(e) {
        this.props.handleEdit(this.props.id, e.target.value);
    }

    handleOpen() {
        this.props.handleOpen(this.props.src, this.props.name);
    }

    render() {
        let imageStyle = {
            backgroundImage: 'url(' + this.props.src + ')'
        };

        return (
            <div className="file">
                <button className="file__delete" onClick={this.handleDelete} />
                <div className="file__image" style={imageStyle} onClick={this.handleOpen}/>
                <input
                    className="file__name"
                    value={this.props.name}
                    onChange={this.handleEdit}
                    placeholder="Name" />
            </div>
        );
    }
}