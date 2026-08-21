import type { SortOption } from "../../types/pokemon";
import styles from "./SortControls.module.css";

interface SortControlsProps {
    onSortChange: (option: SortOption) => void;
}

export function SortControls({ onSortChange }: SortControlsProps) {
    return (
        <div className={styles.listControlsContainer}>
            <div className="sortingContainer">
                <select
                    id="sortingSelector"
                    className={styles.sortingSelector}  
                    defaultValue=""
                    onChange={(e) => {
                        const value = e.target.value as SortOption | "";
                        if (value) onSortChange(value);
                    }}
                >
                    <option className={styles.sortingOption} value="">Sort by</option>
                    <option className={styles.sortingOption} value="byId">ID</option>
                    <option className={styles.sortingOption} value="byType">Type</option>
                    <option className={styles.sortingOption} value="byName">Name</option>
                    <option className={styles.sortingOption} value="byObtainedDate">Obtained Date</option>
                </select>
            </div>
        </div>
    );
}
