import { Fragment } from 'react';
import Head from 'next/head';
import { MongoClient, ObjectId } from 'mongodb';
import MeetupDetails from '../../components/meetups/MeetupInfo';

// ============================== Notes ==============================
// https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
// getStaticPaths - If a page has dynamic routes and uses getStaticProps 
//  it needs to define a list of paths that have to be rendered to HTML at build time...
// 'paths' key is required - determines which paths will be pre-rendered
// 'fallback' key is required - must contain a boolean fallback key

// Head - built-in component for appending elements to the head of the page
// ===================================================================

const MeetupDetail = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta
          description='selected meetups details page'
          content={props.meetupData.description}
        />
      </Head>
      <MeetupDetails
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
};

export async function getStaticPaths() {

  const client = await MongoClient.connect('mongodb+srv://adminHQ:meetupslive@meetups.abzya.mongodb.net/meetups?retryWrites=true&w=majority');
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find({}, {_id: 1}).toArray(); //find all object but return only one the id fromt he object 
  client.close();

  return {
    fallback: 'blocking',
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
};

export async function getStaticProps (context) {

  //getting the params with context 
  const meetupId = context.params.meetupId

  //connect to database (Mongodb)
  const client = await MongoClient.connect('mongodb+srv://adminHQ:meetupslive@meetups.abzya.mongodb.net/meetups?retryWrites=true&w=majority');
  const db  = client.db();
  const meetupsCollection = db.collection('meetups');
  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });
  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        image: selectedMeetup.image,
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },
    },
  };
};

export default MeetupDetail;