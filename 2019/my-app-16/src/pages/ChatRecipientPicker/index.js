import React, {useState} from 'react';
import useFriendStatus from '../../Hook/useFriendStatus';

const friendList = [
    { id: 1, name: 'Phoebe' },
    { id: 2, name: 'Rachel' },
    { id: 3, name: 'Ross' },
  ];
  
  function  ChatRecipientPicker() {
      const [recipientID, setRecipientID] = useState(1);
      const isRecipientOnline = useFriendStatus(recipientID);

      return (
          <>
            <div style={{color: isRecipientOnline ? 'green' : 'blank'}}></div>
            <select
                value={recipientID}
                onChange={e => setRecipientID(Number(e.target.value))}
                >
                    {
                        friendList.map(friend => {
                            <option key={friend.id} value={friend.id}>
                                {friend.name}
                            </option>
                        })
                    }
                </select>
          </>
      )
  }