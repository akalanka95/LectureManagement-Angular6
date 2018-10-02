/*
jQuery(function ($) {
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
});*/
function genScreenshot() {
    html2canvas(document.body, {
        onrendered: function(canvas) {
            $('#box1').html("");
            $('#box1').append(canvas);

            if (navigator.userAgent.indexOf("MSIE ") > 0 ||
                navigator.userAgent.match(/Trident.*rv\:11\./))
            {
                var blob = canvas.msToBlob();
                window.navigator.msSaveBlob(blob,'Test file.png');
            }
            else {
                $('#test').attr('href', canvas.toDataURL("image/png"));
                $('#test').attr('download','Test file.png');
                $('#test')[0].click();
            }


        }
    });
}