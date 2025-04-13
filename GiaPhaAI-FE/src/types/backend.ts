export interface IBackendRes<T> {
  statusCode: number;
  message: string;
  data?: T;
  error?: string;
}

export interface IModelPaginate<T> {
  meta: {
    current: number;
    pageSize: number;
    pages: number;
    total: number;
  };
  result: T[];
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAccount {
  access_token: string;
  user: IUser;
}

export interface IGetAccount {
  user: IUser;
}

export interface IPermission {
  _id: string;
  name: string;
  apiPath: string;
  method: string;
  module: string;
  createdAt: string;
  updatedAt: string;
}

export interface IRole {
  _id: string;
  name: string;
  description: string;
  isActive: boolean;
  permissions: IPermission[];
  createdAt: string;
  updatedAt: string;
}

export interface IBlogPost {
  _id: string;
  title: string;
  content: string;
  description: string;
  slug: string;
  author: IUser;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  category: 'NEWS' | 'EVENT' | 'HISTORY' | 'CULTURE' | 'OTHER';
  tags: string[];
  thumbnailUrl?: string;
  viewCount: number;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IFamilyMember {
  _id: string;
  name: string;
  dateOfBirth?: string;
  dateOfDeath?: string;
  gender: 'MALE' | 'FEMALE';
  biography?: string;
  imageUrl?: string;
  children: IFamilyMember[];
  parents: IFamilyMember[];
  spouse?: IFamilyMember;
  generation: number;
  branch: string;
  createdAt: string;
  updatedAt: string;
} 