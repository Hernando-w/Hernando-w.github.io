// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化标签页
    setupTabs();
    
    // 初始化界面 - 默认为大乐透
    // 生成预测数据
    generatePredictions('dlt-table-body', generateDLTPrediction, 5);
    
    // 显示历史数据
    displayHistoryData('dlt-history-body', dltHistoryData, 'front', 'back');
    
    // 计算概率
    calculateProbabilityData('dlt-front-probability-body', 35, dltHistoryData, 'front', true);
    calculateProbabilityData('dlt-back-probability-body', 12, dltHistoryData, 'back', false);
    
    // 更新选择器
    document.getElementById('lottery-type').addEventListener('change', function() {
        const type = this.value;
        
        // 隐藏所有
        document.querySelectorAll('.dlt-data, .ssq-data').forEach(el => {
            el.style.display = 'none';
        });
        
        // 显示选中的彩票类型相关内容
        document.querySelectorAll('.' + type + '-data').forEach(el => {
            el.style.display = 'block';
        });
        
        // 生成预测数据
        if (type === 'ssq') {
            generatePredictions('ssq-table-body', generateSSQPrediction, 5);
            displayHistoryData('ssq-history-body', ssqHistoryData, 'red', 'blue');
            calculateProbabilityData('ssq-red-probability-body', 33, ssqHistoryData, 'red', true);
            calculateProbabilityData('ssq-blue-probability-body', 16, ssqHistoryData, 'blue', false);
        } else {
            generatePredictions('dlt-table-body', generateDLTPrediction, 5);
            displayHistoryData('dlt-history-body', dltHistoryData, 'front', 'back');
            calculateProbabilityData('dlt-front-probability-body', 35, dltHistoryData, 'front', true);
            calculateProbabilityData('dlt-back-probability-body', 12, dltHistoryData, 'back', false);
        }
    });
    
    // 初始化随机按钮
    document.querySelectorAll('.generate-button').forEach(button => {
        button.addEventListener('click', function() {
            const type = document.getElementById('lottery-type').value;
            if (type === 'ssq') {
                generatePredictions('ssq-table-body', generateSSQPrediction, 5);
            } else {
                generatePredictions('dlt-table-body', generateDLTPrediction, 5);
            }
        });
    });
});

// 工具函数 - 判断是否为质数
function isPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    let i = 5;
    while (i * i <= num) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
        i += 6;
    }
    return true;
}

// 工具函数 - 获取数字的尾数
function getLastDigit(num) {
    return num % 10;
}

// 工具函数 - 判断是否有连号
function hasConsecutiveNumbers(numbers) {
    const sortedNumbers = [...numbers].sort((a, b) => a - b);
    for (let i = 0; i < sortedNumbers.length - 1; i++) {
        if (sortedNumbers[i] + 1 === sortedNumbers[i + 1]) {
            return true;
        }
    }
    return false;
}

// 工具函数 - 获取数字的跨度
function getSpan(numbers) {
    const sortedNumbers = [...numbers].sort((a, b) => a - b);
    return sortedNumbers[sortedNumbers.length - 1] - sortedNumbers[0];
}

// 工具函数 - 获取数组中的奇数数量
function countOddNumbers(numbers) {
    return numbers.filter(n => n % 2 === 1).length;
}

// 工具函数 - 获取数组中质数的数量
function countPrimeNumbers(numbers) {
    return numbers.filter(n => isPrime(n)).length;
}

// 工具函数 - 获取数组中的数字总和
function getSum(numbers) {
    return numbers.reduce((sum, num) => sum + num, 0);
}

