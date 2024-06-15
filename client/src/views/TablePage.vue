<script setup>
import SetPanel from '@/components/SetPanel.vue';
import TableTrade from '@/components/TableTrade.vue';

import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5stock from "@amcharts/amcharts5/stock";
import am5dark from '@amcharts/amcharts5/themes/Dark';
import am5animated from '@amcharts/amcharts5/themes/Animated';
import { shallowRef, onMounted } from 'vue';
//import {storeToRefs} from "pinia";
import { useRouter, useRoute } from "vue-router";
//import {useChartStore} from '@/stores/chart.js';
//const data = storeToRefs(useChartStore());
const router = useRouter();
const route = useRoute();

let root;
const chartdiv = shallowRef(null);
onMounted(() => {
	// ============
	// ROOT ELEMENT
	// ============
	root = am5.Root.new(chartdiv.value);
	// =============
	// my THEME RULE
	// =============
	const myTheme = am5.Theme.new(root);
	myTheme.rule("AxisLabel").setAll({
		fill: am5.color(0xffffff),
		fontSize: 10
	});
	myTheme.rule("AxisRenderer").setAll({
		stroke: am5.color(0x008000),
		strokeOpacity: 1,
		//strokeDasharray: [2, 2],
		strokeWidth: 1
	});
	myTheme.rule("Grid").setAll({
		strokeOpacity: 1,
		stroke: am5.color(0x696969),
		strokeDasharray: [5, 1],
		strokeWidth: 0.2
	});
	myTheme.rule("Label").setAll({
		fill: am5.color(0xffffff),
		fontSize: 10
	});
	myTheme.rule("RoundedRectangle", ["legend"]).setAll({
		opacity: 0
	});
	myTheme.rule("PanelControls").setAll({
		forceHidden: true
	});
	myTheme.rule("Legend", ["indicator"]).setAll({
		opacity: 0,
		shortName: true
	});
	root.setThemes([
		myTheme,
		am5dark.new(root),
		am5animated.new(root)
	]);
	// ==========
	// STOCKCHART
	// ==========
	const stockChart = root.container.children.push(
		am5stock.StockChart.new(root, {
			paddingRight: 0,
			paddingTop: 0,
			paddingLeft: 5,
			paddingBottom: 0
			//panX: true,
			//wheelY: "zoomX"
		})
	);
	// ==================
	// MAIN -STOCK- PANEL
	// ==================
	let mainPanel = stockChart.panels.push(
		am5stock.StockPanel.new(root, {
			wheelY: "zoomX",
			panX: true
		})
	);
	// ===============
	// X-AXIS & Y-AXIS
	// ===============
	const dateAxis = mainPanel.xAxes.push(
		am5xy.DateAxis.new(root, {
			baseInterval: { timeUnit: "day", count: 1 },
			renderer: am5xy.AxisRendererX.new(root, {
				strokeOpacity: 1,
				strokeWidth: 1,
				stroke: am5.color(0x008000),
				minGridDistance: 30,
				maxDeviation: 0.1 // top-left legend
			})
		})
	);
	const valueAxis = mainPanel.yAxes.push(
		am5xy.ValueAxis.new(root, {
			renderer: am5xy.AxisRendererY.new(root, {
				strokeOpacity: 1,
				strokeWidth: 1,
				stroke: am5.color(0x008000),
				opposite: true
			}),
			numberFormat: "#,###.0"
		})
	);
	// =====================
	// CREATE -VALUE- SERIES
	// =====================
	let valueSeries = mainPanel.series.push(
		am5xy.CandlestickSeries.new(root, { //LineSeries.new()
			name: `${route.params.symbol}, 1D`,
			xAxis: dateAxis,
			yAxis: valueAxis,
			openValueYField: "open",
			highValueYField: "high",
			lowValueYField: "low",
			valueXField: "date",
			valueYField: "close",
			clustered: false,
			legendLabelText: "{name} - {highValueY}"
		})
	);
	// Set main value series
	stockChart.set("stockSeries", valueSeries);
	// ======================
	// CREATE -VOLUME- SERIES
	// ======================
	// Create *volume* AXIS
	const volumeAxisRenderer = am5xy.AxisRendererY.new(root, {
		inside: true
	});
	volumeAxisRenderer.labels.template.set("forceHidden", true);
	volumeAxisRenderer.grid.template.set("forceHidden", true);
	const volumeValueAxis = mainPanel.yAxes.push(
		am5xy.ValueAxis.new(root, {
			numberFormat: "#.#a",
			height: am5.percent(40),
			y: am5.percent(100),
			centerY: am5.percent(100),
			renderer: volumeAxisRenderer
		})
	);
	// Create *volume* SERIES
	const volumeSeries = mainPanel.series.push(
		am5xy.ColumnSeries.new(root, {
			name: "Volume",
			clustered: false,
			valueXField: "date",
			valueYField: "volume",
			xAxis: dateAxis,
			yAxis: volumeValueAxis
		})
	);
	volumeSeries.columns.template.setAll({
		strokeOpacity: 0,
		fillOpacity: 0.3,
		fill: am5.color(0x898989)
	});
	// *** COLOR COLUMNS by stock rules ***
	//volumeSeries.columns.template.adapters.add("fill", (fill, target) => {
	//	const dataItem = target.dataItem;
	//	if (dataItem) {
	//		return stockChart.getVolumeColor(dataItem);
	//	}
	//	return fill;
	//})
	// Set main volume series
	stockChart.set("volumeSeries", volumeSeries);
	// ==========
	// ADD LEGEND
	// ==========
	const valueLegend = mainPanel.children.push(
		am5.Legend.new(root, {
			centerY: am5.percent(20),
			y: am5.percent(0),
			layout: root.verticalLayout
		})
	);
	valueLegend.markers.template.setAll({
		width: 8,
		height: 8
	});

	// ==================
	// DEFINE SOURCE DATA
	// ==================
	const uri = `https://api.binance.com/api/v3/klines?interval=1d&symbol=${route.params.symbol}`
	let data;
	am5.net.load(uri)
		.then((result) => {
			data = am5.JSONParser.parse(result.response);
			const candles = data.map((candles) => ({
				date: candles[0],
				open: candles[1],
				high: candles[2],
				low: candles[3],
				close: candles[4],
				volume: candles[5]
			}));
			//console.log(candles);
			data = candles.map((a) => {
				a.open = +a.open;
				a.high = +a.high;
				a.low = +a.low;
				a.close = +a.close;
				a.volume = +a.volume;
				return a;
			});
			dateAxis.data.setAll(data);
			//series.data.setAll(data);
			valueSeries.data.setAll(data),
				volumeSeries.data.setAll(data),
				valueLegend.data.setAll([valueSeries]);
		}).catch((result) => {
			console.log("Error loading " + result.xhr.responseURL);
		});
	// ============
	// ADD TOOLTIPS
	// ============
	const tooltipX = am5.Tooltip.new(root, {});
	const tooltipY = am5.Tooltip.new(root, {});
	tooltipX.get("background").setAll({
		fillOpacity: 1,
		fill: am5.color(0x0000FF),
		strokeOpacity: 0
	});
	tooltipY.get("background").setAll({
		opacity: 1,
		fill: am5.color(0x0000FF),
		strokeOpacity: 0
	});
	tooltipX.label.setAll({
		fontSize: 10
		//fill: am5.color(0x1E90FF),
	});
	tooltipY.label.setAll({
		fontSize: 10
		//fill: am5.color(0xffff00),
	});
	// ==========
	// ADD CURSOR
	// ==========
	mainPanel.set("cursor",
		am5xy.XYCursor.new(root, {
			xAxis: dateAxis,
			yAxis: valueAxis
		})
	);
	let cursor = mainPanel.get("cursor");
	cursor.lineX.setAll({
		strokeDasharray: [1, 1],
		stroke: am5.color(0xffffff),
		strokeWidth: 0.5
	});
	cursor.lineY.setAll({
		strokeOpacity: 1,
		strokeDasharray: [1, 1],
		stroke: am5.color(0xffffff),
		strokeWidth: 0.5
	});
	dateAxis.set("tooltip", tooltipX);
	valueAxis.set("tooltip", tooltipY);
	mainPanel.panelControls.set("forceHidden", true);

	// ===============================
	// PERIOD SELECTOR TO START SCREEN
	// ===============================
	const periodSelector = am5stock.PeriodSelector.new(root, {
		stockChart: stockChart
	})
	valueSeries.events.on("datavalidated", () => {
		periodSelector.selectPeriod({ timeUnit: "month", count: 3 })
	})
});
</script>

<template>
	<div class="">
		<div ref="chartdiv" id="chart" class=""></div>
		<div class="container space-2 fixed bottom-14">
			<SetPanel />
			<TableTrade class="py-2" />
		</div>
	</div>
</template>

<<style scoped>
#chart {
	width: 100%;
	height: 52dvh;
}
</style>