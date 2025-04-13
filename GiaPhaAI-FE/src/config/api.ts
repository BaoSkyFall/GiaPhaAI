import { IBackendRes, IAccount, IUser, IModelPaginate, IPermission, IRole, IBlogPost, IFamilyMember } from '@/types/backend';
import axios from './axios-customize';

/**
 * Auth Module
 */
export const callRegister = (email: string, password: string, name: string) => {
    return axios.post<IBackendRes<IUser>>('/api/auth/register', { email, password, name });
};

export const callLogin = (email: string, password: string) => {
    return axios.post<IBackendRes<IAccount>>('/api/auth/login', { email, password });
};

export const callLogout = () => {
    return axios.post<IBackendRes<string>>('/api/auth/logout');
};

export const callRefreshToken = (userId: string, refreshToken: string) => {
    return axios.post<IBackendRes<{ access_token: string }>>('/api/auth/refresh-token', { userId, refreshToken });
};

export const callGetProfile = () => {
    return axios.get<IBackendRes<IUser>>('/api/auth/profile');
};

/**
 * Blog Module
 */
export const callCreateBlogPost = (data: Partial<IBlogPost>) => {
    return axios.post<IBackendRes<IBlogPost>>('/api/blog/posts', data);
};

export const callUpdateBlogPost = (id: string, data: Partial<IBlogPost>) => {
    return axios.patch<IBackendRes<IBlogPost>>(`/api/blog/posts/${id}`, data);
};

export const callDeleteBlogPost = (id: string) => {
    return axios.delete<IBackendRes<void>>(`/api/blog/posts/${id}`);
};

export const callGetBlogPosts = (query: string = '') => {
    return axios.get<IBackendRes<IModelPaginate<IBlogPost>>>(`/api/blog/posts?${query}`);
};

export const callGetBlogPostById = (id: string) => {
    return axios.get<IBackendRes<IBlogPost>>(`/api/blog/posts/${id}`);
};

export const callIncrementBlogPostViewCount = (id: string) => {
    return axios.post<IBackendRes<void>>(`/api/blog/posts/${id}/view`);
};

export const callGetBlogPostsByTag = (tag: string, limit: number = 5) => {
    return axios.get<IBackendRes<IBlogPost[]>>(`/api/blog/posts/tag/${tag}?limit=${limit}`);
};

export const callGetFeaturedBlogPosts = (limit: number = 5) => {
    return axios.get<IBackendRes<IBlogPost[]>>(`/api/blog/posts/featured/list?limit=${limit}`);
};

export const callGetBlogCategories = () => {
    return axios.get<IBackendRes<string[]>>('/api/blog/posts/categories/list');
};

export const callGetBlogTags = () => {
    return axios.get<IBackendRes<string[]>>('/api/blog/posts/tags/list');
};

/**
 * Permissions Module
 */
export const callCreatePermission = (permission: Partial<IPermission>) => {
    return axios.post<IBackendRes<IPermission>>('/api/permissions', permission);
};

export const callUpdatePermission = (id: string, permission: Partial<IPermission>) => {
    return axios.patch<IBackendRes<IPermission>>(`/api/permissions/${id}`, permission);
};

export const callDeletePermission = (id: string) => {
    return axios.delete<IBackendRes<void>>(`/api/permissions/${id}`);
};

export const callGetPermissions = (query: string = '') => {
    return axios.get<IBackendRes<IModelPaginate<IPermission>>>(`/api/permissions?${query}`);
};

export const callGetPermissionById = (id: string) => {
    return axios.get<IBackendRes<IPermission>>(`/api/permissions/${id}`);
};

/**
 * Roles Module
 */
export const callCreateRole = (role: Partial<IRole>) => {
    return axios.post<IBackendRes<IRole>>('/api/roles', role);
};

export const callUpdateRole = (id: string, role: Partial<IRole>) => {
    return axios.patch<IBackendRes<IRole>>(`/api/roles/${id}`, role);
};

export const callDeleteRole = (id: string) => {
    return axios.delete<IBackendRes<void>>(`/api/roles/${id}`);
};

export const callGetRoles = (query: string = '') => {
    return axios.get<IBackendRes<IModelPaginate<IRole>>>(`/api/roles?${query}`);
};

export const callGetRoleById = (id: string) => {
    return axios.get<IBackendRes<IRole>>(`/api/roles/${id}`);
};

/**
 * Family Tree Module
 */
export const callGetFamilyMembers = (query: string = '') => {
    return axios.get<IBackendRes<IModelPaginate<IFamilyMember>>>(`/api/family-tree?${query}`);
};

export const callGetFamilyMemberById = (id: string) => {
    return axios.get<IBackendRes<IFamilyMember>>(`/api/family-tree/${id}`);
};

export const callCreateFamilyMember = (data: Partial<IFamilyMember>) => {
    return axios.post<IBackendRes<IFamilyMember>>('/api/family-tree', data);
};

export const callUpdateFamilyMember = (id: string, data: Partial<IFamilyMember>) => {
    return axios.patch<IBackendRes<IFamilyMember>>(`/api/family-tree/${id}`, data);
};

export const callDeleteFamilyMember = (id: string) => {
    return axios.delete<IBackendRes<void>>(`/api/family-tree/${id}`);
};

/**
 * Upload Files
 */
export const callUploadSingleFile = (file: File, folder: string = 'common') => {
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    return axios.post<IBackendRes<{ filePath: string }>>('/api/files/upload', bodyFormData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'folder': folder
        }
    });
}; 