'use client'

import React, { useEffect, useState } from 'react';
import { useSearchResult } from '@/context/SearchResultContext';
import ProductList from './Product/ProductList';
import { DetailProps } from '@/types';

const SearchResultComponent: React.FC = () => {
  const { result } = useSearchResult();
  const [productDetails, setProductDetails] = useState<DetailProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (result) {
        try {
          const apiEndpoint = 'http://localhost:3101/api/product/get';

          const requests = result.map((image: any) =>
            fetch(`${apiEndpoint}?images=${image}`).then((response) => response.json())
          );

          const responses = await Promise.all(requests);

          setProductDetails([])
          for (let i = 0; i < responses.length; i++) {
            setProductDetails((prevDetails) => [
              ...prevDetails,
              responses[i].data[0]
            ]);
          }
        } catch (error) {
          console.error('Error fetching product details:', error);
        }
      }
    };

    fetchData();
  }, [result]);

  return (
    <div className='mt-10'>
      <h2>Search Result</h2>
      <ProductList details={productDetails} />
    </div>
  );
};

export default SearchResultComponent;
