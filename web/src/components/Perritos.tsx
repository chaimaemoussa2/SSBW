import { useState, useEffect } from "react";

function Perritos() {
  const [imagen, setImagen] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPerrito = async () => {
    setLoading(true);
    const res = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await res.json();
    setImagen(data.message);
    setLoading(false);
  };

  useEffect(() => {
    fetchPerrito();
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-2xl shadow-md w-80">
      <h3 className="font-montserrat font-bold text-xl text-gray-700">🐶 Random Doggo</h3>
      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : (
        <img src={imagen!} alt="perrito" className="w-64 h-64 object-cover rounded-xl" />
      )}
      <button
        onClick={fetchPerrito}
        className="font-bold cursor-pointer bg-yellow-300 p-4 rounded-2xl hover:bg-yellow-400 text-gray-600"
      >
        ¡Otro! <span>🐕</span>
      </button>
    </div>
  );
}

export default Perritos;