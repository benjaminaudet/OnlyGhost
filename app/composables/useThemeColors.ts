const colors = [
  '#f87171',
  '#fb923c',
  '#fbbf24',
  '#facc15',
  '#a3e635',
  '#4ade80',
  '#34d399',
  '#2dd4bf',
  '#22d3ee',
  '#38bdf8',
  '#60a5fa',
  '#818cf8',
  '#a78bfa',
  '#c084fc',
  '#e879f9',
  '#f472b6',
  '#fb7185',
];

interface ThemeColorsOptions {
  /** Use random colors from palette instead of fixed colors */
  useRandomColors?: boolean;
  /** Fixed primary color (only used when useRandomColors is false) */
  fixedColor?: string;
  /** Fixed accent color (only used when useRandomColors is false) */
  fixedAccentColor?: string;
}

export const useThemeColors = (options: ThemeColorsOptions = {}) => {
  const {
    useRandomColors = false,
    fixedColor = '#3b82f6', // Medium blue
    fixedAccentColor = '#10b981', // Emerald green
  } = options;

  // Convert hex to RGB for CSS variables
  function hexToRgb(hex: string): string | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result && result[1] && result[2] && result[3]
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
          result[3],
          16
        )}`
      : null;
  }

  let primaryColor: string;
  let primaryColorRgb: string;
  let secondaryColor: string;
  let secondaryColorRgb: string;

  if (useRandomColors) {
    // Random color logic (for landing page)
    const colorIndex = Math.floor(Math.random() * colors.length);
    primaryColor = colors[colorIndex]!;
    primaryColorRgb = hexToRgb(primaryColor) || '75, 85, 99';

    const accentColorIndex = (colorIndex + 8) % colors.length;
    secondaryColor = colors[accentColorIndex]!;
    secondaryColorRgb = hexToRgb(secondaryColor) || '16, 185, 129';
  } else {
    // Fixed color logic (for about page)
    primaryColor = fixedColor;
    primaryColorRgb = hexToRgb(fixedColor) || '59, 130, 246';
    secondaryColor = fixedAccentColor;
    secondaryColorRgb = hexToRgb(fixedAccentColor) || '16, 185, 129';
  }

  const color = useState('color', () => primaryColor);
  const colorRgb = useState('colorRgb', () => primaryColorRgb);
  const accentColor = useState('accentColor', () => secondaryColor);
  const accentColorRgb = useState('accentColorRgb', () => secondaryColorRgb);

  return {
    color,
    colorRgb,
    accentColor,
    accentColorRgb,
  };
};
