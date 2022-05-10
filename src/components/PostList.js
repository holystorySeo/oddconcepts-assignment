import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Pagination from './Pagination';
import LoadingPage from '../pages/LoadingPage';
import NotResultPage from '../pages/NoResultPage';

export default function PostList() {
  const { productList, currentPage, postLimit } = useSelector(
    (state) => state.product,
  );

  return (
    <PostListContainer>
      <div className="post-list">
        {productList
          .slice((currentPage - 1) * postLimit, postLimit * currentPage)
          .map((data, idx) => (
            <div className="post-box" key={`post-idx${idx}`}>
              <div
                role="presentation"
                className="post-image"
                onClick={() => window.open(`${data.image_url}`, '_blank')}
              >
                <img src={data.image_url} alt="없음" />
              </div>
              <div className="post-name">{data.name}</div>
              <div className="post-price">
                {Number(data.price)
                  .toString()
                  .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
              </div>
            </div>
          ))}
      </div>
    </PostListContainer>
  );
}

const PostListContainer = styled.div`
  min-width: 300px;
  width: 100%;
  display: flex;
  justify-content: center;
  height: auto;
  margin-top: 1rem;
  border: 1px solid black;

  .post-list {
    width: 90%;
    height: 100%;
    border: 1px solid red;

    @media screen and (min-width: 1463px) {
      width: 1430px;
    }
    @media screen and (min-width: 1260px) and (max-width: 1462px) {
      width: 1226px;
    }
    @media screen and (min-width: 1056px) and (max-width: 1259px) {
      width: 1022px;
    }
    @media screen and (min-width: 852px) and (max-width: 1055px) {
      width: 818px;
    }
    @media screen and (min-width: 685px) and (max-width: 851px) {
      width: 614px;
    }
    @media screen and (min-width: 500px) and (max-width: 684px) {
      width: 410px;
    }
    @media screen and (max-width: 499px) {
      width: 270px;
    }
  }

  .post-box {
    width: 160px;
    height: 400px;
    display: inline-block;
    border: 1px solid #bdbdbd;
    border-radius: 5px;
    margin: 0.5rem;

    @media screen and (max-width: 499px) {
      width: 250px;
      height: 800px;
    }
    @media screen and (min-width: 500px) {
      width: 188px;
    }
  }

  .post-image {
    width: 100%;
    height: 60%;
    display: flex;
    justify-content: center;
    margin-bottom: 0.4rem;
    cursor: pointer;

    img {
      border-radius: 5px;
      width: 100%;
      height: auto;
      object-fit: cover;
    }
  }

  .post-name {
    width: 100%;
    height: 15%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .post-price {
    width: 100%;
    height: 15%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 1rem;
    font-weight: 600;

    ::before {
      content: '₩';
    }
  }
`;
