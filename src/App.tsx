import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { GlobalStyles } from 'src/global';

import { MainPage } from 'src/components/pages/MainPage';
import { Layout } from 'src/components/templates/Layout';

export const App: FC = () => (
  <>
    <GlobalStyles />
    <Layout>
      <Routes>
        <Route path="/products" element={<MainPage />} />
        <Route path="/warehouses" element={<MainPage />} />
      </Routes>
    </Layout>
  </>
);
