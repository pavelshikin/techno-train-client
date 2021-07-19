import React from 'react';
import NavBar from '../components/Navbar';
import Player from '../components/Player';
import Head from 'next/head';

interface MainLayoutProps {
  title?: string;
  description?: string;
  keywords?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title,
  description,
  keywords
}) => {
  return (
    <>
      <Head>
        <title>{title ? title + ' | Techno Train' : 'Techno Train'}</title>
        <meta name="description" content={description || 'Techno Train'} />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <NavBar />
      <div className="main">{children}</div>
      <Player />
    </>
  );
};

export default MainLayout;
