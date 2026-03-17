async function getMetadata(pID) {
    const url = "api/t1/wds/rest/getCubeMetadata"
    
    const requestBody = [
        {
            "productId" : pID,
    }];

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
        console.log(data);
    } catch (error) {
        console.error("Fetch error:", error);
    }
}

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

getMetadata(18100004);
getCPI();
