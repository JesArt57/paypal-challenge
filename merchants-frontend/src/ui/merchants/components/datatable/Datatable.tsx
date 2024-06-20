import { useEffect, useState } from 'react';
import { Column } from 'primereact/column';
import { DataTable, DataTablePageEvent } from 'primereact/datatable';
import Swal from 'sweetalert2';
import { Merchant, PaginatedMerchants } from '@custom_types/merchants/merchants.interface';
import { useFetch } from '@hooks/useFetch';
import { APISuccessfulResponse } from '@custom_types/api/api.type';
import { Pagination } from '@custom_types/merchants/merchants.interface';
import { useAppStore } from '@stores/app/app_store';

interface DatatableProps {
  handleShowUpdateMerchant: () => void;
  setSelectedMerchant: (merchant: Merchant) => void;
  reloadMerchants: boolean;
  setReloadMerchants: (reload: boolean) => void;
  setIsShowViewMerchantModal: (isShow: boolean) => void;
}

export const Datatable: React.FC<DatatableProps> = ({ handleShowUpdateMerchant, setSelectedMerchant, reloadMerchants: isReloadMerchants, setReloadMerchants, setIsShowViewMerchantModal }) => {
  const [values, setValues] = useState<Merchant[]>([]);
  const [totalValues, setTotalValues] = useState<number>(0);
  const [pagination, setPagination] = useState<Pagination>({ limit: 10, offset: 0 });

  const { showToast } = useAppStore();

  const { data: merchants, execute: executeFindAll, isLoading: isLoadingMerchants } = useFetch<APISuccessfulResponse<PaginatedMerchants>>();

  useEffect(() => {
    const merchantsData = merchants?.data;

    if (merchantsData) {
      setValues(merchantsData.merchants);
      setTotalValues(merchantsData.total);

      setPagination(prevState => {
        const lastOffset = Math.ceil(merchantsData.total / prevState.limit);
        const lastPage = lastOffset === 0 ? 0 : (lastOffset - 1);

        if (prevState.offset > lastPage) {
          return { ...prevState, lastPage }
        }

        return prevState;
      });
    }
  }, [merchants]);

  useEffect(() => {
    if (isReloadMerchants) {
      findAllMerchants(pagination.offset);
      setReloadMerchants(false);
    }
  }, [isReloadMerchants, pagination]);

  const findAllMerchants = (offset: number) => executeFindAll({
    endpoint: `/merchants?limit=10&offset=${offset}`,
    method: 'GET'
  })

  const onSuccessDeleteMerchant = (_: APISuccessfulResponse<PaginatedMerchants>) => {
    showToast({ severity: 'success', summary: 'Éxito', detail: 'Registro eliminado correctamente.' });

    setReloadMerchants(true);
  }

  const onErrorDeleteMerchant = (_: Error) => {
    showToast({ severity: 'error', summary: 'Error', detail: 'Error al eliminar registro.' });
  }

  const { execute: executeDelete } = useFetch<APISuccessfulResponse<PaginatedMerchants>>(
    onSuccessDeleteMerchant, onErrorDeleteMerchant
  );

  const paginationOffset = pagination.offset

  useEffect(() => {
    findAllMerchants(paginationOffset)
  }, [paginationOffset]);

  const showDeleteDialog = (merchant: Merchant) => {
    Swal.fire({
      title: "¿Estás seguro de eliminar el registro?",
      text: "No podrás revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        executeDelete({
          endpoint: `/merchants/${merchant.id}`,
          method: 'DELETE'
        });
      }
    });
  }

  const addressBody = ({ address }: Merchant) => {
    return <div>{address.street} {address.streetNumber}, {address.neighborhood} {address.city} {address.state}</div>
  }

  const logoBody = ({ logoUrl }: Merchant) => {
    return <img src={logoUrl} style={{ width: '30px', height: '30px' }} className='rounded-circle' />
  }

  const onClickEdit = (merchant: Merchant) => {
    setSelectedMerchant(merchant);
    handleShowUpdateMerchant();
  }

  const onClickView = (merchant: Merchant) => {
    setSelectedMerchant(merchant);
    setIsShowViewMerchantModal(true);
  }

  const actionBody = (merchant: Merchant) => {
    return (
      <div className='d-flex align-items-center justify-content-center'>
        <button className="btn btn-paypal-boyzone-blue text-white me-2" onClick={() => onClickEdit(merchant)}>Editar</button>
        <button className="btn btn-danger me-2" onClick={() => showDeleteDialog(merchant)}>Eliminar</button>
        <button className="btn btn-success" onClick={() => onClickView(merchant)}>Ver</button>
      </div>
    )
  };

  const onPage = (event: DataTablePageEvent) => {
    setPagination(prevState => ({ ...prevState, offset: Number(event.page) }))
  }

  return (
    <>
      <div className="datatable">
        <DataTable className='mt-4' lazy loading={isLoadingMerchants} value={values} paginator rows={10} first={pagination.offset * 10} onPage={onPage}
          dataKey="id" emptyMessage="Merchants no encontrados." totalRecords={totalValues}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
          currentPageReportTemplate='{first} al {last} / {totalRecords}'
          rowsPerPageOptions={[10, 25, 50]}
          globalFilterFields={['name', 'email', 'sector', 'address']}
        >
          <Column align="center" body={(_, options) => options.rowIndex + 1} header="#"></Column>
          <Column align="center" field="id" header="ID" sortable></Column>
          <Column align="center" field="name" header="Nombre" sortable></Column>
          <Column align="center" field="email" header="Email" sortable></Column>
          <Column align="center" field="sector" header="Giro" sortable></Column>
          <Column align="center" body={logoBody} header="Logo"></Column>
          <Column align="center" body={addressBody} field='address' header="Dirección" sortable></Column>
          <Column align="center" body={actionBody} header="Acciones"></Column>
        </DataTable>
      </div>
    </>)
}
