import NewMeetupForm from '../../components/meetups/NewMeetupForm';

const NewMeetup = () => {

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
  };

  return (
    <NewMeetupForm onAddMeetup={addMeetupHandler}/>
  );
};

export default NewMeetup;