import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

function Cuadros() {
  const url = "http://localhost:3000/api/productos/random";
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  const Recarga = () => { mutate(); };

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-2xl shadow-md w-80">
      <h3 className="font-montserrat font-bold text-xl text-gray-700">🎨 Galeria de Tienda Prado</h3>
      {isLoading && <p className="text-gray-400">Loading...</p>}
      {error && <p className="text-red-400">Error loading image.</p>}
      {data && (
        <img
          src={`http://localhost:3000/public/imagenes/${data.imagen}`}
          alt={data.titulo}
          className="w-64 h-64 object-cover rounded-xl"
        />
      )}
      {data && <p className="text-center text-gray-600 font-montserrat">{data.titulo}</p>}
      <button
        onClick={Recarga}
        className="font-bold cursor-pointer bg-green-300 p-4 rounded-2xl hover:bg-green-400 text-gray-600"
      >
        ¡Otro! <span>🎨</span>
      </button>
    </div>
  );
}

export default Cuadros;