import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    increment,
    decrement,
    reset
} from 'actions/counter';
import { DatePicker } from '@sdp.nd/fish';

class Counter extends Component {
    render() {
        return (
            <div>
                <div>当前计数为：{this.props.counter.count}</div>
                <button onClick={() => this.props.increment()}>自增</button>
                <button onClick={() => this.props.decrement()}>自减</button>
                <button onClick={() => this.props.reset()}>重置</button>
                <br/>
                <DatePicker />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        counter: state.counter
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        increment: () => {
            dispatch(increment());
        },
        decrement: () => {
            dispatch(decrement());
        },
        reset: () => {
            dispatch(reset());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);