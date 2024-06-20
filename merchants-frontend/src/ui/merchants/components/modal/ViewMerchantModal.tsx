import { Dialog } from 'primereact/dialog';
import { Merchant } from '@custom_types/merchants/merchants.interface';
import { MerchantInfo } from './components/info/MerchantInfo';

interface MerchantModalProps {
  isVisible: boolean;
  onHide: () => void;
  selectedMerchant: Merchant | null;
}

export const ViewMerchantModal: React.FC<MerchantModalProps> = ({ isVisible, onHide, selectedMerchant }) => {
  return <Dialog header={selectedMerchant?.name} visible={isVisible} style={{ width: '50vw' }} onHide={onHide}>
    {
      selectedMerchant?.id ? <MerchantInfo merchantId={selectedMerchant.id} /> : <></>
    }
  </Dialog>
}
