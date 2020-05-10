function optionChanged(option) {

    var dropdownMenu = d3.select("#selDataset");
    
    var fieldExpert = dropdownMenu.property("value");
  
    if (fieldExpert === 'markmessick') {
      option = "markmessick_scoreboard.csv"
    }
  
    if (fieldExpert === 'tylermaun') {
        option = "tylermaun_scoreboard.csv"
      }

    if (fieldExpert === 'joshfowler') {
    option = "joshfowler_scoreboard.csv"
    }

    d3.csv(option).then(function(importedData) {
        console.log(importedData[0]);
        
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
        target.append("p").html(`Avg Time Spent on Qs: <b>${mean(qTime)} minutes</b>`);
        target.append("p").html(`Avg Time Spent on Reservices: <b>${mean(rsTime)} minutes</b>`);
        target.append("p").html(`Avg Time Spent on Starts: <b>${mean(startTime)} minutes</b>`);
        target.append("p").html(`Avg number of Qs per Day: <b>${mean(qCount)}</b>`);
        target.append("p").html(`Avg number of Reservices per Day: <b>${mean(rsCount)}</b>`);
        target.append("p").html(`Avg number of Starts per Day: <b>${mean(startCount)}</b>`);
        target.append("p").html(`Avg amount of Taurus Used per Q: <b>${mean(taurus)} gallons</b>`);
        target.append("p").html(`Avg amount of Intice used per Q: <b>${mean(intice)}</b>`);
        target.append("p").html(`Avg amount of Demand G used per Q: <b>${mean(demandG)}</b>`);

        var trace1 = {
            x: dates,
            y: productivity,
            type: "line"
        };
        var layout = {
            title: "Productivity Score by Day"
        };
        var plot1 = [trace1];
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


    
    
        // // STEP #5: Create the Horizontal Bar Plot
    
        // // STEP #7: Update the data on change
    
        // d3.selectAll("#selDataset").on("change", optionChanged);
    
        // function optionChanged() {
        //     var dropdownMenu = d3.select("#selDataset");
        //     var dropdownSelection = dropdownMenu.property("value");
    
        //     for (var i = 0; i < idArr.length; i++) {
        //         if (dropdownSelection == idArr[i]) {
        //             var target = d3.select("#sample-metadata")
        //             target.html("")
        //             target.append("p").text(`ID: ${data.metadata[i].id}`);
        //             target.append("p").text(`Age: ${data.metadata[i].age}`);
        //             target.append("p").text(`Ethnicity: ${data.metadata[i].ethnicity}`);
        //             target.append("p").text(`Gender: ${data.metadata[i].gender}`);
        //             target.append("p").text(`Location: ${data.metadata[i].location}`);
        //             target.append("p").text(`BBType: ${data.metadata[i].bbtype}`);
    
        //             var printies = data.samples[i].sample_values;
        //             printies = printies.slice(0, 10);
        //             var printyIDs = data.samples[i].otu_ids;
        //             printyIDs = printyIDs.slice(0, 10);
        //             printyIDs = JSON.stringify(printyIDs)
        //             var printyLabels = data.samples[i].otu_labels;
        //             printyLabels = printyLabels.slice(0, 10);
    
        //             var trace1 = {
        //                 x: printies,
        //                 y: printyIDs,
        //                 type: "bar",
        //                 orientation: "h",
        //                 text: printyLabels
        //             };
                
        //             var hPlot = [trace1];
                    
        //             Plotly.newPlot("bar", hPlot);
    
        //             var trace2 = {
        //                 x: data.samples[i].otu_ids,
        //                 y: data.samples[i].sample_values,
        //                 mode: "markers",
        //                 marker: {
        //                     color: data.samples[i].otu_ids,
        //                     size: data.samples[i].sample_values
        //                 }
        //             };
                
        //             var bubblePlot = [trace2];
                
        //             var layout = {
        //                 height: 700,
        //                 width: 1200
        //             };
                
        //             Plotly.newPlot('bubble', bubblePlot, layout);
        //         }
        //     }
        // }
