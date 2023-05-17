import React, { createContext, useState } from 'react';
import { BlogModel } from '../../models/typescript/blog';

export const SharedContextProvider = ({ children }: any) => {
    const [showOverlay, setShowOverlay] = useState<boolean>(false)
    const [showGlobalLoading, setShowGlobalLoading] = useState(false)
    const [blogs, setBlogs] = useState<Array<BlogModel>>()

    return (
        <SharedContext.Provider
            value={{
                showOverlay,
                setShowOverlay,
                showGlobalLoading,
                setShowGlobalLoading,
                blogs,
                setBlogs
            }}>
            {children}
        </SharedContext.Provider>
    );
};

export const SharedContext: any = createContext({});