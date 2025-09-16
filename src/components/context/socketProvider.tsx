// import { io, Socket } from "socket.io-client";
// import React, { createContext, useContext, useMemo, ReactNode } from "react";

// type SocketContextType = Socket | null;

// const SocketContext = createContext<SocketContextType>(null);

// export const useSocket = (): SocketContextType => {
//   return useContext(SocketContext);
// };

// interface SocketProviderProps {
//   children: ReactNode;
// }

// export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    
//   const socket = useMemo(() => {
//     return io("http://localhost:4000", {
//       transports: ["websocket"],
//     });
//   }, []);

//   return (
//     <SocketContext.Provider value={socket}>
//       {children}
//     </SocketContext.Provider>
//   );
// };
