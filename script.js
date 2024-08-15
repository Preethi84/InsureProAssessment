const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'sales.txt');

fs.readFile(filePath, 'utf8', (err,data) => {
    if(err){
        console.error('Error reading the file:', err);
        return;
    }
    const lines = data.split('\n');

    let finalResult = {};
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

    let popularItemMonthWiseSub = {};
    for(const month in popularItemMonthWise){
        let mostPopularItem = '';
        let maxQuantity = 0;

        for(const item in popularItemMonthWise[month]){
            if(popularItemMonthWise[month][item] > maxQuantity){
                mostPopularItem = item;
                maxQuantity = popularItemMonthWise[month][item];
            }
        }
        popularItemMonthWiseSub[month] = {
            'Item':mostPopularItem,
            'Quantity': maxQuantity
        }
    }

    const mostRevenueItems = {};

    for (const month in monthItemRevenues) {
        let topRevenueItem = '';
        let maxRevenue = 0;
        for (const item in monthItemRevenues[month]) {
            if (monthItemRevenues[month][item] > maxRevenue) {
                topRevenueItem = item;
                maxRevenue = monthItemRevenues[month][item];
            }
        }
        mostRevenueItems[month] = {
            'Item': topRevenueItem,
            'Revenue': maxRevenue
        }
    }
    
    finalResult['totalSales'] = totalSales;
    finalResult['monthWiseSales'] = monthSales;
    finalResult['popularMonthWise'] = popularItemMonthWiseSub;
    finalResult['maxRevenueItem'] = mostRevenueItems;
    
    console.log(finalResult);
});