import { useErrorContext } from '../context/ErrorProvider';

export function GameReport() {
  const {
    initialState: { badAnswers },
  } = useErrorContext();

  return (
    <div>
      <h1>REPORTE DEL JUEGO CON ERRORES PARA EL USURIAO</h1>
      <div>
        <p>Tu toal de errores {badAnswers.length}</p>
      </div>
      <div>
        {badAnswers.map((ba, idx) => (
          <p key={idx}>{ba.name}</p>
        ))}
      </div>
    </div>
  );
}
