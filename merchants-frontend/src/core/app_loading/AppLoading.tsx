import { ProgressSpinner } from "primereact/progressspinner"

export const AppLoading = () => {
  return <div className="d-flex justify-content-center align-items-center" style={{ width: '100vw', height: '100vh' }}>
    <ProgressSpinner />
  </div>
}
