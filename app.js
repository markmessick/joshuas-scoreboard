function optionChanged() {
    d3.csv("master_scoreboard.csv").then(function(importedData) {
        
    var dropdownMenu = d3.select("#selDataset");
    
    var fieldExpert = dropdownMenu.property("value");

    fieldExpertsArr = ['mark_messick', 'tyler_maun', 'josh_fowler', 'patrick_kern', 'noah_fullerton', 'wade_wellesley']

    for (var i = 0; i < fieldExpertsArr.length; i++) {
        if (fieldExpert === fieldExpertsArr[i]) {
            var importedData = importedData.filter(d => d.field_expert === fieldExpertsArr[i])
        }
    }
    console.log(typeof importedData[0].date)
    
    dates = []
    demandG = []
    intice = []
    productivity = []
    qCount = []
    qTime = []
    rsCount = []
    rsTime = []
    startCount = []
    startTime = []
    taurus = []
    rsRate = []
    collectionRate = []


    importedData.forEach(function(data) {
        data.demand_g = +data.demand_g;
        data.intice = +data.intice;
        data.productivity_score = +data.productivity_score;
        data.q_count = +data.q_count;
        data.q_time = +data.q_time;
        data.rs_count = +data.rs_count;
        data.rs_time = +data.rs_time;
        data.start_count = +data.start_count;
        data.start_time = +data.start_time;
        data.taurus = +data.taurus;
        data.rs_rate = +data.rs_rate;
        data.collection_rate = +data.collection_rate;

        dates.push(data.date);
        demandG.push(data.demand_g);
        intice.push(data.intice);
        productivity.push(data.productivity_score);
        qCount.push(data.q_count);
        qTime.push(data.q_time);
        rsCount.push(data.rs_count);
        rsTime.push(data.rs_time);
        startTime.push(data.start_time);
        startCount.push(data.start_count);
        taurus.push(data.taurus);
        rsRate.push(data.rs_rate);
        collectionRate.push(data.collection_rate);
    });

    function mean(arr) {
        var total = 0;
        for (var i = 0; i < arr.length; i++) {
            total += arr[i];
        }
        meanValue = total / arr.length;
        return meanValue.toFixed(1);
    }

    function count(arr) {
        var counter = 0;
        for (var i =0; i < arr.length; i++) {
            counter += arr[i];
        }
        return counter
    }

    var target = d3.select("#sample-metadata")
    target.html("")
    target.append("p").html(`Avg Daily Productivity Score: <b>${mean(productivity)}</b>`);
    target.append("p").html(`Reservice Rate: <b>${rsRate[0]}%</b>`)
    target.append("p").html(`Collection Rate: <b>${collectionRate[0]}%</b>`)
    target.append("p").html(`Avg Time Spent on Qs: <b>${mean(qTime)} minutes</b>`);
    target.append("p").html(`Avg Time Spent on Reservices: <b>${mean(rsTime)} minutes</b>`);
    target.append("p").html(`Avg Time Spent on Starts: <b>${mean(startTime)} minutes</b>`);
    target.append("p").html(`Avg number of Qs per Day: <b>${mean(qCount)}</b>`);
    target.append("p").html(`Avg number of Reservices per Day: <b>${mean(rsCount)}</b>`);
    target.append("p").html(`Avg number of Starts per Day: <b>${mean(startCount)}</b>`);
    // target.append("p").html(`Avg amount of Taurus Used per Q: <b>${mean(taurus)} gallons</b>`);
    // target.append("p").html(`Avg amount of Intice used per Q: <b>${mean(intice)}</b>`);
    // target.append("p").html(`Avg amount of Demand G used per Q: <b>${mean(demandG)}</b>`);

    monthArr = [0, 30, 61, 91, 122, 153, 183, 214, 244]
    rsRateArr = []
    collectionRateArr = []
    productivityArr = []
    
    function getDates(data) {
        for (var i = 0; i < monthArr.length; i++) {
            var firstOfMonth = data[monthArr[i]]
            rsRateArr.push(firstOfMonth.rs_rate)
            collectionRateArr.push(firstOfMonth.collection_rate)
            productivityArr.push(firstOfMonth.productivity_score)
        }
    }

    getDates(importedData)

    chartDates = ["4/1/2019", "5/1/2019", "6/1/2019", "7/1/2019", "8/1/2019", "9/1/2019", "10/1/2019", "11/1/2019", "12/1/2019"]
    
    var traceA1 = {
        x: chartDates,
        y: rsRateArr,
        name: "Reservice Rate (%)",
        type: "line"
    };
    var traceB1 = {
        x: chartDates,
        y: collectionRateArr,
        name: "Collection Rate (%)",
        type: "line"
    };
    var traceC1 = {
        x: chartDates,
        y: productivityArr,
        name: "Productivity Score",
        type: "line"
    };
    var layout = {
        title: "Summary Statistics"
    };
    var plot1 = [traceC1, traceB1, traceA1];
    Plotly.newPlot("plot1", plot1, layout);


    var trace2 = {
        x: dates,
        y: qTime,
        type: "line"
    };
    var layout = {
        title: "Avg Time Spent on Qs by Day"
    };
    var plot2 = [trace2];
    Plotly.newPlot("plot2", plot2, layout);

    var trace3 = {
        values: [count(qCount), count(rsCount), count(startCount)],
        labels: ["Quarterlies", "Reservices", "Starts"],
        type: "pie"
    };
    var layout = {
        title: "Breakdown of Completed Stops"
    };
    var plot3 = [trace3];
    Plotly.newPlot("plot3", plot3, layout);
    });
}
