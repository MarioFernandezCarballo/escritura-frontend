import { motion } from 'framer-motion'
import { useState } from 'react';
import { useSubscribers } from '@/util/api';

export default function SubscribeForm() {
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
        <form 
            className="col-xl-8 col-md-12 d-flex flex-column flex-md-row align-items-md-center gap-2"
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
                title='form-submit-button'
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
        </form>
    )
}