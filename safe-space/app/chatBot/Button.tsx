'use client'; // Enables client-side interactivity

interface ButtonProps {
  textContent: string;
  handleClick: () => void;
}

const Button = ({ textContent, handleClick }: ButtonProps) => {
  return (
    <button type="button" onClick={handleClick}>
      {textContent}
    </button>
  );
};

export default Button;