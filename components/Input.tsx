import React from "react";

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  options: {
    id: string;
    label: string;
    shrink: string | undefined;
  };
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ options: { id, label, shrink }, ...props }, ref) => (
    <div>
      <label htmlFor={id}>{label}:</label>
      {shrink && <span>{shrink}</span>}
      <input aria-invalid={!!shrink} id={id} {...props} ref={ref} />
    </div>
  )
);
