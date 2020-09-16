import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import Plotly from 'plotly.js-dist';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
})
export class MainContentComponent implements OnInit {
  @ViewChild('graph', { static: true }) graph: ElementRef;
  current: number = 0;
  max: number;
  data: any;
  constructor() {}

  ngOnInit(): void {
    this.fetchData().then((data) => {
      this.data = data;
      this.max = Object.keys(data).length;
      this.createChart(this.data[this.current]);
    });
  }

  async fetchData() {
    return await (await fetch('assets/WebDemonstrator.json')).json();
  }

  createChart = ({ sig, ref }) => {
    const time = [];
    sig.forEach((_: number, i: number) => {
      time.push(i / 260);
    });
    const trace1 = {
      type: 'scatter',
      mode: 'lines',
      name: 'Signal',
      x: time,
      y: sig,
      line: { color: '#17BECF' },
    };

    var trace2 = {
      type: 'scatter',
      mode: 'lines',
      name: 'Reference',
      x: time,
      y: ref,
      line: { color: '#7F7F7F' },
    };

    var data = [trace1, trace2];
    var layout = {
      title: 'Basic Time Series',
    };

    Plotly.newPlot(this.graph.nativeElement, data, layout);
  };

  nextChart = () => {
    if (this.current < this.max-1) {
      this.current++;
      this.createChart(this.data[this.current]);
    }
  };
  prevChart = () => {
    if (this.current > 0) {
      this.current--;
    }
    this.createChart(this.data[this.current]);
  };
}
