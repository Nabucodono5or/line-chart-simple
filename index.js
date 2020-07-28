import { select, selectAll } from "d3-selection";
import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import { axisBottom, axisLeft } from "d3-axis";
import { line, curveCardinal, curveNatural } from "d3-shape";

// select("body").append("h1").html("Hello World");

csv(require("./data/tweetData.csv")).then((data) => {
  console.log(data);
  lineChart(data);
});

function lineChart(incomingData) {
  let xScale = scaleLinear().domain([1, 11]).range([20, 470]);
  let ySCale = scaleLinear().domain([0, 35]).range([470, 20]);

  let xAxis = axisBottom(xScale).tickSize(-490).tickPadding(10);
  let yAxis = axisLeft(ySCale).tickSize(-470).tickPadding(10);

  let tweetsGenerator = line()
    .x((d) => {
      return xScale(d.day);
    })
    .y((d) => {
      return ySCale(d.tweets);
    });

  let retweetsGenerator = line()
    .x((d) => {
      return xScale(d.day);
    })
    .y((d) => {
      return ySCale(d.retweets);
    });

  let favoritesGenerator = line()
    .x((d) => {
      return xScale(d.day);
    })
    .y((d) => {
      return ySCale(d.favorites);
    });

  tweetsGenerator.curve(curveNatural);
  retweetsGenerator.curve(curveNatural);
  favoritesGenerator.curve(curveNatural);

  select("svg")
    .append("g")
    .attr("class", "xAxis")
    .attr("transform", "translate(0, 480)")
    .call(xAxis);

  select("svg")
    .append("g")
    .attr("class", "yAxis")
    .attr("transform", "translate(20, 10)")
    .call(yAxis);

  select("svg")
    .selectAll("circle.tweets")
    .data(incomingData)
    .enter()
    .append("circle")
    .attr("class", "tweets")
    .attr("r", 5)
    .attr("cx", (d) => {
      return xScale(d.day);
    })
    .attr("cy", (d) => {
      return ySCale(d.tweets);
    });

  select("svg")
    .selectAll("circle.retweets")
    .data(incomingData)
    .enter()
    .append("circle")
    .attr("class", "retweets")
    .attr("r", 5)
    .attr("cx", (d) => {
      return xScale(d.day);
    })
    .attr("cy", (d) => {
      return ySCale(d.retweets);
    });

  select("svg")
    .selectAll("circle.favorites")
    .data(incomingData)
    .enter()
    .append("circle")
    .attr("class", "favorites")
    .attr("r", 5)
    .attr("cx", (d) => {
      return xScale(d.day);
    })
    .attr("cy", (d) => {
      return ySCale(d.favorites);
    });

  select("svg")
    .append("path")
    .attr("class", "tweetsLine")
    .attr("d", tweetsGenerator(incomingData));

  select("svg")
    .append("path")
    .attr("class", "retweetsLine")
    .attr("d", retweetsGenerator(incomingData));

  select("svg")
    .append("path")
    .attr("class", "favoritesLine")
    .attr("d", favoritesGenerator(incomingData));
}
