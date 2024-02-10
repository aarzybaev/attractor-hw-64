import {useCallback, useEffect, useState} from 'react';
import {ApiPosts, Post} from '../../type';
import axiosAPI from '../../axiosAPI';
import {Link} from 'react-router-dom';
import {format} from 'date-fns';

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = useCallback(async () => {
    const response = await axiosAPI.get<ApiPosts | null>('/posts.json');
    const posts = response.data;

    if (posts) {

      setPosts(Object.keys(posts).map(id => ({
        ...posts[id],
        id
      })));
    } else {
      setPosts([]);
    }
  }, [posts.length]);

  useEffect(() => {
    void fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="mt-3 d-flex flex-column gap-3">
      {
        posts.map(post => (
          <div key={post.id} className="card">
            <div className="card-body">
              <span className="text-body-tertiary"
                    style={{fontSize: '10px'}}>Created on: {format(post.createdAt, 'dd.MM.yyyy HH:mm')}</span>
              <h6>{post.title}</h6>
              <Link className="btn btn-primary" to={'posts/' + post.id}>Read more &gt;&gt;</Link>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default Posts;