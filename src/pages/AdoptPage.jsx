import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom'
import './AdoptPage.css';

const AdoptPage = () => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const location = useLocation();
    const petData = location.state?.petData || { nombre: 'una mascota' };

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const onSubmit = (data) => {
        console.log('Datos del formulario:', { ...data, petData });
        setShowConfirmation(true);
        setTimeout(() => {
            setShowConfirmation(false);
        }, 5000);
        reset();
    };

    return (
        <div className="adopt-page">
            {/* Header */}
            <header className="adopt-page__header">
                <h1 className="adopt-page__logo">Pelusa Society</h1>
            </header>

            {/* Mensaje de confirmación */}
            {showConfirmation && (
                <div className="adopt-page__confirmation">
                    <div className="adopt-page__confirmation-content">
                        <span className="adopt-page__confirmation-icon">✅</span>
                        <p className="adopt-page__confirmation-text">
                            ¡Solicitud de adopción enviada exitosamente! Nos pondremos en contacto contigo pronto.
                        </p>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className="adopt-page__main">
                <div className="adopt-page__container">

                    {/* Título y descripción */}
                    <div className="adopt-page__intro">
                        <h2 className="adopt-page__title">Solicitud de adopción</h2>
                        <p className="adopt-page__description">
                            Qué bien que te hayas decidido por {petData.nombre}! Ahora vamos a
                            cumplimentar el formulario de solicitud para asegurarnos de que haces el match
                            perfecto. Además hemos añadido un campo extra al final por si quieres adoptar
                            más de una mascota. En caso afirmativo, deberás indicarnos su nombre y preferir.
                        </p>
                        <p className="adopt-page__note">
                            Recordatorio: todos los campos con asterisco (*) son obligatorios.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="adopt-form">

                        {/* Información Personal */}
                        <section className="adopt-form__section">
                            <h3 className="adopt-form__section-title">
                                <span className="adopt-form__section-icon">👤</span>
                                Información personal
                            </h3>

                            <div className="adopt-form__field">
                                <label htmlFor="fullName" className="adopt-form__label">
                                    Nombre completo*
                                </label>
                                <input
                                    type="text"
                                    id="fullName"
                                    placeholder="Campo a rellenar"
                                    className={`adopt-form__input ${errors.fullName ? 'adopt-form__input--error' : ''}`}
                                    {...register('fullName', {
                                        required: 'El nombre completo es obligatorio',
                                        pattern: {
                                            value: /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/,
                                            message: 'El nombre solo puede contener letras y espacios'
                                        },
                                        minLength: {
                                            value: 2,
                                            message: 'El nombre debe tener al menos 2 caracteres'
                                        }
                                    })}
                                />
                                {errors.fullName && (
                                    <span className="adopt-form__error">{errors.fullName.message}</span>
                                )}
                            </div>

                            <div className="adopt-form__field">
                                <label htmlFor="phone" className="adopt-form__label">
                                    Teléfono*
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    placeholder="Campo a rellenar"
                                    className={`adopt-form__input ${errors.phone ? 'adopt-form__input--error' : ''}`}
                                    {...register('phone', {
                                        required: 'El teléfono es obligatorio',
                                        pattern: {
                                            value: /^[+]?[0-9\s\-()]{9,15}$/,
                                            message: 'Formato de teléfono inválido (9-15 dígitos)'
                                        }
                                    })}
                                />
                                {errors.phone && (
                                    <span className="adopt-form__error">{errors.phone.message}</span>
                                )}
                            </div>

                            <div className="adopt-form__field">
                                <label htmlFor="email" className="adopt-form__label">
                                    Correo electrónico*
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Campo a rellenar"
                                    className={`adopt-form__input ${errors.email ? 'adopt-form__input--error' : ''}`}
                                    {...register('email', {
                                        required: 'El correo electrónico es obligatorio',
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: 'Formato de correo electrónico inválido'
                                        }
                                    })}
                                />
                                {errors.email && (
                                    <span className="adopt-form__error">{errors.email.message}</span>
                                )}
                            </div>

                            <div className="adopt-form__field">
                                <label htmlFor="address" className="adopt-form__label">
                                    Dirección completa*
                                </label>
                                <input
                                    type="text"
                                    id="address"
                                    placeholder="Campo a rellenar"
                                    className={`adopt-form__input ${errors.address ? 'adopt-form__input--error' : ''}`}
                                    {...register('address', {
                                        required: 'La dirección es obligatoria',
                                        minLength: {
                                            value: 10,
                                            message: 'La dirección debe ser más específica'
                                        }
                                    })}
                                />
                                {errors.address && (
                                    <span className="adopt-form__error">{errors.address.message}</span>
                                )}
                            </div>

                            <div className="adopt-form__field">
                                <label htmlFor="age" className="adopt-form__label">
                                    Edad*
                                </label>
                                <input
                                    type="number"
                                    id="age"
                                    min="18"
                                    max="100"
                                    placeholder="Campo a rellenar"
                                    className={`adopt-form__input ${errors.age ? 'adopt-form__input--error' : ''}`}
                                    {...register('age', {
                                        required: 'La edad es obligatoria',
                                        min: {
                                            value: 18,
                                            message: 'Debes ser mayor de 18 años'
                                        },
                                        max: {
                                            value: 100,
                                            message: 'Edad inválida'
                                        }
                                    })}
                                />
                                {errors.age && (
                                    <span className="adopt-form__error">{errors.age.message}</span>
                                )}
                            </div>

                            <div className="adopt-form__field">
                                <label htmlFor="occupation" className="adopt-form__label">
                                    Ocupación*
                                </label>
                                <input
                                    type="text"
                                    id="occupation"
                                    placeholder="Campo a rellenar"
                                    className={`adopt-form__input ${errors.occupation ? 'adopt-form__input--error' : ''}`}
                                    {...register('occupation', {
                                        required: 'La ocupación es obligatoria',
                                        minLength: {
                                            value: 2,
                                            message: 'La ocupación debe tener al menos 2 caracteres'
                                        }
                                    })}
                                />
                                {errors.occupation && (
                                    <span className="adopt-form__error">{errors.occupation.message}</span>
                                )}
                            </div>
                        </section>

                        {/* Información del Hogar */}
                        <section className="adopt-form__section">
                            <h3 className="adopt-form__section-title">
                                <span className="adopt-form__section-icon">🏠</span>
                                Información del hogar
                            </h3>

                            <div className="adopt-form__field">
                                <label htmlFor="housingType" className="adopt-form__label">
                                    Selecciona una opción*
                                </label>
                                <select
                                    id="housingType"
                                    className={`adopt-form__select ${errors.housingType ? 'adopt-form__select--error' : ''}`}
                                    {...register('housingType', {
                                        required: 'Selecciona el tipo de vivienda'
                                    })}
                                >
                                    <option value="">Selecciona una opción</option>
                                    <option value="casa">Casa</option>
                                    <option value="apartamento">Apartamento</option>
                                    <option value="piso">Piso</option>
                                    <option value="otro">Otro</option>
                                </select>
                                {errors.housingType && (
                                    <span className="adopt-form__error">{errors.housingType.message}</span>
                                )}
                            </div>

                            <div className="adopt-form__checkbox-group">
                                <label className="adopt-form__checkbox">
                                    <input
                                        type="checkbox"
                                        className="adopt-form__checkbox-input"
                                        {...register('hasYard')}
                                    />
                                    <span className="adopt-form__checkbox-label">Tengo jardín o patio</span>
                                </label>
                            </div>

                            <div className="adopt-form__checkbox-group">
                                <label className="adopt-form__checkbox">
                                    <input
                                        type="checkbox"
                                        className="adopt-form__checkbox-input"
                                        {...register('hasOtherPets')}
                                    />
                                    <span className="adopt-form__checkbox-label">Tengo otras mascotas</span>
                                </label>
                            </div>

                            <div className="adopt-form__checkbox-group">
                                <label className="adopt-form__checkbox">
                                    <input
                                        type="checkbox"
                                        className="adopt-form__checkbox-input"
                                        {...register('hasChildren')}
                                    />
                                    <span className="adopt-form__checkbox-label">Tengo niños en casa</span>
                                </label>
                            </div>
                        </section>

                        {/* Experiencia y Motivación */}
                        <section className="adopt-form__section">
                            <h3 className="adopt-form__section-title">
                                <span className="adopt-form__section-icon">❤️</span>
                                Experiencia y motivación
                            </h3>

                            <div className="adopt-form__field">
                                <label htmlFor="hasPetExperience" className="adopt-form__label">
                                    ¿Has tenido mascotas antes?*
                                </label>
                                <input
                                    type="text"
                                    id="hasPetExperience"
                                    placeholder="Campo a rellenar"
                                    className={`adopt-form__input ${errors.hasPetExperience ? 'adopt-form__input--error' : ''}`}
                                    {...register('hasPetExperience', {
                                        required: 'Este campo es obligatorio'
                                    })}
                                />
                                {errors.hasPetExperience && (
                                    <span className="adopt-form__error">{errors.hasPetExperience.message}</span>
                                )}
                            </div>

                            <div className="adopt-form__field">
                                <label htmlFor="motivation" className="adopt-form__label">
                                    ¿Por qué quieres adoptar?*
                                </label>
                                <textarea
                                    id="motivation"
                                    rows="4"
                                    placeholder="Cuéntanos tus motivaciones"
                                    className={`adopt-form__textarea ${errors.motivation ? 'adopt-form__textarea--error' : ''}`}
                                    {...register('motivation', {
                                        required: 'Por favor, comparte tu motivación',
                                        pattern: {
                                            value: /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s.,!?¿¡0-9]+$/,
                                            message: 'El mensaje contiene caracteres no válidos'
                                        },
                                        minLength: {
                                            value: 20,
                                            message: 'Por favor, proporciona más detalles (mínimo 20 caracteres)'
                                        }
                                    })}
                                />
                                {errors.motivation && (
                                    <span className="adopt-form__error">{errors.motivation.message}</span>
                                )}
                            </div>

                            <div className="adopt-form__field">
                                <label htmlFor="timeAvailable" className="adopt-form__label">
                                    ¿Cuánto tiempo puedes dedicar diariamente a tu mascota?*
                                </label>
                                <input
                                    type="text"
                                    id="timeAvailable"
                                    placeholder="Campo a rellenar"
                                    className={`adopt-form__input ${errors.timeAvailable ? 'adopt-form__input--error' : ''}`}
                                    {...register('timeAvailable', {
                                        required: 'Este campo es obligatorio'
                                    })}
                                />
                                {errors.timeAvailable && (
                                    <span className="adopt-form__error">{errors.timeAvailable.message}</span>
                                )}
                            </div>

                            <div className="adopt-form__field">
                                <label htmlFor="additionalPet" className="adopt-form__label">
                                    ¿Quieres adoptar a alguna mascota más?*
                                </label>
                                <input
                                    type="text"
                                    id="additionalPet"
                                    placeholder="Campo a rellenar"
                                    className={`adopt-form__input ${errors.additionalPet ? 'adopt-form__input--error' : ''}`}
                                    {...register('additionalPet', {
                                        required: 'Este campo es obligatorio'
                                    })}
                                />
                                {errors.additionalPet && (
                                    <span className="adopt-form__error">{errors.additionalPet.message}</span>
                                )}
                            </div>
                        </section>

                        {/* Términos y Condiciones */}
                        <section className="adopt-form__section">
                            <div className="adopt-form__checkbox-group">
                                <label className="adopt-form__checkbox">
                                    <input
                                        type="checkbox"
                                        className={`adopt-form__checkbox-input ${errors.acceptTerms ? 'adopt-form__checkbox-input--error' : ''}`}
                                        {...register('acceptTerms', {
                                            required: 'Debes aceptar los términos y condiciones'
                                        })}
                                    />
                                    <span className="adopt-form__checkbox-label">
                                        Acepto los términos y condiciones de adopción. *
                                    </span>
                                </label>
                                {errors.acceptTerms && (
                                    <span className="adopt-form__error">{errors.acceptTerms.message}</span>
                                )}
                            </div>

                            <div className="adopt-form__checkbox-group">
                                <label className="adopt-form__checkbox">
                                    <input
                                        type="checkbox"
                                        className="adopt-form__checkbox-input"
                                        {...register('acceptContact')}
                                    />
                                    <span className="adopt-form__checkbox-label">
                                        Acepto ser contactado para el seguimiento post-adopción.
                                    </span>
                                </label>
                            </div>
                        </section>

                        {/* Botón de Envío */}
                        <div className="adopt-form__submit">
                            <button type="submit" className="adopt-form__submit-btn">
                                Enviar
                            </button>
                        </div>
                    </form>

                    {/* Aviso legal */}
                    <footer className="adopt-page__footer">
                        <p className="adopt-page__legal">Aviso legal</p>
                    </footer>
                </div>
            </main>
        </div>
    );
};

export default AdoptPage;
