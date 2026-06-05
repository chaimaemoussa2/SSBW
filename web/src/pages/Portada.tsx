function Portada() {
  return (
    <div className="flex flex-col items-center justify-center h-screen font-montserrat">
      <h1 className="text-4xl font-bold mb-8">Tienda Prado Clone</h1>
      <div role="tablist" className="tabs tabs-bordered">
        <input type="radio" name="my_tabs" role="tab" className="tab" aria-label="Bienvenida" defaultChecked />
        <div role="tabpanel" className="tab-content p-6">
          <p className="text-lg">Bienvenido a la Tienda Prado Clone 🎨</p>
          <p className="mt-2 text-gray-500">Explora nuestra colección de obras de arte.</p>
        </div>

        <input type="radio" name="my_tabs" role="tab" className="tab" aria-label="Sobre nosotros" />
        <div role="tabpanel" className="tab-content p-6">
          <p className="text-lg">Somos una tienda online de reproducciones del Museo del Prado.</p>
        </div>

        <input type="radio" name="my_tabs" role="tab" className="tab" aria-label="Contacto" />
        <div role="tabpanel" className="tab-content p-6">
          <p className="text-lg">📧 contacto@tiendaprado.com</p>
        </div>
      </div>
    </div>
  );
}

export default Portada;