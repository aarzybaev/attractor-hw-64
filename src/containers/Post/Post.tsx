import {Link, useNavigate, useParams} from 'react-router-dom';
import {useCallback, useEffect, useState} from 'react';
import {ApiPost} from '../../type';
import axiosAPI from '../../axiosAPI';
import Spinner from '../../components/Spinner/Spinner';
import {format} from 'date-fns';

const Post = () => {
  const params = useParams();
  const [post, setPost] = useState<ApiPost | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchPost = useCallback(async () => {
    setIsLoading(true);
    const response = await axiosAPI.get<ApiPost | null>('/posts/' + params.id + '.json');
    setPost(response.data);
    setIsLoading(false);
  }, [params.id]);

  useEffect(() => {
    void fetchPost();
  }, [fetchPost]);

  const deletePost = async (id: string | undefined) => {
    if (id) {
      try {
        await axiosAPI.delete('/posts/' + id + '.json');
        navigate('/');
      } catch (e) {
        console.log(e);
      }
    }

  };

  let postArea = <Spinner/>;

  if (!isLoading && post) {
    postArea = (
        <div>
          <span className="text-body-tertiary"
                style={{fontSize: '10px'}}>Created on: {format(post.createdAt, 'dd.MM.yyyy HH:mm')}</span>
          <h5>{post.title}</h5>
          <p>{post.description}</p>
          <div>
            <button className="btn btn-danger" onClick={() => deletePost(params.id)}>Delete</button>
            <Link to={'/posts/' + params.id + '/edit'} className="btn btn-warning ms-1">Edit</Link>
          </div>
        </div>
    );
  } else if (!isLoading && !post) {
    postArea = (
      <h1>Not found</h1>
    );
  }

  return postArea;
};

export default Post;