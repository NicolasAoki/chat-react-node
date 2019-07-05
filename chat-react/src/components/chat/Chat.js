import React, { Component } from 'react';

export default class Chat extends Component {
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
