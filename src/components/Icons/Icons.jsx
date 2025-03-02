import sprite from "../../assets/sprite/sprite.svg";

const Icons = ({ name, fill, stroke, width = 16, height = 16, className }) => {
  return (
    <svg width={width} height={height} className={className}>
      <use href={`${sprite}#${name}`}></use>
    </svg>
  );
};

export default Icons;
