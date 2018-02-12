import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUserInfo} from 'actions/userInfo';

import './userInfo.css';
import imgAvatar from 'img/avatar.jpg';

class UserInfo extends Component {
    render() {
        const {userInfo, isLoading, errorMsg} = this.props.userInfo;
        return (
            <div>
                {
                    isLoading ? '请求信息中......' : (
                        errorMsg ? errorMsg :
                            <div className="user-info-box">
                                <h3 id="test">用户信息</h3>
                                <p>用户名：{userInfo.name}</p>
                                <p>介绍：{userInfo.intro}</p>
                                <img src={imgAvatar} alt="这是头像"/>
                            </div>
                    )
                }
                <br/>
                <button onClick={() => this.props.getUserInfo()}>请求用户信息</button>
            </div>
        )
    }
}

export default connect((state) => ({userInfo: state.userInfo}), {getUserInfo})(UserInfo);