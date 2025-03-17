import Layout from '@/components/layout/Layout'

export default function Terminos() {
    
    return (
        <>
            <Layout headerStyle={3} footerStyle={3}>
                <section className="custom-header">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-8 col-md-12">
                                <h1>Términos y condiciones</h1>
                                <p>Última actualización: Marzo de 2025</p>

                                <h5>1. Información General</h5>
                                <p>El presente documento establece los términos y condiciones de uso del sitio web <strong>mariocarballo.es</strong> (en adelante, "el Sitio"). Para consultas, puede contactar a través del correo electrónico: <a href="mailto:mariofernandezcarballo@gmail.com">mariofernandezcarballo@gmail.com</a>.</p>

                                <h5>2. Aceptación de los Términos</h5>
                                <p>Al acceder y utilizar el Sitio, el usuario acepta cumplir con estos términos y condiciones. Si no está de acuerdo con alguno de ellos, debe abstenerse de utilizar el Sitio.</p>

                                <h5>3. Uso del Sitio</h5>
                                <ul>
                                    <li><strong>Contenido:</strong> El contenido del Sitio es propiedad de Mario Carballo o de terceros que han autorizado su uso. Queda prohibida su reproducción, distribución o modificación sin autorización previa.</li>
                                    <li><strong>Responsabilidad del Usuario:</strong> El usuario se compromete a hacer un uso adecuado del Sitio y a no emplearlo para actividades ilícitas o contrarias a la buena fe y al orden público.</li>
                                </ul>

                                <h5>4. Protección de Datos</h5>
                                <p>La recopilación y tratamiento de datos personales se rige por nuestra <a href="/privacidad">Política de Privacidad</a>.</p>

                                <h5>5. Enlaces a Terceros</h5>
                                <p>El Sitio puede contener enlaces a sitios web de terceros. Mario Carballo no se responsabiliza del contenido ni de las políticas de privacidad de dichos sitios.</p>

                                <h5>6. Modificaciones de los Términos</h5>
                                <p>Mario Carballo se reserva el derecho de modificar estos términos en cualquier momento. Las modificaciones entrarán en vigor desde su publicación en el Sitio.</p>

                                <h5>7. Legislación Aplicable</h5>
                                <p>Estos términos se rigen por la legislación española. Cualquier controversia se someterá a los juzgados y tribunales de Cantabria, España.</p>

                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    )
}
