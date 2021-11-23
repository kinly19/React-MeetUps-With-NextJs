import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';

// ============================== Notes ==============================
// https://nextjs.org/docs/basic-features/data-fetching
// getStaticProps - If you export an async function called getStaticProps 
//  from a page, Next.js will pre-render this page at build time... 
//  using the props returned by getStaticProps.
// props - An optional object with the props that will be received by the page component.
// revalidate - An optional amount in seconds after which a page re-generation can occur.
//  Incremental Static Regeneration - allows you to create or update static pages after you’ve built your site

// alternative from above
// getServerSideProps - Next.js will pre-render this page on each.... request using the data returned by getServerSideProps

// getStaticProps - on build time
// getServerSideProps - on page request
// ===================================================================

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "First Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Tower_Bridge_from_Shad_Thames.jpg/1920px-Tower_Bridge_from_Shad_Thames.jpg",
    address: "Tower Bridge Rd, London SE1 2UP",
    description: "This is a first meetup!",
  },
  {
    id: "m2",
    title: "Second Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/f/fb/2005-07-12_-_United_Kingdom_-_England_-_London_-_The_London_Dungeon.jpg",
    address: "The Queens Walk, London SE1 7PB",
    description: "Second meetup!",
  },
];

const HomePage = (props) => {
  return <MeetupList meetups={props.meetups} />
};

// this page will wait until data has fetched from API, pass data via props to the page component 
export async function getStaticProps () {
  
  //fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://adminHQ:meetupslive@meetups.abzya.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    // will be passed to the page component as props
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    //numbers in sec, when we want page regeneration to occur if there are request for this page
    revalidate: 1,
  };
};

//alternative getServerSideProps - run on request to page
// export async function getServerSideProps () {
//   //fetch data from API
//   // code in here will run on the server side not on the clients 
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   };
// }


export default HomePage;
