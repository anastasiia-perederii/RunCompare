import React, { useState } from "react";
import FileUploader from "./components/FileUploader";
import ExperimentSelector from "./components/ExperimentSelector";
import MetricChart from "./components/MetricChart";
import { parseCSV } from "./utils/parseCSV";
import "./App.css";

function App() {
  const [data, setData] = useState([]); // Всі рядки з CSV
  const [experiments, setExperiments] = useState([]); // Унікальні ID експериментів
  const [selectedExperiments, setSelectedExperiments] = useState([]); // Вибрані для перегляду


  // Парсинг CSV та ініціалізація стану
  const handleFileUpload = (file) => {
    parseCSV(file, (parsed) => {
      setData(parsed);
      const ids = [...new Set(parsed.map((d) => d.experiment_id))];
      setExperiments(ids);
      setSelectedExperiments(ids.slice(0, 2)); // автоматично вибрати перші 2
    });
  };

  return (
      <div className="app-container">
        <h1>ML Experiment Viewer</h1>
        <FileUploader onFileUpload={handleFileUpload} />
        {experiments.length > 0 && (
            <>
              <ExperimentSelector
                  experiments={experiments}
                  selected={selectedExperiments}
                  setSelected={setSelectedExperiments}
              />
              <MetricChart
                  data={data.filter((d) => selectedExperiments.includes(d.experiment_id))}
                  selectedExperiments={selectedExperiments}
              />
            </>
        )}
      </div>
  );
}

export default App;