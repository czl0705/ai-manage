import React, {Component} from 'react';

class Bundle extends Component {
    state = {
        // short for "module" but that's a keyword in js, so "mod"
        mod: null
    };

    // 生命周期 - 组件出现前
    componentWillMount() {
        this.load(this.props)
    }

    // 生命周期 - props发生改变，调用改函数更新
    componentWillReceiveProps(nextProps) {
        // 下一个状态不能跟原来的状态相同
        if (nextProps.load !== this.props.load) {
            this.load(nextProps)
        }
    }

    load(props) {
        this.setState({
            mod: null
        });
        props.load((mod) => {
            this.setState({
                mod: mod.default ? mod.default : mod
            })
        });
    }

    render() {
        return this.props.children(this.state.mod)
    }
}
export default Bundle;