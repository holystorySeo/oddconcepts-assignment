import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Pagination from '../components/Pagination';
import LoadingPage from './LoadingPage';

export default function SearchResultPage() {
  const { productList, loading, error, currentPage, postLimit } = useSelector(
    (state) => state.product,
  );

  return (
    <SearchResultPageContainer>
      {loading ? (
        <LoadingPage />
      ) : (
        <div>
          {productList
            .slice((currentPage - 1) * postLimit, postLimit * currentPage)
            .map((data, idx) => {
              return (
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
              );
            })}
          <Pagination />
        </div>
      )}
    </SearchResultPageContainer>
  );
}

const SearchResultPageContainer = styled.div`
  min-width: 300px;
  width: 100%;
  display: block;
  margin: 0 auto;
  height: auto;
  padding: 1rem;

  @media screen and (max-width: 499px) {
    width: 300px;
  }
  @media screen and (min-width: 500px) and (max-width: 737px) {
    width: 500px;
  }
  @media screen and (min-width: 738px) and (max-width: 913px) {
    width: 700px;
  }
  @media screen and (min-width: 914px) and (max-width: 1100px) {
    width: 900px;
  }
  @media screen and (min-width: 1101px) and (max-width: 1260px) {
    width: 1100px; // 줄당 5개 4줄 한 페이지에 20개
  }
  @media screen and (min-width: 1261px) and (max-width: 1462px) {
    width: 1260px; // 줄당 6개 4줄 한 페이지에 총 24개
  }
  @media screen and (min-width: 1463px) {
    width: 1463px; // 줄당 7개 4줄 한 페이지에 총 28개
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
      height: 500px;
    }
    @media screen and (min-width: 500px) and (max-width: 737px) {
      width: 215px;
      height: 480px;
    }
    @media screen and (min-width: 738px) and (max-width: 913px) {
      width: 205px;
    }
    @media screen and (min-width: 914px) and (max-width: 1100px) {
      width: 200px;
    }
    @media screen and (min-width: 1101px) and (max-width: 1260px) {
      width: 196px;
    }
    @media screen and (min-width: 1261px) and (max-width: 1462px) {
      width: 188px;
    }
    @media screen and (min-width: 1463px) {
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

  .page-display {
    width: 100%;
    height: 10%;
  }
`;