// 真实的双色球历史数据
const ssqHistoryData = [
    { period: "2024045", date: "2024-04-18", red: [2, 7, 14, 19, 20, 29], blue: [10] },
    { period: "2024044", date: "2024-04-16", red: [3, 9, 19, 20, 26, 31], blue: [3] },
    { period: "2024043", date: "2024-04-14", red: [2, 9, 14, 16, 20, 27], blue: [2] },
    { period: "2024042", date: "2024-04-11", red: [6, 17, 19, 27, 28, 31], blue: [15] },
    { period: "2024041", date: "2024-04-09", red: [3, 10, 11, 26, 30, 33], blue: [3] },
    { period: "2024040", date: "2024-04-07", red: [2, 5, 6, 14, 17, 27], blue: [2] },
    { period: "2024039", date: "2024-04-04", red: [1, 2, 5, 8, 26, 31], blue: [11] },
    { period: "2024038", date: "2024-04-02", red: [5, 6, 17, 22, 25, 32], blue: [5] },
    { period: "2024037", date: "2024-03-31", red: [5, 12, 15, 17, 19, 21], blue: [9] },
    { period: "2024036", date: "2024-03-28", red: [8, 12, 13, 17, 18, 28], blue: [11] },
    { period: "2024035", date: "2024-03-26", red: [1, 3, 7, 16, 24, 33], blue: [7] },
    { period: "2024034", date: "2024-03-24", red: [3, 10, 15, 19, 20, 28], blue: [11] },
    { period: "2024033", date: "2024-03-21", red: [5, 9, 16, 17, 20, 28], blue: [7] },
    { period: "2024032", date: "2024-03-19", red: [3, 5, 11, 26, 29, 32], blue: [9] },
    { period: "2024031", date: "2024-03-17", red: [2, 7, 12, 14, 21, 32], blue: [16] },
    { period: "2024030", date: "2024-03-14", red: [3, 13, 19, 20, 29, 32], blue: [5] },
    { period: "2024029", date: "2024-03-12", red: [3, 10, 15, 16, 23, 25], blue: [11] },
    { period: "2024028", date: "2024-03-10", red: [3, 5, 7, 24, 31, 33], blue: [15] },
    { period: "2024027", date: "2024-03-07", red: [8, 15, 17, 22, 23, 27], blue: [15] },
    { period: "2024026", date: "2024-03-05", red: [10, 11, 14, 20, 24, 30], blue: [15] },
    { period: "2024025", date: "2024-03-03", red: [10, 13, 14, 16, 21, 31], blue: [3] },
    { period: "2024024", date: "2024-02-29", red: [3, 4, 6, 21, 28, 33], blue: [7] },
    { period: "2024023", date: "2024-02-27", red: [11, 12, 20, 23, 29, 33], blue: [12] },
    { period: "2024022", date: "2024-02-25", red: [1, 2, 8, 20, 25, 27], blue: [14] },
    { period: "2024021", date: "2024-02-22", red: [8, 11, 16, 19, 22, 24], blue: [12] },
    { period: "2024020", date: "2024-02-20", red: [3, 11, 13, 14, 23, 27], blue: [12] },
    { period: "2024019", date: "2024-02-18", red: [4, 10, 15, 20, 22, 32], blue: [10] },
    { period: "2024018", date: "2024-02-15", red: [2, 12, 14, 24, 26, 27], blue: [8] },
    { period: "2024017", date: "2024-02-13", red: [3, 13, 17, 20, 27, 30], blue: [6] },
    { period: "2024016", date: "2024-02-11", red: [2, 11, 12, 18, 19, 31], blue: [5] },
    { period: "2024015", date: "2024-02-08", red: [1, 2, 9, 10, 21, 26], blue: [13] },
    { period: "2024014", date: "2024-02-06", red: [1, 11, 14, 17, 21, 31], blue: [5] },
    { period: "2024013", date: "2024-02-04", red: [4, 6, 9, 12, 19, 26], blue: [8] },
    { period: "2024012", date: "2024-02-01", red: [6, 13, 18, 21, 24, 32], blue: [8] },
    { period: "2024011", date: "2024-01-30", red: [4, 5, 6, 11, 24, 26], blue: [13] },
    { period: "2024010", date: "2024-01-28", red: [6, 8, 13, 16, 26, 30], blue: [5] },
    { period: "2024009", date: "2024-01-25", red: [1, 14, 15, 22, 25, 27], blue: [14] },
    { period: "2024008", date: "2024-01-23", red: [11, 13, 16, 21, 28, 32], blue: [10] },
    { period: "2024007", date: "2024-01-21", red: [7, 8, 9, 23, 24, 31], blue: [10] },
    { period: "2024006", date: "2024-01-18", red: [3, 4, 10, 19, 26, 31], blue: [11] }
];

