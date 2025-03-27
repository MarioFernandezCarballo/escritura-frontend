import { motion } from 'framer-motion'
import Link from 'next/link';
import { useState } from 'react';
import { useSubscribers } from '@/util/api';

interface HeroProps {
    from: string; // Adjust type as needed
  }

export default function Hero({from}: HeroProps) {
    const [newEmail, setNewEmail] = useState('');
    const { addSubscriber } = useSubscribers();

    const handleAddSubscriber = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addSubscriber(newEmail, false);
            alert('¡Suscripción exitosa!');
            setNewEmail('');
        } catch (error) {
            console.error('Error adding subscriber:', error);
        }
    };
    return (
        <motion.section 
            id="hero" 
            style={from !== 'home' ? {minHeight: 400} : {}}
            className="custom-header hero-3 pe-lg-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            aria-label="Sección de introducción"
        >
            <div className="container my-auto">
                <div className="row">
                    <div className="col-xl-8 col-md-12 mx-auto">
                        <motion.h1 
                            className="my-3"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.4 }}
                        >
                            {from === 'home'
                            ? <>Mundos que <span className="">Despiertan.</span> Palabras que <span className="">Transforman</span></>
                            : from === 'blog' 
                                ? <>Explora el <span className="">Universo</span> de la escritura y la <span className="">Creatividad</span></>
                                : from === 'publicaciones' 
                                    ? <>Mi <span>biblioteca</span> literaria.</>
                                    : from === 'about'
                                        ? <>Mario <span>Carballo</span></>
                                        : from === 'contacto' 
                                            ? <><span>Conecta</span> conmigo.</>
                                            : <>Mundos que <span className="">Inspiran.</span> Palabras que <span className="">Transforman</span></>
                                }
                            
                        </motion.h1>
                        <motion.p 
                            className="mb-4 fs-6 fs-md-5"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.5 }}
                        >
                            {from === 'home' 
                            ? 'Sumérgete en un universo de relatos que desafían lo imaginable. Aquí, la fantasía y la ciencia ficción se encuentran para crear mundos sin fronteras, donde cada palabra construye realidades sorprendentes. Historias que inspiran, emocionan y perduran.'
                            : from === 'blog' 
                                ? 'Relatos, ideas y reflexiones que despiertan la imaginación'
                                : from === 'publicaciones' 
                                    ? 'Cada historia es una puerta a lo imposible, un viaje a lo desconocido y una experiencia que deja huella.'
                                    : from === 'about'
                                        ? 'De la ingeniería espacial al espacio en el papel.'
                                        : from === 'contacto'
                                            ? "Hablemos por la vía que más te guste. Estoy disponible en cualquier momento."
                                            : 'Sumérgete en un universo de relatos que desafían lo imaginable. Aquí, la fantasía y la ciencia ficción se encuentran para crear mundos sin fronteras, donde cada palabra construye realidades sorprendentes. Historias que inspiran, emocionan y perduran.'
                                }                            
                        </motion.p>
                        {from === 'hero' &&
                        <motion.p 
                            className="mb-4 fs-6 fs-md-5"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.5 }}
                        >
                            Realidades que inspiran, emocionan, y dejan huella.
                        </motion.p>}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.6 }}
                            className="w-100 w-md-75 w-lg-50"
                        >
                            {from == "home" && 
                            <form 
                                className="d-flex flex-column flex-md-row align-items-md-center gap-2"
                                onSubmit={handleAddSubscriber}
                                aria-label="Formulario de suscripción al boletín"
                            >
                                <div className="visually-hidden" aria-live="polite" role="status" id="form-status">
                                    {newEmail ? 'Email ingresado' : 'Formulario de suscripción listo'}
                                </div>
                                <div className='col-xl-12 col-md-6'>
                                    <input 
                                        className="d-inline-block form-control"
                                        type="email" 
                                        name="email" 
                                        value={newEmail}
                                        onChange={(e) => setNewEmail(e.target.value)}
                                        placeholder="Escribe tu email y no te pierdas nada" 
                                        required 
                                        aria-label="Correo electrónico para suscripción"
                                        aria-required="true"
                                        aria-describedby="form-status"
                                    />
                                    </div>
                                    <div className='col-12'>
                                    <motion.button 
                                        type="submit" 
                                        title='subscribe-button'
                                        style={{width: 'fit-content'}}
                                        className="btn btn-secondary-3 mc-button fw-medium mx-auto mx-md-0"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.2 }}
                                        whileHover={{ 
                                            scale: 1.05
                                        }}
                                        whileTap={{ scale: 0.95 }}>

                                        Únete a la comunidad
                                        <i className="ri-arrow-right-up-line fw-medium"/>
                                    </motion.button>
                                </div>
                            </form>}
                        </motion.div>
                    </div>
                </div>
            </div>
            
        </motion.section>
    )
}