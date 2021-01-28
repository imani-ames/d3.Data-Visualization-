
let countyURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";
let educationURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";

let countyData
let educationData

let canvas = d3.select("#canvas");
let tooltip = d3.select("#tooltip");

let drawMap = () => {
    canvas.selectAll('path')
        .data(countyData)
        .enter()
        .append('path')
        .attr('d', d3.geoPath())
        .attr('class', 'county')
        .attr('fill', (countyDataItem) => {
            let id = countyDataItem['id']
            let county = educationData.find((item) => {
                return item['fips'] === id
            })
            let percentage = county['bachelorsOrHigher']
            if (percentage <= 15) {
                return 'skyblue'
            } else if (percentage <= 30) {
                return 'mediumseagreen'
            } else if (percentage <= 45) {
                return 'mediumslateblue'
            } else {
                return 'navy'
            }
        })
        .attr('data-fips', (countyDataItem) => {
            return countyDataItem['id']
        })
        .attr('data-education', (countyDataItem) => {
            let id = countyDataItem['id']
            let county = educationData.find((item) => {
                return item['fips'] === id
            })
            let percentage = county['bachelorsOrHigher']
            return percentage
        })
        .on('mouseover', (countyDataItem) => {
            tooltip.transition()
                .style('visibility', 'visible')

            let id = countyDataItem['id']
            let county = educationData.find((item) => {
                return item['fips'] === id
            })

        }

d3.json(countyURL).then(
            (data, error) => {
                if (error) {
                    console.log(log)
                } else {
                    countyData = topojson.feature(data, data.objects.counties).features
                    console.log(countyData)

                    d3.json(educationURL).then(
                        (data, error) => {
                            if (error) {
                                console.log(error)
                            } else {
                                educationData = data
                                console.log(educationData)
                                drawMap()
                            }
                        }
                    )
                }
            }
        )