import React, { createContext, useContext, useState } from "react";

export type Session = {
    duration: number;
    completed: boolean;
    mode: "free" | "strict";
    timestamp: number;
};

type SessionContextType = {
    sessions: Session[];
    addSession: (session: Session) => void;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider = ({ children }: {children: React.ReactNode }) => {
    const [sessions, setSessions] = useState<Session[]>([]); //creates a global list of sessions

    const addSession = (session: Session) => { //takes new sessions, puts it at the top of the list, and updates global state
        setSessions((prev) => [session, ...prev]);
    };

    return (
        <SessionContext.Provider value={{ sessions, addSession }}>
            {children}
        </SessionContext.Provider>
    );
};

export const useSessions = () => {
    const context = useContext(SessionContext);
    if (!context) {
        throw new Error("useSessions must be used within a SessionProvider");
    }
    return context;
}