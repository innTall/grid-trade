<script setup>
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5stock from "@amcharts/amcharts5/stock";
import am5dark from '@amcharts/amcharts5/themes/Dark';
import am5animated from '@amcharts/amcharts5/themes/Animated';
import { shallowRef, onMounted } from 'vue';
//import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";
//import { useChartStore } from '@/stores/chart.js';
//const { data } = storeToRefs(useChartStore());
const router = useRouter();
const route = useRoute();

let root;
const chartdiv = shallowRef(null);
onMounted(() => {
// ============
// ROOT ELEMENT
// ============
root = am5.Root.new(chartdiv.value);
	root.setThemes([
		am5dark.new(root),
		am5animated.new(root)
	]);
	let stockChart = root.container.children.push(
		am5stock.StockChart.new(root, {})
	);
	// =================================
	// CREATE A MAIN STOCK PANEL (CHART)
	// =================================
	let mainPanel = stockChart.panels.push(
		am5stock.StockPanel.new(root, {
			wheelY: "zoomX",
			panX: true,
			//panY: true
		})
	);
	// ===============
	// X-AXIS & Y-AXIS
	// ===============
	const dateAxis = mainPanel.xAxes.push(
		am5xy.DateAxis.new(root, {
			baseInterval: { timeUnit: "day", count: 1 },
			renderer: am5xy.AxisRendererX.new(root, {}),
			tooltip: am5.Tooltip.new(root, {})
		})
	);
	let valueAxis = mainPanel.yAxes.push(
		am5xy.ValueAxis.new(root, {
			renderer: am5xy.AxisRendererY.new(root, {
				pan: "zoom"
			}),
			extraMin: 0.1, // adds some space for for main series
			tooltip: am5.Tooltip.new(root, {}),
			numberFormat: "#,###.###0",
			extraTooltipPrecision: 3
		})
	);
	// ============================
	// ADD RANGE WITH CURRENT VALUE
	// ============================
	let currentValueDataItem = valueAxis.createAxisRange(valueAxis.makeDataItem({ value: 0 }));
	let currentLabel = currentValueDataItem.get("label");
	if (currentLabel) {
		currentLabel.setAll({
			fill: am5.color(0xffffff),
			background: am5.Rectangle.new(root, {
				fill: am5.color(0x000000)
			})
		})
	}
	let currentGrid = currentValueDataItem.get("grid");
	if (currentGrid) {
		currentGrid.setAll({ strokeOpacity: 0.5, strokeDasharray: [2, 5] });
	}
	// =============
	// CREATE SERIES
	// =============
	let valueSeries = mainPanel.series.push(
		am5xy.CandlestickSeries.new(root, {
			name: "ADAUSDT, 1D",
			xAxis: dateAxis,
			yAxis: valueAxis,
			openValueYField: "open",
			highValueYField: "high",
			lowValueYField: "low",
			valueYField: "close",
			valueXField: "date",
			calculateAggregates: true,
			legendValueText: "high: [bold]{highValueY}[/]",
			legendRangeValueText: ""
		})
	);
	// Set main value series
	stockChart.set("stockSeries", valueSeries);


	// ==================
	// DEFINE SOURCE DATA
	// ==================
	let data;
	am5.net.load('https://api.binance.com/api/v3/klines?symbol=ADAUSDT&interval=1d')
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
			data = candles.map((a) => {
				a.open = +a.open;
				a.high = +a.high;
				a.low = +a.low;
				a.close = +a.close;
				a.volume = +Number(a.volume).toFixed(0);
				return a;
			});
			//series.data.setAll(data);
			valueSeries.data.setAll(data);
			valueLegend.data.setAll([valueSeries]);
			//valueSeries.data.push(dObj1);
			//valueSeries.data.setIndex(valueSeries.data.length - 1, dObj2);
		}).catch((result) => {
			console.log("Error loading " + result.xhr.responseURL);
		});
	// ================
	// ADD STOCK LEGEND
	// ================
	let valueLegend = mainPanel.plotContainer.children.push(
		am5stock.StockLegend.new(root, {
			stockChart: stockChart
		})
	);
	// =============
	// ADD CURSOR(S)
	// =============
	mainPanel.set("cursor",
		am5xy.XYCursor.new(root, {
			yAxis: valueAxis,
			xAxis: dateAxis
		})
	);
	// ===============================
	// PERIOD SELECTOR TO START SCREEN
	// ===============================
	const periodSelector = am5stock.PeriodSelector.new(root, {
		stockChart: stockChart
	})
	valueSeries.events.on("datavalidated", () => {
		periodSelector.selectPeriod({ timeUnit: "month", count: 3 })
	})
	// UPDATE DATA
	let previousDate;
	let previousValue;
	let value;
	setInterval(() => {
		let valueSeries = stockChart.get("stockSeries");
		let date = Date.now();
		let lastDataObject = valueSeries.data.getIndex(valueSeries.data.length - 1);
		if (lastDataObject) {
			previousDate = lastDataObject.date;
			previousValue = lastDataObject.close;
			let high = lastDataObject.high;
			let low = lastDataObject.low;
			let open = lastDataObject.open;
			value = am5.math.round(previousValue, 1);
			if (am5.time.checkChange(date, previousDate, "day")) {
				open = value;
				high = value;
				low = value;

				let dObj1 = {
					date: date,
					close: value,
					open: value,
					low: value,
					high: value
				};

				valueSeries.data.push(dObj1);
				previousDate = date;
			} else {
				if (value > high) {
					high = value;
				}
				if (value < low) {
					low = value;
				};
				let dObj2 = {
					date: date,
					close: value,
					open: open,
					low: low,
					high: high
				};

				valueSeries.data.setIndex(valueSeries.data.length - 1, dObj2);

			}
			// update current value
			if (currentLabel) {
				currentValueDataItem.animate({ key: "value", to: value, duration: 500, easing: am5.ease.out(am5.ease.cubic) });
				currentLabel.set("text", stockChart.getNumberFormatter().format(value));
				let bg = currentLabel.get("background");
				if (bg) {
					if (value < open) {
						bg.set("fill", root.interfaceColors.get("negative"));
					}
					//if (value == open) {
					//  bg.set("fill", root.interfaceColors.get("disabled"));
					//}
					else {
						bg.set("fill", root.interfaceColors.get("positive"));
					}
				}
			}
		}
	}, 1000);

});
</script>

<template>
	<div class="">
		<div id="chartcontrols"></div>
		<div ref="chartdiv" id="chart" class=""></div>
	</div>
</template>

<style scoped>
#chart {
	width: 100%;
	height: 83vh;
}
</style>