"use client";

import React from "react";
import Image from "next/image";
import styles from "./AboutUs.module.scss";

const AboutUs: React.FC = () => {
    return (
        <section id="about" className={styles.aboutUs}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.textContent}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.title}>Sobre Aquiles Conecta</h2>
                        </div>

                        <div className={styles.description}>
                            <p>
                                Aquiles Conecta nació como un puente entre Ángeles y su comunidad,
                                con el deseo de compartir recursos que generan bienestar, aprendizaje y transformación.
                                Hoy, es una plataforma con títulos seleccionados cuidadosamente, asegurando propuestas originales y de gran valor literario.
                            </p>

                            <p>
                                Cada recomendación refleja una búsqueda personal, una conexión auténtica
                                y un compromiso con el valor que cada contenido puede aportar.
                                Aquiles Conecta no vende, acompaña. No promociona, comparte.
                            </p>
                        </div>

                    </div>

                    <div className={styles.visualContent}>
                        <div className={styles.imageContainer}>
                            <Image
                                src="/images/AquilesLogo.png"
                                alt="Aquiles Conecta"
                                width={400}
                                height={167}
                                className={styles.mainImage}
                                priority
                            />
                            <div className={styles.floatingElement}>
                                <div className={styles.statsCard}>
                                    <div className={styles.statNumber}>1000+</div>
                                    <div className={styles.statLabel}>Recursos</div>
                                </div>
                            </div>
                            <div className={styles.floatingElement}>
                                <div className={styles.statsCard}>
                                    <div className={styles.statNumber}>24/7</div>
                                    <div className={styles.statLabel}>Disponible</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs; 