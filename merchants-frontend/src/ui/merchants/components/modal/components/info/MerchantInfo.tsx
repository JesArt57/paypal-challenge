import { useMemo, useEffect } from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';
import { APISuccessfulResponse } from '@custom_types/api/api.type';
import { Merchant } from '@custom_types/merchants/merchants.interface'
import { useFetch } from '@hooks/useFetch';

interface MerchantInfoProps {
  merchantId: string;
}

interface MerchantInfoRender {
  title: string;
  value: string;
}

export const MerchantInfo: React.FC<MerchantInfoProps> = ({ merchantId }) => {

  const { data: merchants, execute, isLoading } = useFetch<APISuccessfulResponse<Merchant>>();

  useEffect(() => {
    execute({
      endpoint: `/merchants/${merchantId}`,
      method: 'GET'
    })
  }, [merchantId])

  const merchantInfo = useMemo((): MerchantInfoRender[] => {
    if (!merchants?.data) {
      return [];
    }

    const merchant = merchants.data;

    return [
      { title: 'Nombre', value: merchant.name },
      { title: 'Email', value: merchant.email },
      { title: 'Sector', value: merchant.sector },
      { title: 'Url de logotipo', value: merchant.logoUrl },
      { title: 'País', value: merchant.address.country },
      { title: 'Estado', value: merchant.address.state },
      { title: 'Ciudad', value: merchant.address.city },
      { title: 'Colonia', value: merchant.address.neighborhood },
      { title: 'Calle', value: merchant.address.street },
      { title: 'Número', value: merchant.address.streetNumber },
      { title: 'Código Postal', value: merchant.address.zipCode },
    ]
  }, [merchants])

  if (!merchantId || isLoading) {
    return <div className='d-flex justify-content-center m-5'>
      <ProgressSpinner />
    </div>
  }

  return <div>
    {
      merchantInfo.map((info, index) => (
        <div className='row mb-4' key={`indexKeyMerchantIfo:${index}`}>
          <div className='col-3 border p-2 d-flex align-items-center'><h3>{info.title}:</h3></div>
          <div className='col-9 border d-flex align-items-center'><p>{info.value}</p></div>
        </div>
      ))
    }
  </div>
}
