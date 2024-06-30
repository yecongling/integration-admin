import React from "react";

export interface MetaProps {
    keepAlive?: boolean;
    requiresAuth?: boolean;
    title: string;
    isLeaf?: string;
    key?: string;
}

export interface RouteObject {
    caseSensitive?: boolean;
    children?: RouteObject[];
    component?: React.ReactNode;
    index?: boolean;
    path?: string;
    meta?: MetaProps;
    isLink?: string;
    auth?: boolean;
    title?: string
}
