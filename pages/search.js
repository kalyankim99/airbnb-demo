import { useRouter } from "next/router"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { format } from "date-fns";
import axios from "axios";
import https from 'https';
import InfoCard from "../components/InfoCard";
import Map from "../components/Map";

function Search ({searchResults}) {
    const router = useRouter();
    const {location, startDate, endDate, numOfGuests} = router.query;   

    const formattedStartDate = format(new Date(startDate), "dd MMMM yy")
    const formattedEndDate = format(new Date(endDate), "dd MMMM yy")
    const range = `${formattedStartDate} - ${formattedEndDate}`;

    return (
        <div>
            <Header placeholder={`${location} | ${range} | ${numOfGuests} guests    `}/>
            <main className="flex ">    
                <section className="flex-grow pt-14 px-6">
                    <p className="text-xs">
                        300 + Stays - {range} - for {numOfGuests} guests
                    </p>
                    <h1 className="text-3xl font-semibold mt-2 mb-6">
                        Stays in {location}
                    </h1>

                    <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
                        <p className="button">
                            Cancellation Flexibility
                        </p>
                        <p className="button">
                            Type of place
                        </p>
                        <p className="button">
                            Price
                        </p>
                        <p className="button">
                            Rooms and Bed
                        </p>
                        <p className="button">
                            More
                        </p>    
                    </div>
                    <div className="flex flex-col">
                        {searchResults.map(({img, location, title, description, star, price, total}) => (
                            <InfoCard 
                                key={img}
                                img={img}
                                location={location}
                                title={title}
                                description={description}
                                star={star}
                                price={price}
                                total={total}
                            />
                        ))}
                    </div>
                </section>

                <section className="hidden xl:inline-flex xl:min-w-[600px]">
                    <Map searchResults={searchResults}/>
                </section>

            </main>
            <Footer />
        </div>
    )
}

export default Search

export async function getServerSideProps(){
     const agent = new https.Agent({  
         rejectUnauthorized: false
       });

    const searchResults = await axios.get("https://links.papareact.com/isz", {httpsAgent: agent}).then(res => res.data)

    return{
        props:{
            searchResults,

        }
    }

}