import './card.css';

const Card = (props) => {
  return <div className={`isi-card shadow-md ${props.className}`}>{props.children}</div>;
};
export default Card;


export const CardHeader = (props) => {
  return <div className='isi-card__header'>{props.children}</div>;
};

export const CardBody = (props) => {
  return <div className={`isi-card__body ${props.className}`}>{props.children}</div>;
};
