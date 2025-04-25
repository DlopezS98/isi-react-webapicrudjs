import './button.css';

export default function Button(props) {
  return (
    <button type="button" className={`isi-button ${props.variant}`} disabled={props.disabled} onClick={props.onClick}>
      {props.children}
    </button>
  );
}
