import { LoginForm } from "./components/login_form/LoginForm"
import paypalLogo from '@core/assets/logos/paypal.png'

export const Auth: React.FC<{}> = () => {
  return <div className="auth d-flex justify-content-center align-items-center">
    <div className="shadow rounded p-3">
      <div className="d-flex justify-content-center mb-5">
        <img src={paypalLogo} alt="paypal logo" className="logo" />
      </div>
      <LoginForm />
    </div>
  </div>
}
