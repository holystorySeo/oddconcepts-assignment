import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Pagination from './Pagination';
import LoadingPage from '../pages/LoadingPage';
import NotResultPage from '../pages/NoResultPage';

export default function PostListforCodeURL() {
  const { productList, currentPage, postLimit } = useSelector(
    (state) => state.product,
  );

  return (
    <PostListforCodeURLContainer>
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
    </PostListforCodeURLContainer>
  );
}

const PostListforCodeURLContainer = styled.div`
  min-width: 300px;
  width: 100%;
  display: flex;
  justify-content: center;
  height: auto;
  margin-top: 1rem;
  /* border: 2px solid black; */

  .post-list {
    width: 90%;
    height: 100%;

    @media screen and (min-width: 1566px) {
      width: 1232px; // 한줄에 6개 4줄 24개
    }
    @media screen and (min-width: 1345px) and (max-width: 1565px) {
      width: 1058px; // 한줄에 5개 4줄 20개
    }
    @media screen and (min-width: 1028px) and (max-width: 1344px) {
      width: 705px; // 한줄에 4개 4줄 16개
    }
    @media screen and (min-width: 858px) and (max-width: 1027px) {
      width: 530px; // 한줄에 3개 4줄 12개
    }
    @media screen and (min-width: 747px) and (max-width: 857px) {
      width: 352px; // 한줄에 2개 4줄 8개
    }
    @media screen and (max-width: 746px) {
      width: 300px;
    }
  }

  .post-box {
    width: 160px;
    height: 400px;
    display: inline-block;
    border: 1px solid #bdbdbd;
    border-radius: 5px;
    margin: 0.5rem;

    @media screen and (max-width: 746px) {
      width: 300px;
      margin: 2rem 0 0 0;
    }
  }

  .post-image {
    width: 100%;
    height: 80%;
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
    height: 8%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .post-price {
    width: 100%;
    height: 12%;
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
