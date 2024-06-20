import { useEffect } from 'react';
import { FormikConfig, useFormik } from "formik";
import { InputText } from '@core/inputs/input-text/InputText'
import { APISuccessfulResponse } from '@custom_types/api/api.type';
import { Merchant } from '@custom_types/merchants/merchants.interface';
import { useFetch } from '@hooks/useFetch';
import { useAppStore } from '@stores/app/app_store';
import { MerchantFormValues } from './interface/merchant_form.interface';

const initValuesForm: MerchantFormValues = {
  name: '',
  email: '',
  sector: '',
  logoUrl: '',
  country: '',
  state: '',
  city: '',
  neighborhood: '',
  street: '',
  streetNumber: '',
  zipCode: ''
}

interface MerchantFormProps {
  setReloadMerchants: (reload: boolean) => void;
  onHide: () => void;
  selectedMerchant: Merchant | null;
  isCreate: boolean;
}

export const MerchantForm: React.FC<MerchantFormProps> = ({ setReloadMerchants, onHide, selectedMerchant, isCreate }) => {
  const { showToast } = useAppStore();

  const onSuccessCreate = (_: APISuccessfulResponse<Merchant>) => {
    showToast({ severity: 'success', summary: 'Éxito', detail: `El merchant a sido ${isCreate ? 'creado' : 'actualizado'} correctamente` });
    setReloadMerchants(true);
    onHide();
  }

  const onErrorCreate = (error: Error) => {
    showToast({ severity: 'error', summary: 'Error', detail: `${error}` });
  }

  const { execute: executeCreate, isLoading: isLoadingCreate } = useFetch<APISuccessfulResponse<Merchant>>(onSuccessCreate, onErrorCreate);

  const { execute: executeUpdate, isLoading: isLoadingUpdate } = useFetch<APISuccessfulResponse<Merchant>>(onSuccessCreate, onErrorCreate);

  const onHandleSubmitForm = (values: MerchantFormValues) => {
    const requestData: Merchant = {
      name: values.name,
      email: values.email,
      sector: values.sector,
      logoUrl: values.logoUrl,
      address: {
        country: values.country,
        state: values.state,
        city: values.city,
        neighborhood: values.neighborhood,
        street: values.street,
        streetNumber: values.streetNumber,
        zipCode: values.zipCode
      }
    }

    if (isCreate) {
      return executeCreate({
        endpoint: '/merchants',
        method: 'POST',
        requestData
      })
    }

    executeUpdate({
      endpoint: `/merchants/${selectedMerchant?.id}`,
      method: 'PATCH',
      requestData
    })
  }

  const formikParams: FormikConfig<MerchantFormValues> = {
    initialValues: initValuesForm,
    onSubmit: onHandleSubmitForm,
  }

  const {
    handleSubmit,
    getFieldProps,
    setValues
  } = useFormik(formikParams);

  useEffect(() => {
    if (!selectedMerchant) {
      return;
    }

    setValues({
      name: selectedMerchant.name,
      email: selectedMerchant.email,
      sector: selectedMerchant.sector,
      logoUrl: selectedMerchant.logoUrl,
      country: selectedMerchant.address.country,
      state: selectedMerchant.address.state,
      city: selectedMerchant.address.city,
      neighborhood: selectedMerchant.address.neighborhood,
      street: selectedMerchant.address.street,
      streetNumber: selectedMerchant.address.streetNumber,
      zipCode: selectedMerchant.address.zipCode
    })
  }, [selectedMerchant])

  return <form onSubmit={handleSubmit}>
    <h2 className='fw-bold'>Datos Generales</h2>
    <hr className='mb-3' />
    <div className='row mb-3'>
      <div className='col-6'><InputText className='w-100' required placeholder='ingresa la información aquí' labelText="Nombre" {...getFieldProps('name')} /></div>
      <div className='col-6'><InputText className='w-100' required placeholder='ingresa la información aquí' labelText="Email" {...getFieldProps('email')} /></div>
    </div>

    <div className='row mb-3'>
      <div className='col-6'><InputText className='w-100' required placeholder='ingresa la información aquí' labelText="Sector" {...getFieldProps('sector')} /></div>
      <div className='col-6'><InputText className='w-100' required placeholder='ingresa la información aquí' labelText="Url de logotipo" {...getFieldProps('logoUrl')} /></div>
    </div>

    <h2 className='mt-5 fw-bold'>Dirección</h2>
    <hr className='mb-3' />

    <div className='row mb-3'>
      <div className='col-6'><InputText className='w-100' required placeholder='ingresa la información aquí' labelText="País" {...getFieldProps('country')} /></div>
      <div className='col-6'><InputText className='w-100' required placeholder='ingresa la información aquí' labelText="Estado" {...getFieldProps('state')} /></div>
    </div>

    <div className='row mb-3'>
      <div className='col-6'><InputText className='w-100' required placeholder='ingresa la información aquí' labelText="Ciudad" {...getFieldProps('city')} /></div>
      <div className='col-6'><InputText className='w-100' required placeholder='ingresa la información aquí' labelText="Colonia" {...getFieldProps('neighborhood')} /></div>
    </div>

    <div className='row mb-3'>
      <div className='col-6'><InputText className='w-100' required placeholder='ingresa la información aquí' labelText="Calle" {...getFieldProps('street')} /></div>
      <div className='col-6'><InputText className='w-100' required placeholder='ingresa la información aquí' labelText="Numero" {...getFieldProps('streetNumber')} /></div>
    </div>

    <div className='row mb-3'>
      <div className='col-6'><InputText className='w-100' required placeholder='ingresa la información aquí' labelText="Código postal" {...getFieldProps('zipCode')} /></div>
    </div>

    <div className='d-flex justify-content-center mt-5'>
      <button className='btn btn-paypal-blue w-50' disabled={isLoadingCreate || isLoadingUpdate}>Guardar</button>
    </div>
  </form>
}
