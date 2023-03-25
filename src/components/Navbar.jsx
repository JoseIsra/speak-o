import { useNavigate } from 'react-router-dom';
import { useSpeechly } from '../hooks/useSpeechly';

export function Navbar() {
  const navigate = useNavigate();
  const { resetResources } = useSpeechly();
  const returnToHome = () => {
    resetResources();
    navigate('/');
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost uppercase text-primary font-extrabold text-3xl">
          Speak-O
        </a>
      </div>
      <div className="flex-none">
        <button
          className="btn  text-white  bg-red-400 outline-none hover:bg-red-500
        "
          onClick={returnToHome}
        >
          Salir
        </button>
      </div>
    </div>
  );
}
