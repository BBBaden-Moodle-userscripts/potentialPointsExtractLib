var MyTableUtils = (function () {
    function info (){
        const name = "extract.lib.user.js";
        const version = "1.0.0";
        const description = "processes tables from moodle.bbbaden.ch";
        const author = "black-backdoor";
        
        const homepageURL = ""

        return {
            name: name,
            version: version,
            description: description,
            author: author,
            homepageURL: homepageURL   
        };
    }

    function convertHtmlTableToTextTable(table) {
        var jsTable = [];

        // Iterate through rows
        for (var i = 0; i < table.rows.length; i++) {
            var row = table.rows[i];
            var rowData = [];

            // Iterate through cells
            for (var j = 0; j < row.cells.length; j++) {
                rowData.push(row.cells[j].innerText);
            }

            jsTable.push(rowData);
        }

        return jsTable;
    }

    function convertHtmlTableToHtmlElementsTable(table) {
        var jsTable = [];

        // Iterate through rows
        for (var i = 0; i < table.rows.length; i++) {
            var row = table.rows[i];
            var rowData = [];

            // Iterate through cells
            for (var j = 0; j < row.cells.length; j++) {
                rowData.push(row.cells[j]);
            }

            jsTable.push(rowData);
        }

        return jsTable;
    }

    function getModuleTitle(textTable) {
        return textTable[1][0];
    }

    function getTableColumns(textTable) {
        return textTable[0];
    }

    function percentageToFloat(percentage) {
        if (typeof percentage !== "string") {
            throw `percentage is not a string type:${typeof percentage} value:${percentage}`;
        }
        const percentageWithoutPercentSign = percentage.replace("%", "");
        const percentageWithoutSpace = percentageWithoutPercentSign.replace(" ", "");
        const percentageAsFloatString = percentageWithoutSpace.replace(",", ".");
        const percentageAsFloat = parseFloat(percentageAsFloatString);
        return percentageAsFloat;
    }

    function porcesseRow (textTableRow) {
        try {
            const empty = textTableRow[1].includes("(Leer)");
            const type = textTableRow[0].split("\n")[0];
            const name = textTableRow[0].split("\n")[1];
            const berechnete_gewichtung = percentageToFloat(textTableRow[1]);
            const erreichte_punkte = parseFloat(textTableRow[2].replace(",", "."));
            const max_punkte = parseInt(textTableRow[3].split("–")[1]);
            const erreicht_punkte_prozentsatz = percentageToFloat(textTableRow[4]);
            const gesamter_beitrag_zur_note = percentageToFloat(textTableRow[6]);

            //console.log("input:", textTableRow, "output:", {type, name, berechnete_gewichtung, erreichte_punkte, max_punkte, erreicht_punkte_prozentsatz, gesamter_beitrag_zur_note})

            return {
                empty: empty,
                type: type,
                name: name,
                berechnete_gewichtung: berechnete_gewichtung,
                erreichte_punkte: erreichte_punkte,
                max_punkte: max_punkte,
                erreicht_punkte_prozentsatz: erreicht_punkte_prozentsatz,
                gesamter_beitrag_zur_note: gesamter_beitrag_zur_note,
            };
        } catch (error) {
            console.error("error in porcesseRow: ", error);
            throw "error in porcesseRow:" + error + " input:" + textTableRow;
            return null;
        }
    }

    function getIconElement (htmlTableRow) {
        return htmlTableRow[0].children[0].children[0].children[0];
    }

    function getTypeElement (htmlTableRow) {
        return htmlTableRow[0].children[0].children[1].children[0];
    }

    function getNameElement (htmlTableRow) {
        return htmlTableRow[0].children[0].children[1].children[1];
    }

    return {
        info: info,
        convertHtmlTableToTextTable: convertHtmlTableToTextTable,
        convertHtmlTableToHtmlElementsTable: convertHtmlTableToHtmlElementsTable,
        getModuleTitle: getModuleTitle,
        getTableColumns: getTableColumns,
        porcesseRow: porcesseRow,
        getIconElement: getIconElement,
        getTypeElement: getTypeElement,
        getNameElement: getNameElement,
    };
})();
