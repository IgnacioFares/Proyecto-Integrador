import { faFacebookF, faInstagram, faTwitter, faLinkedinIn, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer = () => {
  return (
    <div>            
        <div className="bg-white">
    <div className="flex flex-col md:flex-row justify-between items-center py-4 px-8">
        <img src="/images/logosolo1.png" alt="Logo" className="mb-4 md:mb-0" />
       
        <div className="flex md:flex-row">
            <a href="#" className="px-4"><FontAwesomeIcon icon={faFacebookF} /></a>
            <a href="#" className="px-4"><FontAwesomeIcon icon={faInstagram} /></a>
            <a href="#" className="px-4"><FontAwesomeIcon icon={faTwitter} /></a>
            <a href="#" className="px-4"><FontAwesomeIcon icon={faLinkedinIn} /></a>
            <a href="#" className="px-4"><FontAwesomeIcon icon={faYoutube} /></a>
        </div>
    </div>
</div>


      <div style={{
        background: '#1EB962',
        width: '80%',
        height: '2px',
        backgroundImage: 'linear-gradient(to right, #1EB962, #4FCA85)',
        margin: '10px auto'
      }} />
      <div className="hidden md:flex justify-between items-center text-sm px-8 py-4">
            <p>© 2024 DH. Todos los derechos reservados.</p>
            <div className="flex">
                <a href="#" className="px-4">Privacy Policy</a>
                <a href="#" className="px-4">Terms of Service</a>
                <a href="#" className="px-4">Cookies Settings</a>
            </div>
        </div>
            <div className="md:hidden flex flex-col items-center text-sm px-8 py-4">
            <a href="#" className="px-4">Privacy Policy</a>
            <a href="#" className="px-4">Terms of Service</a>
            <a href="#" className="px-4">Cookies Settings</a>
            <p>© 2024 DH. Todos los derechos reservados.</p>
            </div>

    </div>
  );
}


export default Footer;
