import { anyColorToHex } from "./../misc.js";
export class Grid {
    colorPicker;
    /**
     * The html element containing all the colors that the user can select.
     */
    gridContainer;
    /**
     * The colors for the first row of the grid (white to black).
     */
    colorRow;
    /**
     * The colors for the columns of the grid.
     */
    colorColumns;
    /**
     * The elements of the first row of the grid. The elements colors correspond to "colorRow".
     */
    elementRow;
    /**
     * The elements of the columns of the grid. The elements correspond INDIRECTLY to "colorColumns";
     */
    elementColumns;
    /**
     * The currently selected element. It can ba null since other colors that are not in the grid can be selected as well.
     */
    selectedElement;
    /**
     * The color that was last selected in hex format ("#xxxxxx").
     */
    selectedColor;
    constructor(colorPicker) {
        this.colorPicker = colorPicker;
        this.gridContainer = document.getElementById("color picker grid colors");
        this.colorRow = [];
        this.colorColumns = [];
        this.elementRow = [];
        this.elementColumns = [];
        this.selectedElement = null;
        this.selectedColor = "#000000";
        this.fillColorArrays();
        this.createGrid();
        this.selectElement(this.elementRow[11]); // black
    }
    /**
     * Fills "colorRow" and "colorColumns" with predefined values.
     */
    fillColorArrays() {
        // Tailwind CSS: "slate-50" to "slate-950" and "black" // 0
        this.colorRow = ["#ffffff", "#f1f5f9", "#e2e8f0", "#cbd5e1", "#94a3b8", "#64748b", "#475569", "#334155", "#1e293b", "#0f172a", "#020617", "#000000"];
        // Tailwind CSS: "cyan-50" to "cyan-950" // 1
        this.colorColumns.push(["#ecfeff", "#cffafe", "#a5f3fc", "#67e8f9", "#22d3ee", "#06b6d4", "#0891b2", "#0e7490", "#155e75", "#164e63", "#083344"].reverse());
        // Tailwind CSS: "blue-50" to "blue-950" // 2
        this.colorColumns.push(["#eff6ff", "#dbeafe", "#bfdbfe", "#93c5fd", "#60a5fa", "#3b82f6", "#2563eb", "#1d4ed8", "#1e40af", "#1e3a8a", "#172554"].reverse());
        // Tailwind CSS: "violet-50" to "violet-950" // 3
        this.colorColumns.push(["#f5f3ff", "#ede9fe", "#ddd6fe", "#c4b5fd", "#a78bfa", "#8b5cf6", "#7c3aed", "#6d28d9", "#5b21b6", "#4c1d95", "#2e1065"].reverse());
        // Tailwind CSS: "fuchsia-50" to "fuchsia-950" // 4
        this.colorColumns.push(["#fdf4ff", "#fae8ff", "#f5d0fe", "#f0abfc", "#e879f9", "#d946ef", "#c026d3", "#a21caf", "#86198f", "#701a75", "#4a044e"].reverse());
        // Tailwind CSS: "pink-50" to "pink-950" // 5
        this.colorColumns.push(["#fdf2f8", "#fce7f3", "#fbcfe8", "#f9a8d4", "#f472b6", "#ec4899", "#db2777", "#be185d", "#9d174d", "#831843", "#500724"].reverse());
        // Tailwind CSS: "red-50" to "red-950" // 6
        this.colorColumns.push(["#fef2f2", "#fee2e2", "#fecaca", "#fca5a5", "#f87171", "#ef4444", "#dc2626", "#b91c1c", "#991b1b", "#7f1d1d", "#450a0a"].reverse());
        // Tailwind CSS: "orange-50" to "orange-950" // 7
        this.colorColumns.push(["#fff7ed", "#ffedd5", "#fed7aa", "#fdba74", "#fb923c", "#f97316", "#ea580c", "#c2410c", "#9a3412", "#7c2d12", "#431407"].reverse());
        // Tailwind CSS: "amber-50" to "amber-950" // 8
        this.colorColumns.push(["#fffbeb", "#fef3c7", "#fde68a", "#fcd34d", "#fbbf24", "#f59e0b", "#d97706", "#b45309", "#92400e", "#78350f", "#451a03"].reverse());
        // Tailwind CSS: "yellow-50" to "yellow-950" // 9
        this.colorColumns.push(["#fefce8", "#fef9c3", "#fef08a", "#fde047", "#facc15", "#eab308", "#ca8a04", "#a16207", "#854d0e", "#713f12", "#422006"].reverse());
        // Tailwind CSS: "lime-50" to "lime-950" // 10
        this.colorColumns.push(["#f7fee7", "#ecfccb", "#d9f99d", "#bef264", "#a3e635", "#84cc16", "#65a30d", "#4d7c0f", "#3f6212", "#365314", "#1a2e05"].reverse());
        // Tailwind CSS: "green-50" to "green-950" // 11
        this.colorColumns.push(["#f0fdf4", "#dcfce7", "#bbf7d0", "#86efac", "#4ade80", "#22c55e", "#16a34a", "#15803d", "#166534", "#14532d", "#052e16"].reverse());
        // Tailwind CSS: "emerald-50" to "emerald-950" // 12
        this.colorColumns.push(["#ecfdf5", "#d1fae5", "#a7f3d0", "#6ee7b7", "#34d399", "#10b981", "#059669", "#047857", "#065f46", "#064e3b", "#022c22"].reverse());
    }
    /**
     * Creates the html elements and adds them to "gridContainer".
     */
    createGrid() {
        // Row:
        for (const color of this.colorRow) {
            const el = document.createElement("div");
            el.style.backgroundColor = color;
            this.gridContainer.appendChild(el);
            el.className = "w-full aspect-square";
            el.onclick = () => {
                this.colorOnClick(el);
            };
            this.elementRow.push(el);
        }
        // Columns:
        for (let i = 0; i < this.colorColumns[i].length; i++) {
            const subArray = [];
            this.elementColumns.push(subArray);
            for (let j = 0; j < this.colorColumns.length; j++) {
                const el = document.createElement("div");
                el.style.backgroundColor = this.colorColumns[j][i];
                this.gridContainer.appendChild(el);
                el.className = "w-full aspect-square";
                el.onclick = () => {
                    this.colorOnClick(el);
                };
                subArray.push(el);
            }
        }
    }
    /**
     * What happens when zhe user clicks on a color:
     *  - un-mark the currently selected color
     *  - mark the new one
     *  - set the element to be "selectedElement"
     *  - sets the "selectedColor"
     *  - calls the color picker to synchronize the colors across all menus.
     * @param el The element that was clicked.
     */
    colorOnClick(el) {
        // Mark the element "el" as selected.
        this.selectElement(el);
        this.selectedColor = anyColorToHex(el.style.backgroundColor);
        this.colorPicker.changeActiveColor(el.style.backgroundColor);
    }
    /**
     * Marks the passed element as selected and unselects the currently selected element (unless it is null).
     * Also sets "selectedElement" to "el".
     * @param el The element to select.
     */
    selectElement(el) {
        // Mark the element as selected.
        el.className = el.className + " border-2 border-black";
        // Un-mark the previously selected element.
        if (this.selectedElement !== null) {
            this.unselectElement(this.selectedElement);
        }
        this.selectedElement = el;
    }
    /**
     * Stops an element from being marked as selected. The element should already be marked otherwise the elements class will corrupt.
     * @param el The element to be unselected.
     */
    unselectElement(el) {
        el.className = el.className.substring(0, el.className.length - " border-2 border-black".length);
    }
    setColor(color) {
        if (this.selectedColor === color) {
            return;
        }
        this.selectedColor = color;
        for (let i = 0; i < this.colorRow.length; i++) {
            if (this.colorRow[i] === color) {
                this.selectElement(this.elementRow[i]);
                return;
            }
        }
        for (let i = 0; i < this.colorColumns.length; i++) {
            for (let j = 0; j < this.colorColumns[i].length; j++) {
                if (this.colorColumns[i][j] === color) {
                    this.selectElement(this.elementColumns[j][i]);
                    return;
                }
            }
        }
        if (this.selectedElement !== null) {
            this.unselectElement(this.selectedElement);
        }
    }
}