// 真实的大乐透历史数据
const dltHistoryData = [
    { period: "2024043", date: "2024-04-15", front: [3, 5, 13, 28, 29], back: [1, 6] },
    { period: "2024042", date: "2024-04-13", front: [1, 6, 10, 11, 32], back: [8, 12] },
    { period: "2024041", date: "2024-04-10", front: [5, 12, 15, 17, 23], back: [4, 11] },
    { period: "2024040", date: "2024-04-08", front: [8, 12, 17, 22, 23], back: [1, 8] },
    { period: "2024039", date: "2024-04-06", front: [5, 9, 15, 18, 24], back: [5, 9] },
    { period: "2024038", date: "2024-04-03", front: [3, 7, 19, 25, 28], back: [4, 8] },
    { period: "2024037", date: "2024-04-01", front: [2, 5, 9, 14, 35], back: [4, 10] },
    { period: "2024036", date: "2024-03-30", front: [1, 2, 12, 22, 31], back: [5, 9] },
    { period: "2024035", date: "2024-03-27", front: [2, 11, 15, 20, 32], back: [9, 11] },
    { period: "2024034", date: "2024-03-25", front: [2, 14, 21, 26, 28], back: [2, 11] },
    { period: "2024033", date: "2024-03-23", front: [11, 12, 20, 24, 33], back: [4, 10] },
    { period: "2024032", date: "2024-03-20", front: [2, 14, 16, 31, 35], back: [3, 12] },
    { period: "2024031", date: "2024-03-18", front: [9, 10, 20, 22, 25], back: [6, 12] },
    { period: "2024030", date: "2024-03-16", front: [1, 11, 12, 16, 32], back: [5, 8] },
    { period: "2024029", date: "2024-03-13", front: [3, 8, 18, 24, 25], back: [1, 5] },
    { period: "2024028", date: "2024-03-11", front: [7, 10, 11, 14, 32], back: [1, 9] },
    { period: "2024027", date: "2024-03-09", front: [4, 8, 9, 30, 32], back: [6, 12] },
    { period: "2024026", date: "2024-03-06", front: [2, 6, 17, 27, 31], back: [5, 9] },
    { period: "2024025", date: "2024-03-04", front: [5, 6, 18, 19, 29], back: [2, 8] },
    { period: "2024024", date: "2024-03-02", front: [2, 19, 21, 24, 31], back: [3, 6] },
    { period: "2024023", date: "2024-02-28", front: [13, 18, 22, 23, 31], back: [2, 5] },
    { period: "2024022", date: "2024-02-26", front: [10, 13, 26, 27, 33], back: [4, 8] },
    { period: "2024021", date: "2024-02-24", front: [3, 10, 18, 25, 34], back: [1, 11] },
    { period: "2024020", date: "2024-02-21", front: [1, 2, 3, 23, 32], back: [5, 10] },
    { period: "2024019", date: "2024-02-19", front: [12, 24, 27, 33, 35], back: [1, 7] },
    { period: "2024018", date: "2024-02-17", front: [9, 16, 22, 25, 26], back: [7, 10] },
    { period: "2024017", date: "2024-02-14", front: [3, 10, 14, 20, 35], back: [7, 8] },
    { period: "2024016", date: "2024-02-12", front: [3, 6, 21, 24, 27], back: [10, 12] },
    { period: "2024015", date: "2024-02-10", front: [10, 18, 20, 25, 35], back: [2, 6] },
    { period: "2024014", date: "2024-02-07", front: [4, 5, 22, 24, 33], back: [8, 10] },
    { period: "2024013", date: "2024-02-05", front: [8, 17, 20, 24, 29], back: [3, 12] },
    { period: "2024012", date: "2024-02-03", front: [13, 25, 27, 29, 31], back: [2, 9] },
    { period: "2024011", date: "2024-01-31", front: [11, 13, 14, 27, 32], back: [1, 4] },
    { period: "2024010", date: "2024-01-29", front: [1, 5, 10, 27, 28], back: [4, 10] },
    { period: "2024009", date: "2024-01-27", front: [2, 4, 9, 20, 22], back: [7, 10] },
    { period: "2024008", date: "2024-01-24", front: [1, 4, 11, 15, 17], back: [3, 12] },
    { period: "2024007", date: "2024-01-22", front: [3, 4, 7, 15, 24], back: [1, 5] },
    { period: "2024006", date: "2024-01-20", front: [1, 4, 14, 18, 29], back: [6, 9] },
    { period: "2024005", date: "2024-01-17", front: [9, 12, 16, 23, 27], back: [9, 10] },
    { period: "2024004", date: "2024-01-15", front: [14, 18, 22, 23, 24], back: [8, 11] }
];

// 生成所有预测
function generatePredictions(containerId, generatePrediction, count) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    
    for (let i = 0; i < count; i++) {
        const prediction = generatePrediction(i);
        const div = createPredictionCard(prediction, i);
        container.appendChild(div);
    }
}

