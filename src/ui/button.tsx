import style from './button.module.scss';

type ButtonProps = {
  children: string;
  onClick?: () => void;
};

export function Button(props: ButtonProps) {
  return (
    <button onClick={props.onClick} class={style.btn}>
      {props.children}
    </button>
  );
}
