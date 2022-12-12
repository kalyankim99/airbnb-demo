/* eslint-disable react/jsx-key */
import Head from 'next/head'
import Header from '../components/header'
import Banner from '../components/Banner'
import axios from 'axios';
import https from 'https';
import SmallCard from '../components/SmallCard';
import MediumCard from '../components/MediumCard';
import LargeCard from '../components/LargeCard';
import Footer from '../components/Footer';

export default function Home({exploreData, cardsData}) {
  return (
    <div className=''>
      <Head>
        <title> My airbnb</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/*Header*/}
      <Header />
      
      {/* Banner*/}
      <Banner />

      <main className='max-w-7xl mx-auto px-8 sm:px-16'>
          <section className='pt-6'>
            <h2 className='text-4xl font-semibold pb-5'> 
              Explore nearby
            </h2>

            {/* Pull some data from a server - API endpoints   */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {exploreData.map(({img, distance, location}, key) => (
              <SmallCard 
                key={key}
                img={img} 
                distance={distance} 
                location={location}
              />
              ))}
            </div>
             
          </section>

          <section>
            <h2 className='text-4xl font-semibold py-8'>
              Live Anywhere
            </h2>
            <div className='flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3'>
              {cardsData.map(({img,title}) => (
                <MediumCard 
                  key={img}
                  img={img}
                  title={title}
                />
            ))}
            </div>
          </section>

          <LargeCard 
            img="https://links.papareact.com/4cj"
            title="The Greatest Outdoors"
            description="Wishlists curated by Airbnb"
            buttonText="Get Inspired"
          />
      </main>

      {/* Footer */}
      <Footer/>
    </div>
  )
}

export async function getStaticProps(){
  // const exploreData = await fetch(('https://links.papareact.com/pyp').then((res) => res.json())
  const agent = new https.Agent({  
    rejectUnauthorized: false
  });

  const exploreData = await axios.get('https://links.papareact.com/pyp', { httpsAgent: agent }).then(res => res.data)
  const cardsData = await axios.get('https://links.papareact.com/zp1', { httpsAgent: agent }).then(res => res.data)

  return{
    props:{
      exploreData,
      cardsData
    }
  }
}