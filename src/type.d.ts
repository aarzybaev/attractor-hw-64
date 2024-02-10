export interface ApiPost {
  createdAt: string;
  title: string;
  description: string;
}

export interface Post extends ApiPost {
  id: string;
}

export interface ApiPosts {
  [id: string]: ApiPost;
}