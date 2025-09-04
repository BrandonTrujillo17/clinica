import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="bg-white min-h-screen">
            {/* Sección Principal (Hero Section) */}
            <section className="relative w-full h-[60vh] flex items-center justify-center p-4 text-center text-white">
                <div className="relative z-10">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none drop-shadow-md">
                        Tu Salud en un Solo Clic
                    </h1>
                    <p className="mt-6 text-xl md:text-2xl font-light max-w-2xl mx-auto">
                        Agenda tus citas médicas en línea, consulta con especialistas y gestiona tu bienestar de manera sencilla.
                    </p>
                    <Link
                        to="/registro"
                        className="mt-8 inline-block px-8 py-4 text-lg font-bold text-[#1E8854] bg-white rounded-full shadow-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105"
                    >
                        Agenda tu Cita Ahora
                    </Link>
                </div>
            </section>

            {/* Sección de Características o Información */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-[#0F4C81]">¿Por qué elegirnos?</h2>
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
                        {/* Tarjeta 1 */}
                        <div className="bg-white p-6 rounded-xl shadow-lg transform transition duration-500 hover:scale-105">
                            <h3 className="text-xl font-semibold text-[#1E8854] mb-8">Comodidad Total</h3>
                            <p className="mt-4 text-[#6B7280]">
                                Agenda desde tu casa u oficina, sin esperas ni llamadas telefónicas.
                            </p>
                        </div>
                        {/* Tarjeta 2 */}
                        <div className="bg-white p-6 rounded-xl shadow-lg transform transition duration-500 hover:scale-105">
                            <h3 className="text-xl font-semibold text-[#1E8854]">Especialistas Certificados</h3>
                            <p className="mt-4 text-[#6B7280]">
                                Accede a una red de médicos verificados y de confianza.
                            </p>
                        </div>
                        {/* Tarjeta 3 */}
                        <div className="bg-white p-6 rounded-xl shadow-lg transform transition duration-500 hover:scale-105">
                            <h3 className="text-xl font-semibold text-[#1E8854]">Historial Médico Seguro</h3>
                            <p className="mt-4 text-[#6B7280]">
                                Mantén un registro de tus citas y recetas de forma segura y accesible.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;