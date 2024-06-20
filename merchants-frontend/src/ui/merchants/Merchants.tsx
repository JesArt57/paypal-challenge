import { useState } from 'react'
import { Datatable } from './components/datatable/Datatable'
import { MerchantModal } from './components/modal/MerchantModal'
import { Merchant } from '@custom_types/merchants/merchants.interface';
import { ViewMerchantModal } from './components/modal/ViewMerchantModal';

export const Merchants = () => {
  const [isShowMerchantModal, setIsShowMerchantModal] = useState<boolean>(false);
  const [isShowViewMerchantModal, setIsShowViewMerchantModal] = useState<boolean>(false);
  const [isCreateMerchant, setIsCreateMerchant] = useState<boolean>(false);
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(null);
  const [reloadMerchants, setReloadMerchants] = useState<boolean>(false);

  const handleShowCreateMerchant = () => {
    setIsCreateMerchant(true);
    setIsShowMerchantModal(true);
  }

  const handleShowUpdateMerchant = () => {
    setIsCreateMerchant(false);
    setIsShowMerchantModal(true);
  }

  const handleClosedMerchantModal = () => {
    setIsShowMerchantModal(false);
    setSelectedMerchant(null);
  }

  const handleClosedViewMerchantModal = () => {
    setIsShowViewMerchantModal(false);
    setSelectedMerchant(null);
  }

  return (
    <div>
      <div className='mb-4 d-flex justify-content-end'>
        <button className='btn btn-paypal-blue' onClick={handleShowCreateMerchant}>Crear Merchant</button>
      </div>
      <Datatable setIsShowViewMerchantModal={setIsShowViewMerchantModal} reloadMerchants={reloadMerchants} setReloadMerchants={setReloadMerchants} handleShowUpdateMerchant={handleShowUpdateMerchant} setSelectedMerchant={setSelectedMerchant} />
      <MerchantModal isVisible={isShowMerchantModal} onHide={handleClosedMerchantModal} isCreate={isCreateMerchant} setReloadMerchants={setReloadMerchants} selectedMerchant={selectedMerchant} />
      <ViewMerchantModal selectedMerchant={selectedMerchant} isVisible={isShowViewMerchantModal} onHide={handleClosedViewMerchantModal} />
    </div>
  )
}
