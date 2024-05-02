import React from 'react';
import ReactApexChart from 'react-apexcharts';
class AttendenceChart extends React.Component {
    render() {
        const { userAttendance } = this.props;
        const categories = Object.keys(userAttendance);
        const seriesData = [
            {
                name: 'Absent',
                data: Object.values(userAttendance).map(item => item.absent)
            },
            {
                name: 'Present',
                data: Object.values(userAttendance).map(item => item.present)
            },
            {
                name: 'Total',
                data: Object.values(userAttendance).map(item => item.present + item.absent)
            }
        ];

        const options = {
            chart: {
                type: 'bar',
                height: 350
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    endingShape: 'rounded'
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            xaxis: {
                categories: categories,
                title: {
                    text: 'Subjects'
                }
            },
            yaxis: {
                title: {
                    text: 'Attendance Count'
                }
            },
            fill: {
                opacity: 1
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val
                    }
                }
            }
        };

        return (
            <div>
                <div id="chart">
                    <ReactApexChart options={options} series={seriesData} type="bar" height={350} />
                </div>
                <div id="html-dist"></div>
            </div>
        );
    }
}


class TotalAttendance extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            series: [10],
            options: {
                chart: {
                    height: 350,
                    type: 'radialBar',
                    toolbar: {
                        show: true
                    }
                },
                plotOptions: {
                    radialBar: {
                        startAngle: -135,
                        endAngle: 225,
                        hollow: {
                            margin: 0,
                            size: '70%',
                            background: '#fff',
                            image: undefined,
                            imageOffsetX: 0,
                            imageOffsetY: 0,
                            position: 'front',
                            dropShadow: {
                                enabled: true,
                                top: 3,
                                left: 0,
                                blur: 4,
                                opacity: 0.24
                            }
                        },
                        track: {
                            background: '#fff',
                            strokeWidth: '67%',
                            margin: 0, // margin is in pixels
                            dropShadow: {
                                enabled: true,
                                top: -3,
                                left: 0,
                                blur: 4,
                                opacity: 0.35
                            }
                        },

                        dataLabels: {
                            show: true,
                            name: {
                                offsetY: -10,
                                show: true,
                                color: '#888',
                                fontSize: '17px'
                            },
                            value: {
                                formatter: function (val) {
                                    return parseInt(val);
                                },
                                color: '#111',
                                fontSize: '36px',
                                show: true,
                            }
                        }
                    }
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shade: 'dark',
                        type: 'horizontal',
                        shadeIntensity: 0.5,
                        gradientToColors: ['#ABE5A1'],
                        inverseColors: true,
                        opacityFrom: 1,
                        opacityTo: 1,
                        stops: [0, 100]
                    }
                },
                stroke: {
                    lineCap: 'round'
                },
                labels: ['Percent'],
            },


        };
    }

    render() {
        const { totalAttendance, totalPresent } = this.props;
        return (
            <div>
                <div id="card">
                    <div id="chart">
                        <ReactApexChart options={this.state.options} series={[totalPresent * 100 / totalAttendance]} type="radialBar" height={350} />
                    </div>
                </div>
                <div id="html-dist"></div>
                <div className='text-2xl text-bold tracking-wider text-center mt-[-20px]'>Overall Percentage</div>
            </div>
        );
    }
}


export { AttendenceChart, TotalAttendance };
