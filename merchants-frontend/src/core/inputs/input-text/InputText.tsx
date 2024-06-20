import { InputTextProps, InputText as PrInputText } from 'primereact/inputtext';

interface Props extends InputTextProps {
  labelText?: string;
  errorMessage?: string;
  isValid?: boolean;
  wrapperClassName?: string;
}

export const InputText: React.FC<Props> = ({ labelText, errorMessage, isValid, wrapperClassName, ...props }) => {
  return <div className={`input-text ${wrapperClassName || ''}`}>
    {labelText && <label className='label text-paypal-text-gray w-100'>{labelText}</label>}
    <PrInputText {...props} />
    <div className='d-flex'>
      {(errorMessage && !isValid) && <h5 className='text-danger mt-2'>{errorMessage}</h5>}
    </div>
  </div>
}
