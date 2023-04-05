const CustomButton = ({ style, title = "", onClick = () => {} }) => {
  return (
    <button
      style={style}
      onClick={() => {
        onClick();
      }}
    >
      {title}
    </button>
  );
};
export default CustomButton;
