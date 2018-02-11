import React, {Component} from 'react';

// 定义类
export default class Home extends Component {
    // 构造函数
    constructor(props) {
        /*
         *super关键字用于访问父对象上的函数
         *https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super
         */
        super(props);
        this.state = {
            count: 0
        }
    }

    _handleClick() {
        this.setState({
            count: ++this.state.count
        });
    }

    render() {
        return (
            <div>
                this is home~000<br/>
                当前计数：{this.state.count}<br/>
                <button onClick={() => this._handleClick()}>自增</button>
            </div>
        )
    }
}