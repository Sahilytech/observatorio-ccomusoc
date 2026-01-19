const barCtx = document.getElementById('barChart').getContext('2d');
const pieCtx = document.getElementById('pieChart').getContext('2d');

let barChart;
let pieChart;

document.getElementById('fetch-data').addEventListener('click', async () => {
  const url = document.getElementById('data-url').value;
  if (!url) return alert('Ingresá una URL válida');

  try {
    const res = await fetch(`/fetch-data?url=${encodeURIComponent(url)}`);
    const data = await res.json();

    // Bar chart
    const barData = {
      labels: data.bar.labels,
      datasets: [{
        label: data.bar.label,
        data: data.bar.values,
        backgroundColor: 'var(--color-barra)'
      }]
    };

    if (barChart) barChart.destroy();
    barChart = new Chart(barCtx, {
      type: 'bar',
      data: barData,
      options: {
        responsive: true,
        animation: { duration: 1000, easing: 'easeOutQuart' }
      }
    });
    document.getElementById('barSource').textContent = `Fuente: ${data.bar.source}`;

    // Pie chart
    const pieData = {
      labels: data.pie.labels,
      datasets: [{
        label: data.pie.label,
        data: data.pie.values,
        backgroundColor: ['#ff6600', '#ffcc00', '#00cc99', '#0066cc']
      }]
    };

    if (pieChart) pieChart.destroy();
    pieChart = new Chart(pieCtx, {
      type: 'pie',
      data: pieData,
      options: {
        responsive: true,
        animation: { duration: 1000, easing: 'easeOutQuart' }
      }
    });
    document.getElementById('pieSource').textContent = `Fuente: ${data.pie.source}`;

  } catch (err) {
    console.error(err);
    alert('Error al procesar la URL.');
  }
});
