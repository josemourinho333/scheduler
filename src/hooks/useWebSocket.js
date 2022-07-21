// import React, { useEffect } from 'react';
// import WebSocket from 'ws';

// const useWebSocket = () => {
//   useEffect(() => {
//     const wss = new WebSocket.Server({ port: 8001 });

//     wss.on('connection', ws => {
//       console.log('New client connected...');
  
//       ws.on('close', () => {
//         console.log('client disconnected...');
//       });
//     });
//   }, []);
// };

// export default useWebSocket;