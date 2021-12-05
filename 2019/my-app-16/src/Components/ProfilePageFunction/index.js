import React from 'react';

function ProfilePageFunction({ user }) {
    const showMessage = () => {
      alert('成功关注 ' + user);
    };
  
    const handleClick = () => {
      setTimeout(showMessage, 3000);
    };
  
    return (
      <button onClick={handleClick}>点击关注</button>
    );
}

export default ProfilePageFunction;