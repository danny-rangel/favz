import Head from 'next/head'
import AppBar from '../components/AppBar';
import SideBar from '../components/SideBar';
import Grid from '../components/Grid';

import { GridItemsContextProvider } from '../store/grid-items-context';
import { ImageContextProvider } from '../store/image-context';

export default function Home() {
  return (
    <>
      <Head>
        <title>Favz</title>
        <meta name="description" content="Favz" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container m-auto max-w-4xl">
        <GridItemsContextProvider>
          <ImageContextProvider>
            <AppBar />
            <div className="flex flex-col-reverse">
              <SideBar />
              <Grid />
            </div>
          </ImageContextProvider>
        </GridItemsContextProvider>
      </main>
    </>
  )
}
