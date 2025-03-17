import Layout from '@/components/layout/Layout'

export default function Privacidad() {
    
    return (
        <>
            <Layout headerStyle={3} footerStyle={3}>
                <section className="custom-header">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-8 col-md-12">
                            <h1>Política de Privacidad</h1>
                            <p>Última actualización: Marzo de 2025</p>

                            <h5>1. Responsable del Tratamiento</h5>
                            <p><strong>Identidad:</strong> Mario Carballo</p>
                            <p><strong>Correo Electrónico:</strong> <a href="mailto:mariofernandezcarballo@gmail.com">mariofernandezcarballo@gmail.com</a></p>

                            <h5>2. Datos Recogidos</h5>
                            <p>Recogemos los siguientes datos personales a través de nuestro Sitio:</p>
                            <ul>
                                <li><strong>Formulario de Contacto:</strong> Nombre, correo electrónico y mensaje.</li>
                                <li><strong>Suscripción a Newsletter:</strong> Correo electrónico.</li>
                            </ul>

                            <h5>3. Finalidad del Tratamiento</h5>
                            <p>Los datos recopilados se utilizan para:</p>
                            <ul>
                                <li><strong>Responder a consultas:</strong> Gestionar y responder a las solicitudes enviadas a través del formulario de contacto.</li>
                                <li><strong>Envío de comunicaciones:</strong> Remitir newsletters y otras comunicaciones comerciales, siempre que el usuario haya otorgado su consentimiento.</li>
                            </ul>

                            <h5>4. Legitimación</h5>
                            <p>El tratamiento de datos se basa en:</p>
                            <ul>
                                <li><strong>Consentimiento del interesado:</strong> Para el envío de comunicaciones comerciales.</li>
                                <li><strong>Interés legítimo:</strong> Para responder a las consultas recibidas.</li>
                            </ul>

                            <h5>5. Conservación de los Datos</h5>
                            <p>Los datos se conservarán durante el tiempo necesario para cumplir con las finalidades mencionadas y, posteriormente, durante los plazos legales aplicables.</p>

                            <h5>6. Derechos del Usuario</h5>
                            <p>Los usuarios tienen derecho a:</p>
                            <ul>
                                <li><strong>Acceder:</strong> Conocer qué datos personales tenemos.</li>
                                <li><strong>Rectificar:</strong> Solicitar la corrección de datos inexactos.</li>
                                <li><strong>Suprimir:</strong> Pedir la eliminación de sus datos cuando ya no sean necesarios.</li>
                                <li><strong>Oponerse:</strong> Negarse al tratamiento de sus datos para fines específicos.</li>
                                <li><strong>Portabilidad:</strong> Recibir sus datos en un formato electrónico estructurado.</li>
                            </ul>
                            <p>Para ejercer estos derechos, puede contactar a través del correo electrónico: <a href="mailto:mariofernandezcarballo@gmail.com">mariofernandezcarballo@gmail.com</a>.</p>

                            <h5>7. Seguridad de los Datos</h5>
                            <p>Mario Carballo implementa medidas técnicas y organizativas para garantizar la seguridad de los datos personales y evitar su alteración, pérdida, tratamiento o acceso no autorizado.</p>

                            <h5>8. Cambios en la Política de Privacidad</h5>
                            <p>Nos reservamos el derecho de modificar esta política para adaptarla a novedades legislativas o jurisprudenciales. Los cambios serán comunicados a través de este Sitio.</p>

                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    )
}
