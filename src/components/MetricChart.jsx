import React from "react";
import { Chart } from "primereact/chart";

// Компонент для відображення графіків метрик
const MetricChart = ({ data, selectedExperiments }) => {
  const grouped = {};

  // Групування даних по назві метрики
  data.forEach((d) => {
    if (!grouped[d.metric_name]) grouped[d.metric_name] = [];
    grouped[d.metric_name].push(d);
  });

  return (
      <div className="section">
        {Object.keys(grouped).map((metric) => {
          const series = {};

          // Створення об'єктів з кроками і значеннями по експериментах
          grouped[metric].forEach(({ experiment_id, step, value }) => {
            if (!series[experiment_id]) series[experiment_id] = {};
            series[experiment_id][step] = +value; // Приводимо до числа
          });

          // Отримуємо всі унікальні кроки (steps)
          const steps = [...new Set(grouped[metric].map((d) => +d.step))].sort(
              (a, b) => a - b
          );

          // Формуємо datasets для побудови графіків
          const datasets = selectedExperiments.map((id) => {
            const values = steps.map((s) => series[id]?.[s] || null); // Значення на кожному step
            return {
              label: id,
              data: values,
              fill: false,
              borderColor: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`
              ,
            };
          });

          // Формуємо структуру даних для компонента Chart
          const chartData = {
            labels: steps,
            datasets,
          };

          // Налаштування опцій графіка
          const options = {
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
            },
          };

          return (
              <div key={metric} className="chart-container">
                <h3>{metric}</h3>
                <Chart type="line" data={chartData} options={options} />
              </div>
          );
        })}
      </div>
  );
};

export default MetricChart;