import { useState } from 'react';
import { MinecraftClient } from 'minecraft-protocol';

const Stresser = () => {
  const [serverIp, setServerIp] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleStress = async () => {
    setLoading(true);
    setMessage('');

    const numberOfRequests = 100; // Aumenta el número de solicitudes
    const interval = 1000; // Intervalo en milisegundos entre cada solicitud
    const playerName = 'j0vi1An';

    try {
      for (let i = 0; i < numberOfRequests; i++) {
        const client = new MinecraftClient(serverIp, 25565, {
          username: playerName,
        });

        client.on('connect', () => {
          console.log(`Connected as ${playerName}`);
        });

        client.on('error', (err) => {
          console.error(`Error: ${err.message}`);
        });

        client.connect();

        await new Promise(resolve => setTimeout(resolve, interval));
      }
      setMessage(`Enviadas ${numberOfRequests} solicitudes.`);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Stresser de Minecraft</h1>
      <input
        type="text"
        value={serverIp}
        onChange={(e) => setServerIp(e.target.value)}
        placeholder="IP del servidor"
      />
      <button onClick={handleStress} disabled={loading}>
        {loading ? 'Enviando...' : 'Enviar Solicitudes'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Stresser;
