"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import Image from "next/image";
import Button from "../Button/Button";
import styles from "./ProductCard.module.scss";

interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  price?: string;
  buyUrl?: string;
  productUrl?: string;
  color?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  description,
  imageUrl,
  price,
  buyUrl = "#",
  productUrl = "#",
  color = "#27AE60",
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [customerData, setCustomerData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Estados para validación
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");

  const cardRef = useRef<HTMLDivElement>(null);
  const isMouseInside = useRef(false);

  const maxLength = 100;
  const shouldTruncate = description.length > maxLength;

  const truncatedDescription = shouldTruncate
    ? description.substring(0, maxLength) + "..."
    : description;

  // Regex para validación de email
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Validar email en tiempo real
  const validateEmail = (email: string) => {
    if (!email) {
      setEmailError("");
      return false;
    }

    if (!emailRegex.test(email)) {
      setEmailError("Por favor ingresa un email válido");
      return false;
    }

    setEmailError("");
    return true;
  };

  // Validar nombre en tiempo real
  const validateName = (name: string) => {
    if (!name) {
      setNameError("");
      return false;
    }

    if (name.trim().length < 2) {
      setNameError("El nombre debe tener al menos 2 caracteres");
      return false;
    }

    setNameError("");
    return true;
  };

  // Limpiar el estado cuando el modal se cierre
  const closeModal = useCallback(() => {
    setShowCustomerModal(false);
    setCustomerData({
      name: "",
      email: "",
      phone: "",
    });
    // Limpiar errores
    setEmailError("");
    setNameError("");
  }, []);

  // Limpiar el estado cuando el componente se desmonte o cambie
  useEffect(() => {
    return () => {
      // Cleanup al desmontar el componente
      setShowCustomerModal(false);
      setCustomerData({
        name: "",
        email: "",
        phone: "",
      });
    };
  }, []);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  // Manejar eventos de mouse para prevenir comportamientos no deseados
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseEnter = () => {
      isMouseInside.current = true;
    };

    const handleMouseLeave = () => {
      isMouseInside.current = false;
    };

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Prevenir que el modal se abra si ya está abierto
  const handleBuyClick = useCallback(async () => {
    if (!buyUrl || buyUrl === "#" || showCustomerModal) return;

    // Mostrar modal para capturar datos del cliente
    setShowCustomerModal(true);
  }, [buyUrl, showCustomerModal]);

  const handleCustomerSubmit = useCallback(async () => {
    // Validar campos antes de enviar
    const isNameValid = validateName(customerData.name);
    const isEmailValid = validateEmail(customerData.email);

    if (!isNameValid || !isEmailValid) {
      return; // No continuar si hay errores de validación
    }

    setIsLoading(true);
    closeModal(); // Usar la función de cierre centralizada

    try {
      console.log("Iniciando proceso de pago para:", title);

      // Enviar datos en el formato que espera el backend
      const response = await fetch(
        "https://backend-aquiles.onrender.com/api/payments/create-preference",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            product: {
              id: id,
              name: title,
              description: description,
              price: parseFloat(
                price?.replace(/[^\d,]/g, "").replace(",", ".") || "0"
              ),
              image_url: imageUrl,
            },
            customer: {
              name: customerData.name,
              email: customerData.email,
              phone: customerData.phone,
            },
          }),
        }
      );

      console.log("Respuesta del backend:", response);
      console.log("Status:", response.status);
      console.log("StatusText:", response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error del backend:", errorText);
        throw new Error(
          `Error del backend: ${response.status} ${response.statusText} - ${errorText}`
        );
      }

      const data = await response.json();
      console.log("Datos recibidos del backend:", data);

      // 2. Redirigir a MercadoPago usando init_point
      if (data.init_point) {
        console.log(
          "Redirigiendo a MercadoPago con init_point:",
          data.init_point
        );
        window.location.href = data.init_point;
      } else if (data.initPoint) {
        console.log(
          "Redirigiendo a MercadoPago con initPoint:",
          data.initPoint
        );
        window.location.href = data.initPoint;
      } else {
        console.warn(
          "No se recibió init_point del backend, usando URL original"
        );
        console.warn("Datos recibidos:", data);
        window.open(buyUrl, "_blank");
      }
    } catch (error) {
      console.error("Error completo al procesar el pago:", error);

      // Mostrar error más específico
      if (error instanceof Error) {
        if (error.message.includes("Failed to fetch")) {
          alert(
            "Error de conexión: No se pudo conectar con el servidor. Verifica tu conexión a internet."
          );
        } else if (error.message.includes("Error del backend")) {
          alert(`Error del servidor: ${error.message}`);
        } else {
          alert(`Error inesperado: ${error.message}`);
        }
      } else {
        alert("Error desconocido al procesar el pago");
      }

      // Fallback: usar la URL original en caso de error
      console.log("Usando fallback a URL original:", buyUrl);
      window.open(buyUrl, "_blank");
    } finally {
      setIsLoading(false);
    }
  }, [
    customerData,
    closeModal,
    title,
    id,
    description,
    price,
    imageUrl,
    buyUrl,
  ]);

  // Memoizar el modal para evitar re-renders innecesarios
  const modalElement = useMemo(() => {
    if (!showCustomerModal) return null;

    return (
      <div className={styles.customerModal} key={`modal-${id}`}>
        <div className={styles.modalContent}>
          <h3>Datos de Contacto</h3>
          <p>Completa tus datos para recibir el producto</p>

          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Tu nombre completo"
              value={customerData.name}
              onChange={(e) => {
                const newName = e.target.value;
                setCustomerData({ ...customerData, name: newName });
                validateName(newName);
              }}
              onBlur={(e) => validateName(e.target.value)}
              className={nameError ? styles.inputError : ""}
              required
            />
            {nameError && (
              <span className={styles.errorMessage}>{nameError}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <input
              type="email"
              placeholder="tu@email.com"
              value={customerData.email}
              onChange={(e) => {
                const newEmail = e.target.value;
                setCustomerData({ ...customerData, email: newEmail });
                validateEmail(newEmail);
              }}
              onBlur={(e) => validateEmail(e.target.value)}
              className={emailError ? styles.inputError : ""}
              required
            />
            {emailError && (
              <span className={styles.errorMessage}>{emailError}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <input
              type="tel"
              placeholder="Tu teléfono (opcional)"
              value={customerData.phone}
              onChange={(e) =>
                setCustomerData({ ...customerData, phone: e.target.value })
              }
            />
          </div>

          <div className={styles.modalButtons}>
            <Button variant="accent" onClick={closeModal}>
              Cancelar
            </Button>
            <Button
              variant="secondary"
              onClick={handleCustomerSubmit}
              disabled={
                !customerData.name ||
                !customerData.email ||
                isLoading ||
                !!nameError ||
                !!emailError
              }
            >
              Pagar
            </Button>
          </div>
        </div>
      </div>
    );
  }, [
    showCustomerModal,
    customerData,
    isLoading,
    id,
    closeModal,
    handleCustomerSubmit,
    nameError,
    emailError,
  ]);

  return (
    <div
      className={`${styles.card} ${showCustomerModal ? styles.modalOpen : ""}`}
      ref={cardRef}
    >
      <div className={styles.imageContainer}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            className={styles.image}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "contain" }}
          />
        ) : (
          <div
            className={styles.placeholderImage}
            style={{ backgroundColor: color }}
          >
            <span className={styles.placeholderText}>
              {title.split(" ")[0]}
            </span>
          </div>
        )}
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>

        <div className={styles.descriptionContainer}>
          <p className={styles.description}>
            {isExpanded ? description : truncatedDescription}
          </p>
          {shouldTruncate && (
            <button onClick={toggleDescription} className={styles.expandButton}>
              {isExpanded ? "Ver menos" : "Ver más"}
            </button>
          )}
        </div>

        {price && <div className={styles.price}>${price}</div>}

        <div className={styles.buttonContainer}>
          {productUrl && (
            <Button
              variant="primary"
              size="medium"
              href={productUrl}
              className={styles.viewButton}
            >
              Ver más
            </Button>
          )}

          {buyUrl && (
            <Button
              variant="secondary"
              size="medium"
              onClick={handleBuyClick}
              className={styles.buyButton}
              disabled={isLoading}
            >
              {isLoading ? "Procesando..." : "Comprar"}
            </Button>
          )}
        </div>
      </div>
      {modalElement}
    </div>
  );
};

export default ProductCard;
