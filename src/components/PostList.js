import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
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
  width: 100%;
  display: flex;
  justify-content: center;
  height: auto;
  margin-top: 1rem;
  /* border: 1px solid blue; */

  .post-list {
    width: 90%;
    height: 100%;
    /* border: 5px solid red; */

    @media screen and (min-width: 1463px) {
      width: 1425px; // 한줄에 8개 4줄 32개
    }
    @media screen and (min-width: 1280px) and (max-width: 1462px) {
      width: 1247px; // 한줄에 7개 4줄 28개
    }
    @media screen and (min-width: 1106px) and (max-width: 1279px) {
      width: 1070px; // 한줄에 6개 4줄 24개
    }
    @media screen and (min-width: 923px) and (max-width: 1105px) {
      width: 890px; // 한줄에 5개 4줄 20개
    }
    @media screen and (min-width: 745px) and (max-width: 922px) {
      width: 713px; // 한줄에 4개 4줄 16개
    }
    @media screen and (min-width: 565px) and (max-width: 744px) {
      width: 535px; // 한줄에 3개 4줄 12개
    }
    @media screen and (min-width: 468px) and (max-width: 564px) {
      width: 356px; // 한줄에 2개 4줄 4개
    }
    @media screen and (max-width: 467px) {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

  .post-box {
    width: 160px;
    height: 400px;
    display: inline-block;
    border: 1px solid #bdbdbd;
    border-radius: 5px;
    margin: 0.5rem;

    @media screen and (max-width: 467px) {
      width: 299px;
      height: 600px;
      margin: 0 0 1rem 0;
    }
  }

  .post-image {
    width: 100%;
    height: 80%;
    display: flex;
    justify-content: center;
    margin-bottom: 0.4rem;
    cursor: pointer;

    @media screen and (max-width: 467px) {
      height: 90%;
    }

    img {
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
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

    @media screen and (max-width: 467px) {
      height: 5%;
    }
  }

  .post-price {
    height: 12%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 1rem;
    font-weight: 800;
    color: coral;

    @media screen and (max-width: 467px) {
      height: 5%;
    }

    ::before {
      content: '₩';
    }
  }
`;
