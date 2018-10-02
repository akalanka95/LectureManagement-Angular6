
jQuery(function ($) {
    //const html2canvas = require('html2canvas');
    $("#exportButton").click(function () {
        // parse the HTML table element having an id=exportTable
        var dataSource = shield.DataSource.create({
            data: "#exportTable",
            schema: {
                type: "table",
                fields: {
                    Week: { type: Number },
                    Day: { type: String },
                    StartTime: { type: String },
                    EndTime: { type: String },
                    Lecture: { type: String }
                }
            }
        });

        // when parsing is done, export the data to PDF
        dataSource.read().then(function (data) {
            var pdf = new shield.exp.PDFDocument({
                author: "CIS Department",
                created: new Date()
            });

            pdf.addPage("a4", "portrait");

            pdf.table(
                50,
                50,
                data,
                [
                    { field: "Week", title: "Week", width: 50 },
                    { field: "Day", title: "Day", width: 80 },
                    { field: "StartTime", title: "StartTime", width: 100 },
                    { field: "EndTime", title: "Day", width: 100 },
                    { field: "Lecture", title: "Lecture", width: 200 }
                ],
                {
                    margins: {
                        top: 50,
                        left: 20
                    }
                }
            );

            pdf.saveAs({
                fileName: "PrepBootstrapPDF"
            });
        });
    });
    $("#exportButton1").click(function () {
        // parse the HTML table element having an id=exportTable
        var dataSource = shield.DataSource.create({
            data: "#exportTable1",
            schema: {
                type: "table",
                fields: {
                    Week: { type: Number },
                    Day: { type: String },
                    Subject: { type: String },
                    StartTime: { type: String },
                    EndTime: { type: String },
                    Lecture: { type: String }
                }
            }
        });

        // when parsing is done, export the data to PDF
        dataSource.read().then(function (data) {
            var pdf = new shield.exp.PDFDocument({
                author: "CIS Department",
                created: new Date()
            });

            pdf.addPage("a4", "portrait");

            pdf.table(
                50,
                50,
                data,
                [
                    { field: "Week", title: "Week", width: 50 },
                    { field: "Day", title: "Day", width: 80 },
                    { field: "Subject", title: "Subject", width: 120 },
                    { field: "StartTime", title: "StartTime", width: 100 },
                    { field: "EndTime", title: "Day", width: 100 },
                    { field: "Lecture", title: "Lecture", width: 200 }
                ],
                {
                    margins: {
                        top: 50,
                        left: 20
                    }
                }
            );

            pdf.saveAs({
                fileName: "PrepBootstrapPDF"
            });
        });
    });
        $("#exportButton2").click(function() {
            html2canvas($("#modalContactForm"), {
                onrendered: function(canvas) {
                    theCanvas = canvas;
                    canvas.toBlob(function(blob) {
                        saveAs(blob, "Dashboard.png");
                    });
                }
            });
        });
    $(function () {
        //Date for the calendar events (dummy data)
        var date = new Date();
        var d = date.getDate(),
            m = date.getMonth(),
            y = date.getFullYear();

        $('#calendar').fullCalendar({
            header: {
                left: '',
                center: 'title'
            },
            buttonText: {
                today: 'today',
                month: 'month'
            }
        });


    });

});