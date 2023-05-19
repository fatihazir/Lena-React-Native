import React, { createContext, useState } from 'react';
import { BlogModel } from '../../models/typescript/blog';

export const SharedContextProvider = ({ children }: any) => {
    const [showOverlay, setShowOverlay] = useState<boolean>(false)
    const [showGlobalLoading, setShowGlobalLoading] = useState(false)
    const [blogs, setBlogs] = useState<Array<BlogModel>>()
    const [showGoBackButton, setShowGoBackButton] = useState<boolean>(false)

    return (
        <SharedContext.Provider
            value={{
                showOverlay,
                setShowOverlay,
                showGlobalLoading,
                setShowGlobalLoading,
                blogs,
                setBlogs,
                showGoBackButton,
                setShowGoBackButton
            }}>
            {children}
        </SharedContext.Provider>
    );
};

export const SharedContext: any = createContext({});