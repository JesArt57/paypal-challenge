import { Password, PasswordProps } from 'primereact/password';

interface Props extends PasswordProps {
  labelText: string;
  errorMessage?: string;
  isValid?: boolean;
}

export const InputPassword: React.FC<Props> = ({ labelText, errorMessage, isValid, ...props }) => {
  return <div className='input-password'>
    <label className='label text-paypal-text-gray w-100'>{labelText}</label>
    <Password {...props} />
    <div className='d-flex'>
      {(errorMessage && !isValid) && <h5 className='text-danger mt-2'>{errorMessage}</h5>}
    </div>
  </div>
}