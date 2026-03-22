async function getCPI() {
    // gets metadata of Cube (aka Table)
    // const url = " api/t1/wds/sdmx/statcan/rest/data/DF_13100101/1.1.1+2+3+4?startPeriod=2014&endPeriod=2015"
    const url = "/api/t1/wds/rest/getDataFromCubePidCoordAndLatestNPeriods "

    const requestBody = [
        {
            "productId" : 18100004,
            "coordinate" : "2.2.0.0.0.0.0.0.0.0",
            "latestN" : 5
        }
    ];

    // fetch(url)
    //     .then(response => response.body)
    //     .then(data => {
    //         console.log(data);
    //     })
    //     .catch(error => console.error('Error fetching data:', error));

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            console.log(response);
            throw new Error('Network response was not ok');
        } else {
        }

        const data = await response.json();
        console.log(data[0]["object"]["vectorDataPoint"][0]["value"]);
        cpiValue = data[0]["object"]["vectorDataPoint"][0]["value"];

        const cpiText = document.getElementById("cpi-value");
        cpiText.innerHTML = cpiValue;
    } catch (error) {
        console.error("Fetch error:", error);
    }
}

async function getCubeMetadata(table) {
    // calling Express server running on port 3001
    const url = "http://localhost:3001/api/metadata";

    const requestBody = [{
        "productId": table,
    }];

    // HTTP Request
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
    });

    const data = await response.json();
    let objectMetadata;
    try {
        objectMetadata = data[0]["object"];
    } catch (error) {
        console.error("Could not access data array", error);
    }
    console.log("Cube Metadata Successfully Returned: ", objectMetadata);
}

async function getCPI(latestN) {
    // calling Express server running on port 3001
    const url = "http://localhost:3001/api/cpi";

    const requestBody = [{
        "productId" : 18100004,
        "coordinate" : "2.2.0.0.0.0.0.0.0.0",
        "latestN" : latestN
    }];

    // HTTP Request
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
    });

    const data = await response.json();

    let cpiData;
    try {
        cpiData = data[0]["object"]["vectorDataPoint"];
    } catch (error) {
        console.error("Could not access data array", error);
    }

    let cpiValue = document.getElementById("cpi-value");
    let cpiChangeM = document.getElementById("cpi-change-m");
    let cpiChange12M = document.getElementById("cpi-change-12m");
    
    cpiValue.innerHTML = cpiData[1]["value"];
    cpiChangeM.innerHTML = 100*(((cpiData[11]["value"] - cpiData[10]["value"]) / cpiData[10]["value"])) + " % (Monthly)";
    cpiChange12M.innerHTML = 100*(((cpiData[11]["value"] - cpiData[0]["value"]) / cpiData[0]["value"])) + " % (12 Month)";

    console.log("CPI Data Succesfully Returned: ", cpiData);
}

getCPI(12);
getCubeMetadata(18100004);

