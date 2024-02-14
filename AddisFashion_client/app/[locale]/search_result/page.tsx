import React from 'react';
import SearchResultComponent from '@/components/SearchResultComponent';
import MainLayout from '../(root)/layout';
import { ProductProvider } from '@/context/ProductContext';

const SearchResultPage: React.FC = () => {
  return (
    <MainLayout>
        <ProductProvider>
      <div>
        <h1>Search Result Page</h1>
        <SearchResultComponent />
      </div> 
        </ProductProvider>
    </MainLayout>
  );
};

export default SearchResultPage;
