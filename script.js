const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'sales.txt');

fs.readFile(filePath, 'utf8', (err,data) => {
    if(err){
        console.error('Error reading the file:', err);
        return;
    }
    const lines = data.split('\n');
    let totalSales = 0;
    let monthSales = {};
    const popularItemMonthWise = {};
    const monthItemRevenues = {};

    for(let i=1 ;i < lines.length; i++){
        const line = lines[i].trim();
        
        if (line === '') continue;
        const columns = line.split(',');
        const totalPrice = parseFloat(columns[4]);
        
        totalSales += totalPrice;
        const date = columns[0];
        const month = date.slice(0, 7);

        const itemName = columns[1];
        const quantity = parseInt(columns[3], 10);
        
        if(!monthSales[month]){
            monthSales[month] = 0;
        }
        monthSales[month] += totalPrice;

        if(!popularItemMonthWise[month]){
            popularItemMonthWise[month] = {};
        }

        if(!popularItemMonthWise[month][itemName]){
            popularItemMonthWise[month][itemName] = 0;
        }

        if (!monthItemRevenues[month]) {
            monthItemRevenues[month] = {};
        }

        if (!monthItemRevenues[month][itemName]) {
            monthItemRevenues[month][itemName] = 0;
        }

        popularItemMonthWise[month][itemName] += quantity;
        monthItemRevenues[month][itemName] += totalPrice;

    }

    console.log(`Total Sales : ${totalSales}\n`);

    console.log('Month-wise Sales Totals:');
    for(const month in monthSales){
        console.log(`${month}: ${monthSales[month]}`)
    }
    console.log('\n');
    console.log('Most Popular Items by Month:');

    for(const month in popularItemMonthWise){
        let mostPopularItem = '';
        let maxQuantity = 0;

        for(const item in popularItemMonthWise[month]){
            if(popularItemMonthWise[month][item] > maxQuantity){
                mostPopularItem = item;
                maxQuantity = popularItemMonthWise[month][item];
            }
        }
        console.log(`${month}: ${mostPopularItem} (Quantity Sold: ${maxQuantity})`);
    }

    console.log('\n');
    console.log('Items Generating Most Revenue by Month:');

    for (const month in monthItemRevenues) {
        let topRevenueItem = '';
        let maxRevenue = 0;
        for (const item in monthItemRevenues[month]) {
            if (monthItemRevenues[month][item] > maxRevenue) {
                topRevenueItem = item;
                maxRevenue = monthItemRevenues[month][item];
            }
        }
        console.log(`${month}: ${topRevenueItem} (Revenue: ${maxRevenue})`);
    }
});