import React from 'react'

interface IButton extends React.InputHTMLAttributes<HTMLInputElement> {
  text: string,
  onClick: () => void,
}

const Button = ({ text, onClick, ...rest }: IButton) => {
  return (
    <input
      type='submit'
      value={text}
      onSubmit={onClick}
      {...rest}
    />
  )
}

export default Button