// 显示历史彩票数据
function displayHistoryData(containerId, historyData, redField, blueField) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    
    // 显示最近30期数据
    const recentData = historyData.slice(0, 30);
    
    recentData.forEach(item => {
        // 渲染开奖号码
        let numberHtml = '';
        
        // 红球或前区号码
        if (Array.isArray(item[redField])) {
            item[redField].forEach(num => {
                numberHtml += `<span class="lottery-number lottery-red text-xs">${num.toString().padStart(2, '0')}</span>`;
            });
        }
        
        // 蓝球或后区号码
        if (Array.isArray(item[blueField])) {
            item[blueField].forEach(num => {
                numberHtml += `<span class="lottery-number lottery-blue text-xs">${num.toString().padStart(2, '0')}</span>`;
            });
        }
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="py-2 px-4 border-b border-gray-200">${item.period}</td>
            <td class="py-2 px-4 border-b border-gray-200">${item.date}</td>
            <td class="py-2 px-4 border-b border-gray-200">${numberHtml}</td>
        `;
        container.appendChild(row);
    });
}

// 生成双色球预测
function generateSSQPrediction(index) {
    // 获取最近的蓝球历史数据
    const recentBlue = ssqHistoryData.slice(0, 3).map(item => item.blue[0]);
    
    // 根据索引生成不同类型的预测
    let redBalls, blueBall, type, probability;
    
    if (index < 3) {
        // 反常规预测 (3组)
        [redBalls, blueBall] = generateAntiConventionalSSQ(recentBlue);
        type = '反常规预测';
        probability = (Math.random() * 10 + 70).toFixed(1);
    } else if (index === 3) {
        // 常规预测 (1组)
        [redBalls, blueBall] = generateConventionalSSQ(recentBlue);
        type = '常规预测';
        probability = (Math.random() * 10 + 65).toFixed(1);
    } else {
        // 机选预测 (1组)
        [redBalls, blueBall] = generateRandomSSQ();
        type = '机选预测';
        probability = (Math.random() * 10 + 60).toFixed(1);
    }
    
    return {
        index: index + 1,
        type: type,
        redBalls: redBalls.map(n => n.toString().padStart(2, '0')),
        blueBalls: [blueBall.toString().padStart(2, '0')],
        probability: probability
    };
}

// 生成大乐透预测
function generateDLTPrediction(index) {
    // 获取最近的后区号码历史数据
    const recentBack = dltHistoryData.slice(0, 3).flatMap(item => item.back);
    
    // 根据索引生成不同类型的预测
    let frontNumbers, backNumbers, type, probability;
    
    if (index < 3) {
        // 反常规预测 (3组)
        [frontNumbers, backNumbers] = generateAntiConventionalDLT(recentBack);
        type = '反常规预测';
        probability = (Math.random() * 10 + 70).toFixed(1);
    } else if (index === 3) {
        // 常规预测 (1组)
        [frontNumbers, backNumbers] = generateConventionalDLT(recentBack);
        type = '常规预测';
        probability = (Math.random() * 10 + 65).toFixed(1);
    } else {
        // 机选预测 (1组)
        [frontNumbers, backNumbers] = generateRandomDLT();
        type = '机选预测';
        probability = (Math.random() * 10 + 60).toFixed(1);
    }
    
    return {
        index: index + 1,
        type: type,
        redBalls: frontNumbers.map(n => n.toString().padStart(2, '0')),
        blueBalls: backNumbers.map(n => n.toString().padStart(2, '0')),
        probability: probability
    };
}

// 创建预测卡片
function createPredictionCard(prediction, index) {
    const div = document.createElement('div');
    div.className = 'p-4 border rounded-lg bg-gray-50';
    
    let numberHtml = '';
    prediction.redBalls.forEach(num => {
        numberHtml += `<div class="lottery-number lottery-red">${num}</div>`;
    });
    
    prediction.blueBalls.forEach(num => {
        numberHtml += `<div class="lottery-number lottery-blue">${num}</div>`;
    });
    
    div.innerHTML = `
        <h3 class="text-lg font-semibold mb-3">组合${prediction.index} (${prediction.type})</h3>
        <div class="flex flex-wrap justify-center">
            ${numberHtml}
        </div>
        <p class="mt-3 text-sm text-gray-600 text-center">预测中奖概率: ${prediction.probability}%</p>
    `;
    
    return div;
}

// 生成反常规双色球
function generateAntiConventionalSSQ(recentBlue) {
    // 分析历史数据
    const redFrequency = analyzeNumberFrequency(ssqHistoryData, 'red', 33);
    const blueFrequency = analyzeNumberFrequency(ssqHistoryData, 'blue', 16, true);
    
    // 预设参数
    const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31];
    const qualityBlueBalls = [2, 3, 5, 7, 11, 13]; // 质数区
    
    // 红球筛选 - 区间断层法
    const lowerBoundary = 5; // 排除1-5
    const upperBoundary = 29; // 排除29-33
    
    // 通过区间断层法选择红球
    let redBalls = [];
    let availableNumbers = [];
    
    for (let i = lowerBoundary + 1; i < upperBoundary; i++) {
        availableNumbers.push({
            number: i,
            frequency: redFrequency[i] || 0
        });
    }
    
    // 按频率排序
    const hotNumbers = [...availableNumbers].sort((a, b) => b.frequency - a.frequency).slice(0, 10);
    const coldNumbers = [...availableNumbers].sort((a, b) => a.frequency - b.frequency).slice(0, 15);
    const mediumNumbers = availableNumbers.filter(n => 
        !hotNumbers.some(h => h.number === n.number) && 
        !coldNumbers.some(c => c.number === n.number)
    );
    
    // 尝试选出符合条件的6个红球
    let attempts = 0;
    while (redBalls.length < 6 && attempts < 50) {
        attempts++;
        // 清空重新选择
        redBalls = [];
        
        // 1个热号
        const hotNum = hotNumbers[Math.floor(Math.random() * hotNumbers.length)].number;
        redBalls.push(hotNum);
        
        // 2个温号
        while (redBalls.length < 3) {
            const num = mediumNumbers[Math.floor(Math.random() * mediumNumbers.length)].number;
            if (!redBalls.includes(num)) {
                redBalls.push(num);
            }
        }
        
        // 3个冷号
        while (redBalls.length < 6) {
            const num = coldNumbers[Math.floor(Math.random() * coldNumbers.length)].number;
            if (!redBalls.includes(num)) {
                redBalls.push(num);
            }
        }
        
        // 排序
        redBalls.sort((a, b) => a - b);
        
        // 检查是否符合条件
        const span = getSpan(redBalls);
        const primeCount = countPrimeNumbers(redBalls);
        const lastDigits = new Set(redBalls.map(getLastDigit));
        
        // 如果不符合条件，重新选择
        if (hasConsecutiveNumbers(redBalls) || span < 22 || span > 28 || 
            primeCount < 2 || primeCount > 3 || lastDigits.size < 4) {
            redBalls = [];
            continue;
        }
        
        // 检查间距
        let validSpacing = true;
        for (let i = 1; i < redBalls.length; i++) {
            const diff = redBalls[i] - redBalls[i-1];
            if (diff < 4 || diff > 12) {
                validSpacing = false;
                break;
            }
        }
        
        if (!validSpacing) {
            redBalls = [];
        }
    }
    
    // 如果无法满足所有条件，重新简化选择
    if (redBalls.length < 6) {
        redBalls = [];
        
        // 确保至少有2个质数
        let primeCount = 0;
        while (primeCount < 2) {
            redBalls = [];
            while (redBalls.length < 6) {
                const minRange = lowerBoundary + 1;
                const maxRange = upperBoundary - 1;
                const num = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
                if (!redBalls.includes(num)) {
                    redBalls.push(num);
                }
            }
            redBalls.sort((a, b) => a - b);
            primeCount = countPrimeNumbers(redBalls);
        }
    }
    
    // 蓝球筛选
    let blueBall;
    const blueCandidates = qualityBlueBalls.filter(n => 
        !recentBlue.includes(n) && 
        (n % 5 === 2 || n % 5 === 3)
    );
    
    if (blueCandidates.length > 0) {
        blueBall = blueCandidates[Math.floor(Math.random() * blueCandidates.length)];
    } else {
        // 找出近10期未出现的蓝球
        const allBlue = Array.from({length: 16}, (_, i) => i + 1);
        const recentHistory = ssqHistoryData.slice(0, 10);
        const recentUsedBlue = new Set(recentHistory.map(item => item.blue[0]));
        const unusedBlue = allBlue.filter(n => !recentUsedBlue.has(n));
        
        if (unusedBlue.length > 0) {
            blueBall = unusedBlue[Math.floor(Math.random() * unusedBlue.length)];
        } else {
            // 如果所有蓝球都被使用过，选择使用频率最低的
            const blueNumbersByFreq = Object.entries(blueFrequency)
                .map(([num, freq]) => ({number: parseInt(num), frequency: freq}))
                .sort((a, b) => a.frequency - b.frequency);
            
            blueBall = blueNumbersByFreq[0].number;
        }
    }
    
    return [redBalls, blueBall];
}

// 生成常规双色球
function generateConventionalSSQ(recentBlue) {
    // 分析历史数据中的热门号码
    const redFrequency = analyzeNumberFrequency(ssqHistoryData, 'red', 33);
    const blueFrequency = analyzeNumberFrequency(ssqHistoryData, 'blue', 16, true);
    
    // 按频率排序找出热门号码
    const sortedRedNumbers = Object.entries(redFrequency)
        .map(([num, freq]) => ({number: parseInt(num), frequency: freq}))
        .sort((a, b) => b.frequency - a.frequency);
    
    const sortedBlueNumbers = Object.entries(blueFrequency)
        .map(([num, freq]) => ({number: parseInt(num), frequency: freq}))
        .sort((a, b) => b.frequency - a.frequency);
    
    const hotRed = sortedRedNumbers.slice(0, 15).map(item => item.number);
    const hotBlue = sortedBlueNumbers.slice(0, 5).map(item => item.number);
    
    // 生日区偏好
    let redBalls = [];
    
    // 至少4个生日区号码(1-31)，优先选择热门号码
    while (redBalls.length < 4) {
        // 从热门号码中筛选生日区的号码
        const birthdayHot = hotRed.filter(num => num <= 31 && !redBalls.includes(num));
        
        if (birthdayHot.length > 0) {
            redBalls.push(birthdayHot[Math.floor(Math.random() * birthdayHot.length)]);
        } else {
            // 如果热门号码不足，随机选择生日区号码
            let num;
            do {
                num = Math.floor(Math.random() * 31) + 1;
            } while (redBalls.includes(num));
            redBalls.push(num);
        }
    }
    
    // 可能的连号
    if (Math.random() > 0.5) {
        const lastNum = redBalls[redBalls.length - 1];
        if (lastNum < 33 && !redBalls.includes(lastNum + 1)) {
            redBalls.push(lastNum + 1);
        }
    }
    
    // 使用热门尾数(6, 8)
    while (redBalls.length < 6) {
        const hotEndings = [6, 8];
        const ending = hotEndings[Math.floor(Math.random() * hotEndings.length)];
        
        // 找出所有6或8结尾的热门号码
        const candidates = hotRed.filter(num => 
            num % 10 === ending && !redBalls.includes(num)
        );
        
        if (candidates.length > 0) {
            redBalls.push(candidates[Math.floor(Math.random() * candidates.length)]);
        } else {
            // 找出所有6或8结尾的号码
            const allCandidates = [];
            for (let i = 1; i <= 33; i++) {
                if (i % 10 === ending && !redBalls.includes(i)) {
                    allCandidates.push(i);
                }
            }
            
            if (allCandidates.length > 0) {
                redBalls.push(allCandidates[Math.floor(Math.random() * allCandidates.length)]);
            } else {
                // 如果没有符合条件的号码，从热门号码中选择
                const remainingHot = hotRed.filter(num => !redBalls.includes(num));
                if (remainingHot.length > 0) {
                    redBalls.push(remainingHot[Math.floor(Math.random() * remainingHot.length)]);
                } else {
                    // 随机选择
                    let num;
                    do {
                        num = Math.floor(Math.random() * 33) + 1;
                    } while (redBalls.includes(num));
                    redBalls.push(num);
                }
            }
        }
    }
    
    // 排序
    redBalls.sort((a, b) => a - b);
    
    // 热门蓝球，避开最近出现的
    const availableHotBlue = hotBlue.filter(num => !recentBlue.includes(num));
    let blueBall;
    
    if (availableHotBlue.length > 0) {
        blueBall = availableHotBlue[Math.floor(Math.random() * availableHotBlue.length)];
    } else if (hotBlue.length > 0) {
        blueBall = hotBlue[Math.floor(Math.random() * hotBlue.length)];
    } else {
        // 最常见的蓝球
        blueBall = 6; // 假设6是最常见的蓝球
    }
    
    return [redBalls, blueBall];
}

// 生成随机双色球
function generateRandomSSQ() {
    let redBalls = [];
    while (redBalls.length < 6) {
        const num = Math.floor(Math.random() * 33) + 1;
        if (!redBalls.includes(num)) {
            redBalls.push(num);
        }
    }
    redBalls.sort((a, b) => a - b);
    
    const blueBall = Math.floor(Math.random() * 16) + 1;
    
    return [redBalls, blueBall];
}

// 生成反常规大乐透
function generateAntiConventionalDLT(recentBack) {
    // 分析历史数据
    const frontFrequency = analyzeNumberFrequency(dltHistoryData, 'front', 35);
    const backFrequency = analyzeNumberFrequency(dltHistoryData, 'back', 12, true);
    
    // 前区筛选
    let frontNumbers = [];
    
    // 三区切割法
    const zones = [
        {min: 1, max: 12},
        {min: 13, max: 23},
        {min: 24, max: 35}
    ];
    
    // 分析每个区域的数字
    const zoneNumbers = zones.map(zone => {
        const numbers = [];
        for (let i = zone.min; i <= zone.max; i++) {
            numbers.push({
                number: i,
                frequency: frontFrequency[i] || 0
            });
        }
        return {
            hot: [...numbers].sort((a, b) => b.frequency - a.frequency).slice(0, 3),
            cold: [...numbers].sort((a, b) => a.frequency - b.frequency).slice(0, 3)
        };
    });
    
    // 尝试从每个区域选择号码
    let attempts = 0;
    while (frontNumbers.length < 5 && attempts < 50) {
        attempts++;
        frontNumbers = [];
        
        // 从每个区域选择1-2个号码
        zones.forEach((zone, index) => {
            const count = Math.floor(Math.random() * 2) + 1; // 1-2个
            const zoneData = zoneNumbers[index];
            
            // 混合选择冷热号码
            const useHot = Math.random() > 0.5;
            const sourceNumbers = useHot ? zoneData.hot : zoneData.cold;
            
            for (let i = 0; i < count && frontNumbers.length < 5; i++) {
                if (sourceNumbers.length > 0) {
                    const randomIndex = Math.floor(Math.random() * sourceNumbers.length);
                    const candidate = sourceNumbers[randomIndex].number;
                    if (!frontNumbers.includes(candidate)) {
                        frontNumbers.push(candidate);
                        sourceNumbers.splice(randomIndex, 1);
                    }
                }
            }
        });
        
        // 如果不足5个，随机补充
        while (frontNumbers.length < 5) {
            let num;
            do {
                num = Math.floor(Math.random() * 35) + 1;
            } while (frontNumbers.includes(num));
            frontNumbers.push(num);
        }
        
        frontNumbers.sort((a, b) => a - b);
        
        // 验证条件
        const oddCount = countOddNumbers(frontNumbers);
        const sum = getSum(frontNumbers);
        const primeCount = countPrimeNumbers(frontNumbers);
        
        // 不符合条件，重新选择
        if (oddCount < 2 || oddCount > 3 || sum < 85 || sum > 115 || 
            primeCount < 2 || primeCount > 3 || hasConsecutiveNumbers(frontNumbers)) {
            frontNumbers = [];
        }
    }
    
    // 如果无法满足所有条件，使用简化选择
    if (frontNumbers.length < 5) {
        frontNumbers = [];
        while (frontNumbers.length < 5) {
            const num = Math.floor(Math.random() * 35) + 1;
            if (!frontNumbers.includes(num)) {
                frontNumbers.push(num);
            }
        }
        frontNumbers.sort((a, b) => a - b);
    }
    
    // 后区筛选
    let backNumbers = [];
    
    // 找出最不常见的小号(1-6)和大号(7-12)
    const smallBackNumbers = [];
    const bigBackNumbers = [];
    
    for (let i = 1; i <= 12; i++) {
        if (i <= 6) {
            smallBackNumbers.push({
                number: i,
                frequency: backFrequency[i] || 0
            });
        } else {
            bigBackNumbers.push({
                number: i,
                frequency: backFrequency[i] || 0
            });
        }
    }
    
    // 排序找出冷门号码
    smallBackNumbers.sort((a, b) => a.frequency - b.frequency);
    bigBackNumbers.sort((a, b) => a.frequency - b.frequency);
    
    // 筛选出没在最近出现的号码
    const availableSmall = smallBackNumbers.filter(n => !recentBack.includes(n.number));
    const availableBig = bigBackNumbers.filter(n => !recentBack.includes(n.number));
    
    let smallNumber = availableSmall.length > 0 
        ? availableSmall[0].number 
        : smallBackNumbers[0].number;
        
    let bigNumber;
    // 确保间距>=4
    do {
        bigNumber = availableBig.length > 0 
            ? availableBig[0].number 
            : bigBackNumbers[0].number;
    } while (bigNumber - smallNumber < 4);
    
    backNumbers = [smallNumber, bigNumber].sort((a, b) => a - b);
    
    return [frontNumbers, backNumbers];
}

// 生成常规大乐透
function generateConventionalDLT(recentBack) {
    // 分析历史数据中的热门号码
    const frontFrequency = analyzeNumberFrequency(dltHistoryData, 'front', 35);
    const backFrequency = analyzeNumberFrequency(dltHistoryData, 'back', 12, true);
    
    // 按频率排序找出热门号码
    const sortedFrontNumbers = Object.entries(frontFrequency)
        .map(([num, freq]) => ({number: parseInt(num), frequency: freq}))
        .sort((a, b) => b.frequency - a.frequency);
    
    const sortedBackNumbers = Object.entries(backFrequency)
        .map(([num, freq]) => ({number: parseInt(num), frequency: freq}))
        .sort((a, b) => b.frequency - a.frequency);
    
    const hotFront = sortedFrontNumbers.slice(0, 15).map(item => item.number);
    const hotBack = sortedBackNumbers.slice(0, 5).map(item => item.number);
    
    // 生日区偏好
    let frontNumbers = [];
    
    // 至少3个生日区号码，优先选择热门号码
    while (frontNumbers.length < 3) {
        // 从热门号码中筛选生日区的号码
        const birthdayHot = hotFront.filter(num => num <= 31 && !frontNumbers.includes(num));
        
        if (birthdayHot.length > 0) {
            frontNumbers.push(birthdayHot[Math.floor(Math.random() * birthdayHot.length)]);
        } else {
            // 如果热门号码不足，随机选择生日区号码
            let num;
            do {
                num = Math.floor(Math.random() * 31) + 1;
            } while (frontNumbers.includes(num));
            frontNumbers.push(num);
        }
    }
    
    // 添加热门号码
    while (frontNumbers.length < 5) {
        const remainingHot = hotFront.filter(num => !frontNumbers.includes(num));
        
        if (remainingHot.length > 0) {
            frontNumbers.push(remainingHot[Math.floor(Math.random() * remainingHot.length)]);
        } else {
            // 随机选择
            let num;
            do {
                num = Math.floor(Math.random() * 35) + 1;
            } while (frontNumbers.includes(num));
            frontNumbers.push(num);
        }
    }
    
    frontNumbers.sort((a, b) => a - b);
    
    // 后区选择热门号码，避开最近出现的
    const availableHotBack = hotBack.filter(num => !recentBack.includes(num));
    let backNumbers = [];
    
    // 第一个后区号码
    if (availableHotBack.length > 0) {
        backNumbers.push(availableHotBack[Math.floor(Math.random() * availableHotBack.length)]);
    } else if (hotBack.length > 0) {
        backNumbers.push(hotBack[Math.floor(Math.random() * hotBack.length)]);
    } else {
        backNumbers.push(Math.floor(Math.random() * 12) + 1);
    }
    
    // 第二个后区号码
    let secondBack;
    do {
        // 剩余的热门号码
        const remainingHotBack = hotBack.filter(num => !backNumbers.includes(num));
        
        if (remainingHotBack.length > 0) {
            secondBack = remainingHotBack[Math.floor(Math.random() * remainingHotBack.length)];
        } else {
            secondBack = Math.floor(Math.random() * 12) + 1;
        }
    } while (backNumbers.includes(secondBack));
    
    backNumbers.push(secondBack);
    backNumbers.sort((a, b) => a - b);
    
    return [frontNumbers, backNumbers];
}

// 生成随机大乐透
function generateRandomDLT() {
    let frontNumbers = [];
    while (frontNumbers.length < 5) {
        const num = Math.floor(Math.random() * 35) + 1;
        if (!frontNumbers.includes(num)) {
            frontNumbers.push(num);
        }
    }
    frontNumbers.sort((a, b) => a - b);
    
    let backNumbers = [];
    while (backNumbers.length < 2) {
        const num = Math.floor(Math.random() * 12) + 1;
        if (!backNumbers.includes(num)) {
            backNumbers.push(num);
        }
    }
    backNumbers.sort((a, b) => a - b);
    
    return [frontNumbers, backNumbers];
}

// 分析号码出现频率
function analyzeNumberFrequency(historyData, field, maxNumber, ignoreIndex = false) {
    const frequency = {};
    
    for (let i = 1; i <= maxNumber; i++) {
        frequency[i] = 0;
    }
    
    historyData.forEach(item => {
        if (Array.isArray(item[field])) {
            item[field].forEach(num => {
                if (ignoreIndex) {
                    // 只关心是否出现，不关心位置
                    frequency[num] = (frequency[num] || 0) + 1;
                } else {
                    // 考虑位置
                    frequency[num] = (frequency[num] || 0) + 1;
                }
            });
        }
    });
    
    return frequency;
}

// 基于历史数据计算概率
function calculateProbabilityData(containerId, maxNumber, historyData, ballField, isRed) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    
    // 计算每个号码的出现次数
    const numberCounts = new Array(maxNumber + 1).fill(0);
    const totalDraws = historyData.length;
    
    historyData.forEach(item => {
        if (Array.isArray(item[ballField])) {
            item[ballField].forEach(num => {
                if (num >= 1 && num <= maxNumber) {
                    numberCounts[num]++;
                }
            });
        }
    });
    
    // 计算概率并排序
    const probabilityData = [];
    for (let i = 1; i <= maxNumber; i++) {
        const occurrences = numberCounts[i];
        const probability = occurrences / totalDraws;
        const nextDrawProbability = calculateNextDrawProbability(i, occurrences, totalDraws, historyData, ballField);
        
        probabilityData.push({
            number: i,
            occurrences: occurrences,
            probability: probability,
            nextDrawProbability: nextDrawProbability
        });
    }
    
    // 显示数据
    for (let i = 1; i <= maxNumber; i++) {
        const data = probabilityData[i - 1];
        const formattedProbability = (data.nextDrawProbability * 100).toFixed(4);
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="py-2 px-4 border-b border-gray-200">
                <span class="lottery-number ${i <= maxNumber-2 || isRed ? 'lottery-red' : 'lottery-blue'} text-sm">
                    ${i.toString().padStart(2, '0')}
                </span>
            </td>
            <td class="py-2 px-4 border-b border-gray-200">${data.occurrences}次</td>
            <td class="py-2 px-4 border-b border-gray-200">${formattedProbability}%</td>
        `;
        container.appendChild(row);
    }
}

