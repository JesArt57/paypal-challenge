import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import * as Yup from 'yup';
import { FormikConfig, useFormik } from "formik";
import { InputPassword } from "@core/inputs/input-password/InputPassword"
import { InputText } from "@core/inputs/input-text/InputText"
import { useAppStore } from '@stores/app/app_store';
import { LoginFormValues } from './interfaces/login.interface';

const initValuesForm: LoginFormValues = {
  user: '',
  password: ''
}

export const LoginForm = () => {
  const navigate = useNavigate();

  const { showToast } = useAppStore();

  const onHandleSubmitForm = (values: LoginFormValues) => {
    if (values.user === 'paypal@paypal.com' && values.password === 'admin') {
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/')
      return;
    }

    showToast({ severity: 'error', summary: 'Error', detail: 'Usuario o contraseña incorrectos' });
  }

  const formikParams: FormikConfig<LoginFormValues> = {
    initialValues: initValuesForm,
    onSubmit: onHandleSubmitForm,
    validationSchema: Yup.object({
      user: Yup.string()
        .email('Usuario no válido, debe ser un correo electrónico')
        .required('El usuario es requerido'),
      password: Yup.string()
        .required('La constraseña es requerida'),
    })
  }

  const {
    handleSubmit,
    getFieldProps,
    touched,
    errors
  } = useFormik(formikParams);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <InputText wrapperClassName="mb-4" placeholder="ingresa tu usuario" labelText="Usuario" className='w-100' isValid={!(touched.user && errors.user)}
          errorMessage={errors.user} {...getFieldProps('user')} />
        <InputPassword placeholder="ingresa tu contraseña" labelText="Contraseña" toggleMask feedback={false} isValid={!(touched.password && errors.password)}
          errorMessage={errors.password} {...getFieldProps('password')} />
        <Button className="mt-4 mx-auto rounded-pill bg-paypal-blue text-white w-100 border-0" label="Ingresar" />
      </form>
    </>
  )
}
