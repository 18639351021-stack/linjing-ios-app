// 初始化图表
let ecdChart;
const ctx = document.getElementById('ecdChart').getContext('2d');

// ECD计算公式
function calculateECDValue(mudDensity, annulusLoss, depth) {
    const ESD = mudDensity; // 当量静态密度
    const deltaPf = annulusLoss * 1000; // 环空压耗转换
    return ESD + (deltaPf / (9.81 * depth)); // 公式[1,4](@ref)
}

// 主计算函数
function calculateECD() {
    // 获取输入值
    const mudDensity = parseFloat(document.getElementById('mudDensity').value);
    const annulusLoss = parseFloat(document.getElementById('annulusLoss').value);
    const minDepth = parseFloat(document.getElementById('minDepth').value);
    const maxDepth = parseFloat(document.getElementById('maxDepth').value);

    // 数据验证
    if ([mudDensity, annulusLoss, minDepth, maxDepth].some(isNaN)) {
        alert("请输入有效的数值！");
        return;
    }

    // 生成数据序列
    const depths = [];
    const ecdValues = [];
    for (let depth = minDepth; depth <= maxDepth; depth += 100) {
        const ecd = calculateECDValue(mudDensity, annulusLoss, depth);
        depths.push(depth);
        ecdValues.push(ecd.toFixed(2));
    }

    // 更新结果
    document.getElementById('result').innerHTML = 
        `当前参数下ECD范围：${ecdValues[0]} - ${ecdValues[ecdValues.length-1]} kg/m³`;

    // 绘制/更新图表
    if (ecdChart) ecdChart.destroy();
    
    ecdChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: depths,
            datasets: [{
                label: 'ECD随井深变化曲线',
                data: ecdValues,
                borderColor: '#4CAF50',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {title: {display: true, text: '井深 (m)'}},
                y: {title: {display: true, text: 'ECD (kg/m³)'}}
            }
        }
    });
}

// 初始化计算
calculateECD();