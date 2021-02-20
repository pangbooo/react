import React, { useState,useEffect } from "react";
import useFriendStatus from '../../Hook/useFriendStatus';

function FriendListItem(props) {
    const isOnline = useFriendStatus(props.friend.id);

    return (
        <li style={{color: isOnline ? 'green': 'blank'}}>
            {props.friend.name}
        </li>
    )
}

export default FriendListItem;