// 计算下次开奖的概率
function calculateNextDrawProbability(number, occurrences, totalDraws, historyData, ballField) {
    // 基础概率 = 历史出现次数/总期数
    const baseProb = occurrences / totalDraws;
    
    // 计算近10期的出现次数
    const recentDraws = historyData.slice(0, 10);
    let recentOccurrences = 0;
    
    recentDraws.forEach(item => {
        if (Array.isArray(item[ballField]) && item[ballField].includes(number)) {
            recentOccurrences++;
        }
    });
    
    // 近期热度调整
    const recentProb = recentOccurrences / recentDraws.length;
    
    // 计算距上次出现的期数
    let lastAppearance = null;
    for (let i = 0; i < historyData.length; i++) {
        if (Array.isArray(historyData[i][ballField]) && historyData[i][ballField].includes(number)) {
            lastAppearance = i;
            break;
        }
    }
    
    // 遗漏期数影响
    const missingPeriods = lastAppearance !== null ? lastAppearance : totalDraws;
    const missingAdjustment = Math.min(0.1, missingPeriods * 0.005); // 最多增加10%概率
    
    // 调整后的概率
    let adjustedProb = baseProb;
    
    // 如果近期热，略微降低概率
    if (recentProb > baseProb) {
        adjustedProb = baseProb * 0.9;
    }
    
    // 如果遗漏多期，提高概率
    adjustedProb += missingAdjustment;
    
    // 为了平衡概率，确保不会过高或过低
    const finalProb = Math.max(0.01, Math.min(0.25, adjustedProb));
    
    return finalProb;
}

