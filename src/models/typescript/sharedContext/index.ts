import { BlogModel } from "../blog";

export interface SharedContextModel {
    showOverlay: boolean;
    setShowOverlay: (arg: boolean) => Function;
    showGlobalLoading: boolean;
    setShowGlobalLoading: (arg: boolean) => Function;
    blogs: Array<BlogModel>;
    setBlogs: (arg: Array<BlogModel>) => Function

}