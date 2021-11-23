import classes from './MeetupInfo.module.css';

const MeetupInfo = (props) => {
  return (
    <section className={classes.detail}>
      <img src={props.image} alt={props.alt}></img>
      <h1>{props.title}</h1>
      <address>{props.address}</address>
      <p>{props.description}</p>
    </section>
  );
};

export default MeetupInfo;