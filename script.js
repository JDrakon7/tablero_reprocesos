



document.addEventListener("DOMContentLoaded", function() {
    const spreadsheetId = "1fP1Wvtw1OM1zaXd9Yiw66qG4XA-52dvVYj5TVAEO1uk";
    const apiKey = "AIzaSyCcps42IWTaG1dMEskQanbD--5cOfmweA8"; 


    async function fetchAndPrintCellsContent() {   
        const cells = document.getElementById("cellInput").value.split(",");
        if (cells.length === 0 || cells.length > 8) {
            alert("Por favor ingrese entre 1 y 8 celdas.");
            return;
        }

        try {
            let cellContents = [];
            for (let i = 0; i < cells.length; i++) {
                const cell = cells[i].trim();
                if (cell) {

                    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${cell}?key=${apiKey}`);
                    const data = await response.json();
                    
                    if (data.values && data.values.length > 0) {
                        cellContents.push(data.values[0][0]);
                    } else {
                        cellContents.push(`La celda ${cell} está vacía o no existe.`);
                    }
                }
            }


            printCellsContent(cellContents);
        } catch (error) {
            console.error("Error al obtener el contenido de las celdas:", error);
            alert("Hubo un error al obtener el contenido de las celdas.");
        }
    }

    function printCellsContent(contents) {
        const printWindow = window.open('', '', 'width=800,height=800');
        printWindow.document.write('<html><head><title>Impresión de los reprocesos</title>');
        printWindow.document.write('<style>');
        printWindow.document.write(`
    body { font-family: Arial, sans-serif; margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; height: 90vh; flex-direction: column;}
    .print-container { display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(2, 1fr); gap: 8px;}
    .card { 
        width: 8cm; 
        height: 4cm; 
        padding: 10px; 
        border: 2px solid black;
        border-radius: 10px;
        background-color: #f4f4f4;
        text-align: center;
        font-size: 15px;
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`);
printWindow.document.write('</style>');

        // printWindow.document.write(`
        //     body { font-family: Arial, sans-serif; margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; height: 90vh; flex-direction: column;}
        //     .print-container { display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(2, 1fr); gap: 8px; width: 100%; height: 50%;}
        //     .card { padding: 15px; border: 2px solid black; border-radius: 10px; background-color: #f4f4f4; text-align: center; font-size: 15px; font-weight: bold;}
        // `);
        printWindow.document.write('</style></head><body>');
        printWindow.document.write('<div class="print-container">');

        contents.forEach(content => {
            printWindow.document.write(`<div class="card"><p>${content}</p></div>`);
        });

        printWindow.document.write('</div>');
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    }


    document.getElementById("printButton").addEventListener("click", fetchAndPrintCellsContent);
});



// ejemplo D13,F14,I13,I14,J14,K13,L13,L15




















