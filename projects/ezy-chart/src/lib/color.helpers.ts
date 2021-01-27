/**
 * @internal
 */
const DEFAULT_COLORS = [
	[236, 64, 122],
	[92, 107, 192],
	[38, 198, 218],
	[255, 238, 88],
	[156, 204, 101],
	[0, 102, 204],
	[102, 153, 204],
	[102, 0, 204],
	[204, 102, 204],
	[204, 255, 204],
	[255, 0, 102],
	[255, 99, 132],
	[54, 162, 235],
	[255, 206, 86],
	[151, 187, 205],
	[220, 220, 220],
	[247, 70, 74],
	[70, 191, 189],
	[253, 180, 92],
	[148, 159, 177],
	[77, 83, 96],
	[230, 25, 75],
	[60, 180, 75],
	[255, 225, 25],
	[0, 130, 200],
	[245, 130, 48],
	[145, 30, 180],
	[70, 240, 240],
	[240, 50, 230],
	[210, 245, 60],
	[250, 190, 190],
	[0, 128, 128],
	[230, 190, 255],
	[170, 110, 40],
	[255, 250, 200],
	[128, 0, 0],
	[170, 255, 195],
	[128, 128, 0],
	[255, 215, 180],
	[0, 0, 128],
	[128, 128, 128],
];

/**
 * @internal
 */
export interface ColorGroup {
	backgroundColor?: Chart.ChartColor;
	borderColor?: Chart.ChartColor;

	pointBackgroundColor?: Chart.ChartColor;
	pointBorderColor?: Chart.ChartColor;
	pointHoverBackgroundColor?: Chart.ChartColor;
	pointHoverBorderColor?: Chart.ChartColor;
	hoverBackgroundColor?: Chart.ChartColor;
}

/**
 * @internal
 */
export function replaceDefaultColors(colors: number[][]) {
	(colors || []).forEach((a, i) => (DEFAULT_COLORS[i] = a));
}

/**
 * @internal
 */
function generateColors(definedColors: string[], totalNum: number): number[][] {
	let defaultIdx = 0;
	const colors: number[][] = [];
	if (definedColors.length < totalNum) {
		definedColors = [...definedColors, ...new Array<string>(totalNum - definedColors.length)];
	}
	definedColors.forEach((val) => {
		let col = parseColor(val);
		if (!col) {
			col = DEFAULT_COLORS[defaultIdx++] || getRandomColor();
		}
		colors.push(col);
	});
	return colors;
}

/**
 * @internal
 */
function parseColor(input: string): number[] | undefined {
	if (!input) {
		return undefined;
	}
	let m = input.match(/^#([0-9a-f]{6})$/i);
	if (m) {
		return [parseInt(m[1].substr(0, 2), 16), parseInt(m[1].substr(2, 2), 16), parseInt(m[1].substr(4, 2), 16)];
	} else {
		m = input.match(/^#([0-9a-f]{3})$/i);
		if (m) {
			return [
				parseInt(m[1].charAt(0), 16) * 0x11,
				parseInt(m[1].charAt(1), 16) * 0x11,
				parseInt(m[1].charAt(2), 16) * 0x11,
			];
		} else {
			m = input.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
			if (m) {
				return [parseInt(m[1], 10), parseInt(m[2], 10), parseInt(m[3], 10)];
			} else {
				console.error('Color ' + input + ' could not be parsed.');
				return undefined;
			}
		}
	}
}

/**
 * @internal
 */
export function generateColorsAsStrings(definedColors: string[], totalNum: number): string[] {
	return generateColors(definedColors, totalNum).map((c) => `rgba(${c[0]}, ${c[1]}, ${c[2]}, 0.8)`);
}

/**
 * @internal
 */
function rgba(colour: number[], alpha: number): string {
	return 'rgba(' + colour.concat(alpha).join(',') + ')';
}

/**
 * @internal
 */
function getRandomInt(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * @internal
 */
function getRandomColor() {
	return [getRandomInt(0, 255), getRandomInt(0, 255), getRandomInt(0, 255)];
}

/**
 * @internal
 */
function formatChartColorsForSeries(colors: number[][], type: string): ColorGroup[] {
	return colors.map((color) => ({
		hoverBackgroundColor: rgba(color, 0.6),
		backgroundColor: rgba(color, 1),
		borderColor: type === 'line' ? rgba(color, 0.6) : 'rgba(255, 255, 255, 0.3)',
		pointBackgroundColor: rgba(color, 0.6),
		pointBorderColor: '#fff',
		pointHoverBackgroundColor: rgba(color, 1),
		pointHoverBorderColor: rgba(color, 0.8),
	}));
}

/**
 * @internal
 */
export function generateColorsBySeries(definedColors: string[], totalNum: number, type: string): ColorGroup[] {
	return formatChartColorsForSeries(generateColors(definedColors || [], totalNum), type);
}

/**
 * @internal
 */
function formatChartColorsForData(colors: number[][], type: string): ColorGroup {
	return {
		hoverBackgroundColor: colors.map((color) => rgba(color, 0.6)),
		backgroundColor: colors.map((color) => rgba(color, 1)),
		borderColor: colors.map((color) => (type === 'line' ? rgba(color, 0.6) : 'rgba(255, 255, 255, 0.3)')),
		pointBackgroundColor: colors.map((color) => rgba(color, 1)),
		pointBorderColor: colors.map((color) => '#fff'),
		pointHoverBackgroundColor: colors.map((color) => rgba(color, 1)),
		pointHoverBorderColor: colors.map((color) => rgba(color, 0.8)),
	};
}

/**
 * @internal
 */
export function generateColorsByDataPoints(definedColors: string[], totalNum: number, type: string): ColorGroup {
	return formatChartColorsForData(generateColors(definedColors || [], totalNum), type);
}
