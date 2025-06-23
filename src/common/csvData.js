export const fetchLastLineFromCSV = async (data) => {
    try {
        const csvUrl = `https://continuous-tshirt.s3.ap-south-1.amazonaws.com/faceless_app/test/${data.customer_id}/body_uploads/${data.body_type}/out_custom_measurements_${data.body_type}.csv?${Date.now()}`;

        const response = await fetch(csvUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const csvText = await response.text();

        const lines = csvText.trim().split('\n');

        const headers = lines[0].split(',');

        const lastLine = lines[lines.length - 1];
        const values = lastLine.split(',');

        const rowData = {};
        headers.forEach((header, index) => {
            rowData[header.trim()] = values[index].trim();
        });

        return rowData;
    } catch (error) {
        console.error('Error fetching or parsing CSV:', error);
        return null;
    }
};
