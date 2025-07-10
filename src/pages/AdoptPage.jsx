import React from 'react';
import { useForm } from 'react-hook-form';
import './AdoptPage.css';

const AdoptPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = (data) => {
    console.log('Datos del formulario:', data);
    // Aquí iría la lógica para enviar los datos
    alert('¡Solicitud de adopción enviada exitosamente!');
    reset();
  };

  return (
    <div className="adopt-page">
      {/* Header */}
      <header className="adopt-header">
        <div className="logo">
          <h1>Pelusa Society</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="adopt-main">
        <div className="adopt-container">
          <div className="adopt-intro">
            <h2>¡Adopta una mascota!</h2>
            <p>
              Completa este formulario para comenzar el proceso de adopción. 
              Nos pondremos en contacto contigo para coordinar una visita y 
              conocer a tu nueva mascota.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="adopt-form">
            {/* Información Personal */}
            <section className="form-section">
              <h3>Información Personal</h3>
              
              <div className="form-group">
                <label htmlFor="fullName">Nombre Completo *</label>
                <input
                  type="text"
                  id="fullName"
                  {...register('fullName', {
                    required: 'El nombre completo es obligatorio',
                    minLength: {
                      value: 2,
                      message: 'El nombre debe tener al menos 2 caracteres'
                    }
                  })}
                  className={errors.fullName ? 'error' : ''}
                />
                {errors.fullName && (
                  <span className="error-message">{errors.fullName.message}</span>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Correo Electrónico *</label>
                  <input
                    type="email"
                    id="email"
                    {...register('email', {
                      required: 'El correo electrónico es obligatorio',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Correo electrónico inválido'
                      }
                    })}
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && (
                    <span className="error-message">{errors.email.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Teléfono *</label>
                  <input
                    type="tel"
                    id="phone"
                    {...register('phone', {
                      required: 'El teléfono es obligatorio',
                      pattern: {
                        value: /^[0-9+\-\s()]+$/,
                        message: 'Formato de teléfono inválido'
                      }
                    })}
                    className={errors.phone ? 'error' : ''}
                  />
                  {errors.phone && (
                    <span className="error-message">{errors.phone.message}</span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="address">Dirección Completa *</label>
                <textarea
                  id="address"
                  rows="3"
                  {...register('address', {
                    required: 'La dirección es obligatoria',
                    minLength: {
                      value: 10,
                      message: 'La dirección debe ser más específica'
                    }
                  })}
                  className={errors.address ? 'error' : ''}
                />
                {errors.address && (
                  <span className="error-message">{errors.address.message}</span>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="age">Edad *</label>
                  <input
                    type="number"
                    id="age"
                    min="18"
                    max="100"
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
                    className={errors.age ? 'error' : ''}
                  />
                  {errors.age && (
                    <span className="error-message">{errors.age.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="occupation">Ocupación *</label>
                  <input
                    type="text"
                    id="occupation"
                    {...register('occupation', {
                      required: 'La ocupación es obligatoria'
                    })}
                    className={errors.occupation ? 'error' : ''}
                  />
                  {errors.occupation && (
                    <span className="error-message">{errors.occupation.message}</span>
                  )}
                </div>
              </div>
            </section>

            {/* Información de la Mascota */}
            <section className="form-section">
              <h3>Preferencias de Mascota</h3>
              
              <div className="form-group">
                <label htmlFor="petType">Tipo de Mascota *</label>
                <select
                  id="petType"
                  {...register('petType', {
                    required: 'Selecciona el tipo de mascota'
                  })}
                  className={errors.petType ? 'error' : ''}
                >
                  <option value="">Selecciona una opción</option>
                  <option value="gato">Gato</option>
                  <option value="perro">Perro</option>
                  <option value="cualquiera">Cualquiera</option>
                </select>
                {errors.petType && (
                  <span className="error-message">{errors.petType.message}</span>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="petAge">Edad Preferida</label>
                  <select
                    id="petAge"
                    {...register('petAge')}
                  >
                    <option value="">Sin preferencia</option>
                    <option value="cachorro">Cachorro/Gatito (0-1 año)</option>
                    <option value="joven">Joven (1-3 años)</option>
                    <option value="adulto">Adulto (3-7 años)</option>
                    <option value="senior">Senior (7+ años)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="petSize">Tamaño Preferido (para perros)</label>
                  <select
                    id="petSize"
                    {...register('petSize')}
                  >
                    <option value="">Sin preferencia</option>
                    <option value="pequeño">Pequeño</option>
                    <option value="mediano">Mediano</option>
                    <option value="grande">Grande</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Información del Hogar */}
            <section className="form-section">
              <h3>Información del Hogar</h3>
              
              <div className="form-group">
                <label htmlFor="housingType">Tipo de Vivienda *</label>
                <select
                  id="housingType"
                  {...register('housingType', {
                    required: 'Selecciona el tipo de vivienda'
                  })}
                  className={errors.housingType ? 'error' : ''}
                >
                  <option value="">Selecciona una opción</option>
                  <option value="casa">Casa</option>
                  <option value="apartamento">Apartamento</option>
                  <option value="otro">Otro</option>
                </select>
                {errors.housingType && (
                  <span className="error-message">{errors.housingType.message}</span>
                )}
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    {...register('hasYard')}
                  />
                  Tengo patio o jardín
                </label>
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    {...register('hasOtherPets')}
                  />
                  Tengo otras mascotas
                </label>
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    {...register('hasChildren')}
                  />
                  Tengo niños en casa
                </label>
              </div>
            </section>

            {/* Experiencia y Motivación */}
            <section className="form-section">
              <h3>Experiencia y Motivación</h3>
              
              <div className="form-group">
                <label htmlFor="experience">¿Has tenido mascotas antes? *</label>
                <select
                  id="experience"
                  {...register('experience', {
                    required: 'Selecciona tu experiencia'
                  })}
                  className={errors.experience ? 'error' : ''}
                >
                  <option value="">Selecciona una opción</option>
                  <option value="si">Sí, he tenido mascotas</option>
                  <option value="no">No, sería mi primera mascota</option>
                </select>
                {errors.experience && (
                  <span className="error-message">{errors.experience.message}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="motivation">¿Por qué quieres adoptar una mascota? *</label>
                <textarea
                  id="motivation"
                  rows="4"
                  placeholder="Cuéntanos tus motivaciones para adoptar..."
                  {...register('motivation', {
                    required: 'Por favor, comparte tu motivación',
                    minLength: {
                      value: 20,
                      message: 'Por favor, proporciona más detalles'
                    }
                  })}
                  className={errors.motivation ? 'error' : ''}
                />
                {errors.motivation && (
                  <span className="error-message">{errors.motivation.message}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="timeAvailable">¿Cuánto tiempo puedes dedicar diariamente a tu mascota? *</label>
                <select
                  id="timeAvailable"
                  {...register('timeAvailable', {
                    required: 'Selecciona el tiempo disponible'
                  })}
                  className={errors.timeAvailable ? 'error' : ''}
                >
                  <option value="">Selecciona una opción</option>
                  <option value="1-2">1-2 horas</option>
                  <option value="3-4">3-4 horas</option>
                  <option value="5-6">5-6 horas</option>
                  <option value="todo-el-dia">Todo el día</option>
                </select>
                {errors.timeAvailable && (
                  <span className="error-message">{errors.timeAvailable.message}</span>
                )}
              </div>
            </section>

            {/* Términos y Condiciones */}
            <section className="form-section">
              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    {...register('acceptTerms', {
                      required: 'Debes aceptar los términos y condiciones'
                    })}
                    className={errors.acceptTerms ? 'error' : ''}
                  />
                  Acepto los términos y condiciones de adopción *
                </label>
                {errors.acceptTerms && (
                  <span className="error-message">{errors.acceptTerms.message}</span>
                )}
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    {...register('acceptContact')}
                  />
                  Acepto ser contactado para seguimiento post-adopción
                </label>
              </div>
            </section>

            {/* Botón de Envío */}
            <div className="form-submit">
              <button type="submit" className="submit-btn">
                Enviar Solicitud de Adopción
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AdoptPage;

