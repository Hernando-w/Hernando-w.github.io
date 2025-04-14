document.addEventListener('DOMContentLoaded', function() {
    // 标签页切换功能
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
        });
    });
    
    // 生成模拟数据
    generateProbabilityData('dlt-probability', 35);
    generateProbabilityData('ssq-probability', 33);
    generateHistoryData('dlt-history', 100, 5, 2);
    generateHistoryData('ssq-history', 100, 6, 1);
});

// 生成概率预测数据
function generateProbabilityData(containerId, maxNumber) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    for (let i = 1; i <= maxNumber; i++) {
        const occurrences = Math.floor(Math.random() * 50) + 10;
        const probability = (Math.random() * 0.20 + 0.05).toFixed(4);
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="py-2 px-4 border-b border-gray-200">
                <span class="lottery-number ${i <= maxNumber-2 ? 'lottery-red' : 'lottery-blue'} text-sm">
                    ${i.toString().padStart(2, '0')}
                </span>
            </td>
            <td class="py-2 px-4 border-b border-gray-200">${occurrences}次</td>
            <td class="py-2 px-4 border-b border-gray-200">${probability}</td>
        `;
        container.appendChild(row);
    }
}

// 生成历史彩票数据
function generateHistoryData(containerId, count, redCount, blueCount) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    const today = new Date();
    
    for (let i = 0; i < count; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - (i * 3)); // 假设每3天开一次奖
        
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        const period = (2023000 + count - i).toString();
        
        // 生成红球号码
        const redNumbers = [];
        while (redNumbers.length < redCount) {
            const num = Math.floor(Math.random() * 33) + 1;
            if (!redNumbers.includes(num)) {
                redNumbers.push(num);
            }
        }
        redNumbers.sort((a, b) => a - b);
        
        // 生成蓝球号码
        const blueNumbers = [];
        while (blueNumbers.length < blueCount) {
            const num = Math.floor(Math.random() * 16) + 1;
            if (!blueNumbers.includes(num)) {
                blueNumbers.push(num);
            }
        }
        blueNumbers.sort((a, b) => a - b);
        
        // 渲染开奖号码
        let numberHtml = '';
        redNumbers.forEach(num => {
            numberHtml += `<span class="lottery-number lottery-red text-xs">${num.toString().padStart(2, '0')}</span>`;
        });
        
        blueNumbers.forEach(num => {
            numberHtml += `<span class="lottery-number lottery-blue text-xs">${num.toString().padStart(2, '0')}</span>`;
        });
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="py-2 px-4 border-b border-gray-200">${period}</td>
            <td class="py-2 px-4 border-b border-gray-200">${formattedDate}</td>
            <td class="py-2 px-4 border-b border-gray-200">${numberHtml}</td>
        `;
        container.appendChild(row);
    }
} 