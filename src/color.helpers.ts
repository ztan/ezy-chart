import * as _ from 'lodash';

const DEFAULT_COLORS = [
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
	[128, 128, 128]
];

export interface ColorGroup {
	backgroundColor?: Chart.ChartColor;
	borderColor?: Chart.ChartColor;

	pointBackgroundColor?: Chart.ChartColor;
	pointBorderColor?: Chart.ChartColor;
	pointHoverBackgroundColor?: Chart.ChartColor;
	pointHoverBorderColor?: Chart.ChartColor;
}

function generateColors(definedColors: string[], totalNum: number): number[][] {
	let defaultIdx = 0;
	const colors: number[][] = [];
	if (definedColors.length < totalNum) {
		definedColors = _.concat(definedColors, new Array<string>(totalNum - definedColors.length));
	}
	_.each(definedColors, (val, i) => {
		let col = DEFAULT_COLORS[defaultIdx++];
		if (!col) {
			col = getRandomColor();
		}
		colors.push(col);
	});
	return colors;
}

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
				parseInt(m[1].charAt(2), 16) * 0x11
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

function rgba(colour: number[], alpha: number): string {
	return 'rgba(' + colour.concat(alpha).join(',') + ')';
}

function getRandomInt(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor() {
	return [getRandomInt(0, 255), getRandomInt(0, 255), getRandomInt(0, 255)];
}

function formatChartColorsForSeries(colors: number[][], type: string): ColorGroup[] {
	return colors.map(color => ({
		backgroundColor: rgba(color, 0.6),
		borderColor: type === 'line' ? rgba(color, 0.6) : '#fff',
		pointBackgroundColor: rgba(color, 0.6),
		pointBorderColor: '#fff',
		pointHoverBackgroundColor: rgba(color, 1),
		pointHoverBorderColor: rgba(color, 0.8)
	}));
}

export function generateColorsBySeries(definedColors: string[], totalNum: number, type: string): ColorGroup[] {
	return formatChartColorsForSeries(generateColors(definedColors || [], totalNum), type);
}

function formatChartColorsForData(colors: number[][], type: string): ColorGroup {
	return {
		backgroundColor: colors.map(color => rgba(color, 0.6)),
		borderColor: colors.map(color => (type === 'line' ? rgba(color, 0.6) : '#fff')),
		pointBackgroundColor: colors.map(color => rgba(color, 1)),
		pointBorderColor: colors.map(color => '#fff'),
		pointHoverBackgroundColor: colors.map(color => rgba(color, 1)),
		pointHoverBorderColor: colors.map(color => rgba(color, 0.8))
	};
}

export function generateColorsByDataPoints(definedColors: string[], totalNum: number, type: string): ColorGroup {
	return formatChartColorsForData(generateColors(definedColors || [], totalNum), type);
}
