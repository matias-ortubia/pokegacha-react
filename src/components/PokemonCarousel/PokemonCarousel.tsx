import { useRef, useState } from "react";
import type { Pokemon } from "../../types/pokemon";
import { PokemonCard } from "../PokemonCard/PokemonCard";
import styles from "./PokemonCarousel.module.css";

interface PokemonCarouselProps {
    pkmnList: Pokemon[];
}

const SWIPE_THRESHOLD = 50;

export function PokemonCarousel({ pkmnList }: PokemonCarouselProps) {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const isFirstSlide = currentSlideIndex === 0;
    const isLastSlide = currentSlideIndex === pkmnList.length - 1;

    const goToPrev = () => setCurrentSlideIndex((index) => Math.max(0, index - 1));
    const goToNext = () => setCurrentSlideIndex((index) => Math.min(pkmnList.length - 1, index + 1));

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        const diffX = touchEndX.current - touchStartX.current;

        if (diffX > SWIPE_THRESHOLD) {
            goToPrev(); // swipe hacia la derecha
        } else if (diffX < -SWIPE_THRESHOLD) {
            goToNext(); // swipe hacia la izquierda
        }

        touchStartX.current = 0;
        touchEndX.current = 0;
    };

    return (
        <div className={styles.carousel}>
            {!isFirstSlide && (
                <button className={`${styles.carouselBtn} ${styles.prev}`} onClick={goToPrev} aria-label="Anterior">
                    &lt;
                </button>
            )}

            <div
                className={styles.carouselTrackContainer}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div
                    className={styles.carouselTrack}
                    style={{ transform: `translateX(-${currentSlideIndex * 100}%)` }}
                >
                    {pkmnList.map((pkmn, index) => (
                        <div className={styles.carouselSlide} key={`${pkmn.id}-${index}`}>
                            <PokemonCard pkmn={pkmn} />
                        </div>
                    ))}
                </div>
            </div>

            {!isLastSlide && (
                <button className={`${styles.carouselBtn} ${styles.next}`} onClick={goToNext} aria-label="Siguiente">
                    &gt;
                </button>
            )}

            <div className={styles.carouselDots}>
                {pkmnList.map((_, index) => (
                    <span
                        key={index}
                        className={`${styles.carouselDot} ${index === currentSlideIndex ? styles.active : ""}`}
                    />
                ))}
            </div>
        </div>
    );
}
