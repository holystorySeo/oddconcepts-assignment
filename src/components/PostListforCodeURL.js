import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
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

    @media screen and (min-width: 1590px) {
      width: 1247px; // 한줄에 7개 4줄 28개
    }
    @media screen and (min-width: 1415px) and (max-width: 1589px) {
      width: 1070px; // 한줄에 6개 4줄 24개
    }
    @media screen and (min-width: 1240px) and (max-width: 1414px) {
      width: 890px; // 한줄에 5개 4줄 20개
    }
    @media screen and (min-width: 1063px) and (max-width: 1239px) {
      width: 713px; // 한줄에 4개 4줄 16개
    }
    @media screen and (min-width: 885px) and (max-width: 1062px) {
      width: 535px; // 한줄에 3개 4줄 12개
    }
    @media screen and (min-width: 710px) and (max-width: 884px) {
      width: 356px; // 한줄에 2개 4줄 4개
    }
    @media screen and (min-width: 660px) and (max-width: 709px) {
      width: 317px;
    }
    @media screen and (max-width: 659px) {
      width: 317px;
    }
  }

  .post-box {
    width: 160px;
    height: 400px;
    display: inline-block;
    border: 1px solid #bdbdbd;
    border-radius: 5px;
    margin: 0.5rem;

    @media screen and (max-width: 709px) {
      width: 299px;
      height: 600px;
      margin: 0.5rem 0 1rem 0.5rem;
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
  }

  .post-price {
    height: 12%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 1rem;
    font-weight: 800;
    color: coral;

    ::before {
      content: '₩';
    }
  }
`;
