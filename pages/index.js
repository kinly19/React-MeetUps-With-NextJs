import MeetupList from '../components/meetups/MeetupList';

const HomePage = () => {
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
  return <MeetupList meetups={DUMMY_MEETUPS} />
};

export default HomePage;