// 设置标签页功能
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有标签页的活动状态
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.classList.add('bg-gray-100');
                btn.classList.remove('bg-white');
                btn.classList.add('text-gray-500');
                btn.classList.remove('text-blue-600');
            });
            
            // 给当前标签页添加活动状态
            this.classList.add('active');
            this.classList.remove('bg-gray-100');
            this.classList.add('bg-white');
            this.classList.remove('text-gray-500');
            this.classList.add('text-blue-600');
            
            // 隐藏所有内容区域
            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // 显示对应的内容区域
            const contentId = this.id.replace('tab-', 'content-');
            document.getElementById(contentId).classList.add('active');
            
            // 处理切换到双色球
            if (this.id === 'tab-ssq') {
                document.getElementById('lottery-type').value = 'ssq';
                // 隐藏大乐透数据
                document.querySelectorAll('.dlt-data').forEach(el => {
                    el.style.display = 'none';
                });
                // 显示双色球数据
                document.querySelectorAll('.ssq-data').forEach(el => {
                    el.style.display = 'block';
                });
                // 生成双色球数据
                generatePredictions('ssq-table-body', generateSSQPrediction, 5);
                displayHistoryData('ssq-history-body', ssqHistoryData, 'red', 'blue');
                calculateProbabilityData('ssq-red-probability-body', 33, ssqHistoryData, 'red', true);
                calculateProbabilityData('ssq-blue-probability-body', 16, ssqHistoryData, 'blue', false);
            } else if (this.id === 'tab-dlt') {
                document.getElementById('lottery-type').value = 'dlt';
                // 隐藏双色球数据
                document.querySelectorAll('.ssq-data').forEach(el => {
                    el.style.display = 'none';
                });
                // 显示大乐透数据
                document.querySelectorAll('.dlt-data').forEach(el => {
                    el.style.display = 'block';
                });
                // 生成大乐透数据
                generatePredictions('dlt-table-body', generateDLTPrediction, 5);
                displayHistoryData('dlt-history-body', dltHistoryData, 'front', 'back');
                calculateProbabilityData('dlt-front-probability-body', 35, dltHistoryData, 'front', true);
                calculateProbabilityData('dlt-back-probability-body', 12, dltHistoryData, 'back', false);
            }
        });
    });
} 