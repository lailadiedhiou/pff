
import React, { useState, useEffect } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const slides = [
        {
            img: "src/images/image.png", // Remplace avec ton chemin d'image
            title: "Bienvenue sur notre Plateforme",
            description: "Dites adieu aux supermarchés ! Avec notre plateforme, achetez directement auprès des agriculteurs locaux. Profitez de produits de qualité, livrés directement chez vous, tout en contribuant à l'économie locale.",
        },
        {
            img: "src/images/1694210353853.png", // Remplace avec ton chemin d'image
            title: "Produits Locaux de Qualité",
            description: "Explorez une sélection de fruits, légumes et produits du terroir, soigneusement cultivés par nos agriculteurs partenaires. Notre marketplace en ligne vous offre une connexion directe avec ceux qui nourrissent notre monde.",
        },
        {
            img: "src/images/image3.png", // Remplace avec ton chemin d'image
            title: "Soutenez l'Agriculture Locale",
            description: "Rejoignez notre plateforme dédiée aux agriculteurs et consommateurs soucieux de l'environnement. Découvrez des produits frais et locaux, tout en soutenant les agriculteurs de votre région. Ensemble, bâtissons un avenir durable.",
        },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(interval);
    }, [slides.length]);

    const categories = [
        { title: "Super Healthy", image: "src/images/image6.png" },
        { title: "Fresh Vegetables", image: "src/images/image7.png" },
        { title: "Fresh Fruits", image: "src/images/image9.png" },
        { title: "100% Organic", image: "src/images/image10.png" },
    ];
    const testimonials = [
        {
          //image: profile1,
          quote: "Marché Agricole m'a permis de découvrir des produits frais et de qualité directement des agriculteurs locaux. Je recommande vivement !",
          name: "Aïssatou Ndiaye",
          position: "Client satisfaite"
        },
        {
          //image: profile2,
          quote: "Une plateforme pratique pour commander en ligne et soutenir les agriculteurs de notre région.",
          name: "Mamadou Diop",
          position: "Client régulier"
        },
        {
          //image: profile3,
          quote: "Une expérience d'achat agréable avec des produits de saison et des prix abordables.",
          name: "Fatou Sylla",
          position: "Nouvelle cliente"
        }
      ];
      
    return (
      <div className="home">
        <section className="hero-section">
            <div className="slide">
                <div className="text-container">
                    <h1>{slides[currentSlide].title}</h1>
                    <p>{slides[currentSlide].description}</p>
                    <Link to="/market" className="cta-button">Explorez le Marché</Link>
                </div>
                <div className="image-container">
                    <img src={slides[currentSlide].img} alt={slides[currentSlide].title} />
                </div>
            </div>
        </section>

  
        <section className="features-section">
          <div className="feature">
            <h2>Vendez vos Produits</h2>
            <p>Les agriculteurs peuvent facilement mettre en ligne leurs produits et atteindre de nouveaux clients.</p>
          </div>
          <div className="feature">
            <h2>Achetez Directement</h2>
            <p>Les consommateurs peuvent découvrir une large gamme de produits frais et locaux, en un seul clic.</p>
          </div>
          <div className="feature">
            <h2>Gérez vos Commandes</h2>
            <p>Accédez à votre tableau de bord pour gérer vos achats ou ventes en toute simplicité.</p>
          </div>
        </section>
        {/* Nouvelle section avec une image à gauche et texte à droite */}
        <section className="image-text-section">
            <div className="image-container">
            <img src="src\images\flxTA-20180917162335-1701701579173702202001161222060.png" alt="Agriculteurs" />
            </div>
            <div className="text-container">
            <h2>Découvrez des Produits Locaux Frais</h2>
            <p>
                Nous connectons les agriculteurs locaux avec les consommateurs et les commerçants.
                Découvrez une grande variété de produits frais directement depuis les fermes, sans intermédiaires. 
                Aidez à soutenir l'agriculture locale et profitez de produits de qualité supérieure.
            </p>
            <a href="/market" className="cta-button">Voir les Produits</a>
            </div>
        </section>
        {/* Nouvelle section vidéo */}
        <section className="category-section">
            {categories.map((category, index) => (
                <div key={index} className="category-item">
                    <img src={category.image} alt={category.title} />
                    <h3>{category.title}</h3>
                </div>
            ))}
        </section>
            {/* Nouvelle Section Témoignages */}
            <section className="testimonials">
                <div className="testimonials-container">
                    <h2 className="section-title">Témoignages</h2>
                    <div className="testimonials-grid">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="testimonial-card">
                        <img src={testimonial.image} alt={`${testimonial.name}`} className="testimonial-image" />
                        <p className="testimonial-quote">"{testimonial.quote}"</p>
                        <h4 className="testimonial-name">{testimonial.name}</h4>
                        <span className="testimonial-position">{testimonial.position}</span>
                        </div>
                    ))}
                    </div>
                </div>
            </section>

            {/* Nouvelle Section d'Inscription/Appel à l'action */}
            <section id="contact" className="contact-section">
              <div className="contact-form-container">
                <h2 className="contact-title">Contactez-nous</h2>
                <p className="contact-description">
                  Pour toute question ou information, n'hésitez pas à nous contacter en utilisant le formulaire ci-dessous.
                </p>
                <form className="contact-form">
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="Votre nom" required />
                  </div>
                  <div className="form-group">
                    <input type="email" className="form-control" placeholder="Votre email" required />
                  </div>
                  <div className="form-group">
                    <textarea className="form-control" rows="5" placeholder="Votre message" required></textarea>
                  </div>
                  <button type="submit" className="contact-submit-btn">Envoyer le message</button>
                </form>
              </div>
              <div className="contact-image-container">
                <img src="src/images/undraw_undraw_chatting_lt27_d787 (1).png" alt="Contact illustration" className="contact-image" />
              </div>
            </section>

      </div>
    );
  };
  
export default HomePage;