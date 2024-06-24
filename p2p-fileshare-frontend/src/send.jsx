import React, { useEffect, useState } from 'react';
import {Sender} from './utils/connection';
import peerConnection from './utils/peerConnectionSetup';

export default function Send() {
  const [connection, setConnection] = useState(null);
  const [uniqueId, setUniqueId] = useState('');

  useEffect(() => {
    const conn = new Sender(peerConnection);
    setConnection(conn);

    const checkUniqueId = () => {
      if (conn.isUniqueIDSet === true) {
        setUniqueId(conn.uniqueId);
      } else {
        setTimeout(checkUniqueId, 100); // Retry after 100ms
      }
    };

    checkUniqueId();
  }, []);

  if (!connection || !uniqueId) {
    return <p>Waiting for uniqueId</p>;
  }

  return (
    <div className="send">
      <h1>Send</h1>
      <p>Welcome to the send page!</p>
      <p>{uniqueId}</p>
    </div>
  );
}
