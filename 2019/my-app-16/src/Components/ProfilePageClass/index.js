import React from 'react';

class ProfilePage extends React.Component {
  showMessage = () => {
    alert('成功关注 ' + this.props.user);
  };

  handleClick = () => {
    setTimeout(this.showMessage, 3000);
  };

  render() {
    return <button onClick={this.handleClick}>点击关注</button>;
  }
}

export default ProfilePage;
