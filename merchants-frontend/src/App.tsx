import { Suspense, useEffect, useRef } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Toast } from 'primereact/toast'
import { AppLoading } from '@core/app_loading/AppLoading'
import { Auth } from '@ui/auth/Auth'
import { Layout } from '@ui/layout/Layout'
import { Merchants } from '@ui/merchants/Merchants'
import { useAppStore } from '@stores/app/app_store'

export const App: React.FC<{}> = () => {
  const toastRef = useRef<Toast>(null);

  const navigate = useNavigate();

  const { isShowToast, toastMessage, hiddenToast } = useAppStore();

  useEffect(() => {
    if (!isShowToast || Object.keys(toastMessage).length === 0) {
      return
    }

    toastRef.current?.show(toastMessage);
    hiddenToast(); // set isShowToast to false
  }, [isShowToast, toastMessage]);

  useEffect(() => {
    // we can save encrypted user session or encrypted info in the local storage
    const isAuthenticated = localStorage.getItem('isAuthenticated');

    // we can use oauth2, jwt or any provider to authenticate the user
    if (!isAuthenticated) {
      return navigate('/login');
    }

    navigate('/');
  }, []);

  return <Suspense fallback={<AppLoading />}>
    <Toast ref={toastRef} />
    <Routes>
      <Route path="login" element={<Auth />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Merchants />} />
      </Route>
    </Routes>
  </Suspense>
}
