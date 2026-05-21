import CookieConsent, { Cookies } from 'react-cookie-consent';
import './CookieConsent.css';

export default function CookieConsentBanner() {
  const handleDecline = () => {
    Cookies.remove('emoji-cards-consent');
  };

  return (
    <CookieConsent
      location="bottom"
      buttonText="✅ Прийняти"
      declineButtonText="❌ Відхилити"
      cookieName="emoji-cards-consent"
      cookieValue="true"
      style={{
        background: '#2c3e50',
        color: '#ecf0f1',
        fontSize: '14px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: '20px',
        zIndex: 9999,
      }}
      buttonStyle={{
        background: '#27ae60',
        color: '#fff',
        fontSize: '14px',
        padding: '12px 24px',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'background-color 0.3s ease',
      }}
      buttonClasses="cookie-button-accept"
      declineButtonStyle={{
        background: '#e74c3c',
        color: '#fff',
        fontSize: '14px',
        padding: '12px 24px',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'background-color 0.3s ease',
      }}
      declineButtonClasses="cookie-button-decline"
      expires={365}
      onDecline={handleDecline}
      enableDeclineButton={true}
    >
      🍪 <strong>Политика використання Cookies</strong>
      <br />
      Цей сайт використовує cookies для покращення вашого досвіду. Ми поважаємо вашу приватність.
      <br />
      Переглянути нашу{' '}
      <a href="/PRIVACY_POLICY.md" style={{ color: '#3498db', textDecoration: 'underline' }}>
        Політику приватності
      </a>
    </CookieConsent>
  );
}

