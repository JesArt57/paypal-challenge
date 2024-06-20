import { Dialog } from 'primereact/dialog';
import { MerchantForm } from './components/form/MerchantForm';
import { Merchant } from '@custom_types/merchants/merchants.interface';

interface MerchantModalProps {
  isVisible: boolean;
  onHide: () => void;
  isCreate: boolean;
  setReloadMerchants: (reload: boolean) => void;
  selectedMerchant: Merchant | null;
}

export const MerchantModal: React.FC<MerchantModalProps> = ({ isVisible, onHide, isCreate, setReloadMerchants, selectedMerchant }) => {
  return <Dialog header={isCreate ? 'Creando Merchant' : 'Actualizando Merchant'} visible={isVisible} style={{ width: '50vw' }} onHide={onHide}>
    <MerchantForm isCreate={isCreate} selectedMerchant={selectedMerchant} setReloadMerchants={setReloadMerchants} onHide={onHide} />
  </Dialog>
}
