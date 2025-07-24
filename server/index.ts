// Development server using Vite directly
import { createServer } from 'vite';
import path from 'path';

const PORT = Number(process.env.PORT) || 9001;

async function startServer() {
  const vite = await createServer({
    root: path.resolve(process.cwd(), 'client'),
    server: {
      port: PORT as number,
      host: '0.0.0.0'
    }
  });

  await vite.listen();
  console.log(`Vite dev server running on port ${PORT}`);
}

startServer().catch(console.error);