import React, { useState, useEffect } from 'react';

function useFriendStatus(friendID) {
    const [inOnline, setInOnline] = useState(null);

    function handleStatusChange(status){
      setInOnline(status.isOnline)
    }

    useEffect(() => {
      CharAPI.subscribeToFriendStatus(friendID, handleStatusChange);

      //清除副作用
      return () => {
        CharAPI.unsubscribeToFriendStatus(friendID, handleStatusChange);
      }
    });

    return isOnline;

}

export default useFriendStatus;