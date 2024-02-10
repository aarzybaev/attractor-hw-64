import {useNavigate, useParams} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import axiosAPI from '../../axiosAPI';
import {ApiPost} from '../../type';

const NewPost = () => {
  const params = useParams();
  const [post, setPost] = useState<ApiPost>({
    createdAt: '',
    title: '',
    description: ''
  });

  const navigate = useNavigate();
  let content;

  const toCreatePost = async () => {
    try {
      await axiosAPI.post<ApiPost | null>('/posts.json', post);
    } catch (e) {
      console.log(e);
    }
  };

  const toEditePost = async (id: string) => {
    try {
      await axiosAPI.put<ApiPost | null>('/posts/' + id + '.json', post);
    } catch (e) {
      console.log(e);
    }
  };
  const changePost = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPost(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
      createdAt: params.id ? prevState.createdAt : new Date().toISOString()
    }));
  };
  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (post.title === '' || post.description === '') {
      alert('Required fill fields');
    } else {
      if (params.id) {
        void toEditePost(params.id);
      } else {
        void toCreatePost();
      }

      navigate('/');
    }

  };

  const fetchPost = async () => {
    const response = await axiosAPI.get<ApiPost | null>('/posts/' + params.id + '.json');
    if (response.data) {
      setPost(response.data);
    } else {
      navigate('/' + params.id);
    }
  };

  useEffect(() => {
    if (params.id) {
      void fetchPost();
    }
  }, []);

  if (params.id) {
    content = (
      <form className="mt-3" onSubmit={onFormSubmit}>
        <h4>Edit post</h4>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            className="form-control"
            value={post.title}
            onChange={changePost}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea style={{height: '200px'}}
                    name="description"
                    id="description"
                    className="form-control"
                    value={post.description}
                    onChange={changePost}
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">Submit</button>
      </form>
    );
  } else {
    content = (
      <form className="mt-3" onSubmit={onFormSubmit}>
        <h4>Add new post</h4>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            className="form-control"
            value={post.title}
            onChange={changePost}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea style={{height: '200px'}}
                    name="description"
                    id="description"
                    className="form-control"
                    value={post.description}
                    onChange={changePost}
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">Submit</button>
      </form>
    );
  }


  return content;
};

export default NewPost;