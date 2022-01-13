import React from 'react';

type ButtonPropsType = {
    name: string
    callBack: () => void
    className?: string
}

export const Button = ({name, callBack, ...props}: ButtonPropsType) => {
    return(
      <button className={props.className} onClick={callBack}>{name}</button>
    );
}