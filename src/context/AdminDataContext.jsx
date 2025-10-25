import { createContext, useContext } from "react";

/**
 * AdminDataContext
 * Holds events, gallery, team members as local state.
 * Replace local state operations with API calls when ready.
 */

export const AdminDataContext = createContext();

export const useAdminData = () => useContext(AdminDataContext);