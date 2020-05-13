function optionChanged() {
    d3.csv("field_expert_scoreboard.csv").then(function(importedData) {
        
    var dropdownMenu = d3.select("#selDataset");
    
    var selection = dropdownMenu.property("value");

    selectionArr = ['mark_messick', 'tyler_maun', 'josh_fowler', 'patrick_kern', 'noah_fullerton', 'wade_wellesley']

    for (var i = 0; i < selectionArr.length; i++) {
        if (selection === selectionArr[i]) {
            var filteredData = importedData.filter(d => d.field_expert === selectionArr[i])
        }
    }
    console.log(filteredData[0])
    
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

    dates2 = []
    demandG2 = []
    intice2 = []
    productivity2 = []
    qCount2 = []
    qTime2 = []
    rsCount2 = []
    rsTime2 = []
    startCount2 = []
    startTime2 = []
    taurus2 = []
    rsRate2 = []
    collectionRate2 = []


    filteredData.forEach(function(data) {
        data.date = new Date(data.date)
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

    var lastMonth = filteredData.slice(-30)

    lastMonth.forEach(function(data) {
        data.date = new Date(data.date)
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

        dates2.push(data.date);
        demandG2.push(data.demand_g);
        intice2.push(data.intice);
        productivity2.push(data.productivity_score);
        qCount2.push(data.q_count);
        qTime2.push(data.q_time);
        rsCount2.push(data.rs_count);
        rsTime2.push(data.rs_time);
        startTime2.push(data.start_time);
        startCount2.push(data.start_count);
        taurus2.push(data.taurus);
        rsRate2.push(data.rs_rate);
        collectionRate2.push(data.collection_rate);
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
    target.append("p").html(`Avg Daily Productivity Score: <b>${mean(productivity2)}</b>`);
    target.append("p").html(`Reservice Rate: <b>${rsRate[0]}%</b>`)
    target.append("p").html(`Collection Rate: <b>${collectionRate[0]}%</b>`)
    target.append("p").html(`Avg Time Spent on Qs: <b>${mean(qTime2)} minutes</b>`);
    target.append("p").html(`Avg Time Spent on Reservices: <b>${mean(rsTime2)} minutes</b>`);
    target.append("p").html(`Avg Time Spent on Starts: <b>${mean(startTime2)} minutes</b>`);
    // target.append("p").html(`Avg number of Qs per Day: <b>${mean(qCount2)}</b>`);
    // target.append("p").html(`Avg number of Reservices per Day: <b>${mean(rsCount2)}</b>`);
    // target.append("p").html(`Avg number of Starts per Day: <b>${mean(startCount2)}</b>`);
    // target.append("p").html(`Avg amount of Taurus Used per Q: <b>${mean(taurus)} gallons</b>`);
    // target.append("p").html(`Avg amount of Intice used per Q: <b>${mean(intice)}</b>`);
    // target.append("p").html(`Avg amount of Demand G used per Q: <b>${mean(demandG)}</b>`);

    monthArr = [0, 30, 61, 91, 122, 153, 183, 214, 244]
    rsRateArr = []
    collectionRateArr = []
    productivityArr = []
    datesArr = []
    
    function getDates(data) {
        for (var i = 0; i < monthArr.length; i++) {
            var firstOfMonth = data[monthArr[i]]
            rsRateArr.push(firstOfMonth.rs_rate)
            collectionRateArr.push(firstOfMonth.collection_rate)
            productivityArr.push(firstOfMonth.productivity_score)
            datesArr.push(firstOfMonth.date)
        }
    }

    getDates(filteredData)
    
    var traceA1 = {
        x: datesArr,
        y: rsRateArr,
        name: "Reservice Rate (%)",
        type: "line"
    };
    var traceB1 = {
        x: datesArr,
        y: collectionRateArr,
        name: "Collection Rate (%)",
        type: "line"
    };
    var traceC1 = {
        x: datesArr,
        y: productivityArr,
        name: "Productivity Score",
        type: "line"
    };
    var layout = {
        title: "Summary Statistics (By Month)"
    };
    var plot1 = [traceC1, traceB1, traceA1];
    Plotly.newPlot("plot1", plot1, layout);

    var traceA2 = {
        x: dates2,
        y: qTime2,
        name: "Quarterlies",
        type: "line"
    };
    var traceB2 = {
        x: dates2,
        y: rsTime2,
        name: "Reservices",
        type: "line"
    };
    var traceC2 = {
        x: dates2,
        y: startTime2,
        name: "Starts",
        type: "line"
    }
    var layout = {
        title: "Avg Time Spent on Stops (Last 30 Days)"
    };
    var plot2 = [traceC2, traceB2, traceA2];
    Plotly.newPlot("plot2", plot2, layout);

    var trace3 = {
        values: [count(startCount2), count(rsCount2), count(qCount2)],
        labels: ["Starts", "Reservices", "Quarterlies"],
        type: "pie"
    };
    var layout = {
        title: "Breakdown of Completed Stops"
    };
    var plot3 = [trace3];
    Plotly.newPlot("plot3", plot3, layout);
    
    // var traceA4 = {
    //     x: mean(taurus2),
    //     name: "Taurus",
    //     type: "bar",
    //     orientation: "h"
    // };
    // var layout = {
    //     title: "Breakdown of Product Usage"
    // };
    // var plot4 = [traceA4];
    // Plotly.newPlot("plot4", plot4, layout)

    });
}
