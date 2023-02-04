(async () => {
	const topology = await fetch(
		"https://code.highcharts.com/mapdata/countries/us/us-all.topo.json"
	).then((response) => response.json());

	Highcharts.getJSON(
		"https://raw.githubusercontent.com/robleto/mfwm/main/states.json",
		function (data) {
			// Make codes uppercase to match the map data
			data.forEach(function (p) {
				p.code = p.code.toUpperCase();
			});

			// Instantiate the map
			Highcharts.mapChart("container", {
				chart: {
					map: topology,
					borderWidth: 0,
				},

				title: {
					text: "How long with $1M last?",
				},

				exporting: {
					sourceWidth: 800,
					sourceHeight: 600,
				},

				legend: {
					layout: "horizontal",
					borderWidth: 0,
					backgroundColor: "rgba(255,255,255,0.85)",
					floating: true,
					verticalAlign: "top",
					y: 25,
				},

				mapNavigation: {
					enabled: true,
				},

				colorAxis: {
					min: 1,
					type: "logarithmic",
					dataClasses: [
						{
							from: 10,
							to: 12,
						},
						{
							from: 12,
							to: 15,
						},
						{
							from: 15,
							to: 17,
						},
						{
							from: 17,
							to: 20,
						},
						{
							from: 20,
							to: 22,
						},
						{
							from: 22,
						},
					],
					minColor: "#DFDAA9",
					maxColor: "#073F1C",
				},

				series: [
					{
						accessibility: {
							point: {
								valueDescriptionFormat:
									"{xDescription}, {point.value}.",
							},
						},
						animation: {
							duration: 1000,
						},
						data: data,
						joinBy: ["postal-code", "code"],
						dataLabels: {
							enabled: true,
							color: "#FFFFFF",
							format: "{point.code}",
						},
						name: "How long will $1M last",
						tooltip: {
							pointFormat:
								"{point.code}: {point.years} years, {point.months} months, ",
						},
					},
				],
			});
		}
	);
})();
