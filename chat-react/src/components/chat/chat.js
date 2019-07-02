import React, { Component } from 'react';

export default class chat extends Component {
    render() {
        const { params } = this.props.match;
        return (
            <div>
                <div>FUNCIONA CHAT</div>
                <p>{params.id}</p>
            </div>
        )
    }
}
