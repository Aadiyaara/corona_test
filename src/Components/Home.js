import React, { useState, useEffect } from 'react'
import * as am4core from "@amcharts/amcharts4/core"
import * as am4maps from "@amcharts/amcharts4/maps"
import * as am4charts from "@amcharts/amcharts4/charts"
import am4themes_animated from "@amcharts/amcharts4/themes/animated"
import am4geodata_worldUltra from "@amcharts/amcharts4-geodata/worldUltra"
import Neighbours from '../Utils/neighbours.json'
import Variables from '../Utils/Variables.json'
import { Typography } from '@material-ui/core'

am4core.useTheme(am4themes_animated)

function Home () {

    useEffect(() => {
        var chart = am4core.create("chartdiv", am4maps.MapChart);

        try {
            chart.geodata = am4geodata_worldUltra;
        }
        catch (e) {
            chart.raiseCriticalError(new Error("Map geodata could not be loaded. Please download the latest <a href=\"https://www.amcharts.com/download/download-v4/\">amcharts geodata</a> and extract its contents into the same directory as your amCharts files."));
        }

        chart.projection = new am4maps.projections.Miller();

        var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
        polygonSeries.useGeodata = true;

        // country area look and behavior
        var polygonTemplate = polygonSeries.mapPolygons.template;
        polygonTemplate.strokeOpacity = 1
        polygonTemplate.stroke = am4core.color("#ffffff")
        polygonTemplate.fillOpacity = 1
        polygonTemplate.tooltipText = "{name}"

        var hoverState = polygonTemplate.states.create("hover")
        hoverState.properties.fillOpacity = 0.75;

        console.log(chart)

    }, [])

    return (
    <React.Fragment>
        <div id="chartdiv" style={{width: "100vw", height:"100vh"}}></div>
        <div id="arenaControls" style={{position: 'absolute', top: '93vh',left: '0', width: "100vw", height:"7vh", display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.75)', zIndex: 5}}>
            <Typography>
                Day
            </Typography>
        </div>
    </React.Fragment>
    );
}

export default Home