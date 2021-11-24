import { Fragment } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

const NewMeetup = () => {

  const router = useRouter();
  const addMeetupHandler = async (enteredMeetupData) => {
    //this will send a request to our api file
    const response = await fetch ('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(enteredMeetupData),
      headers: {
        'Content-type' : 'application/json'
      }
    });

    const data = await response.json();
    console.log(data);
    router.push('/');
  };

  return (
    <Fragment>
      <Head>
        <title>Add A New Meetup</title>
        <meta
          name='description'
          content='Add and share your own meetup locations and create amazing networking opportunities'
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler}/>
    </Fragment>
  );
};

export default NewMeetup;