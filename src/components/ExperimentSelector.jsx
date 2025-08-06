import React from 'react';
import {Checkbox} from 'primereact/checkbox';

// Компонент для вибору експериментів
const ExperimentSelector = ({experiments, selected, setSelected}) => {
    // Обробка вибору/зняття вибору чекбоксів
    const handleToggle = (id) => {
        const next = selected.includes(id)
            ? selected.filter((i) => i !== id)
            : [...selected, id];
        setSelected(next);
    };

    return (
        <div className="section">
            <h2 className="section-title">Select Experiments</h2>
            <div className="checkbox-list">
                {experiments.map((id) => (
                    <div key={id} className="checkbox-item">
                        <Checkbox
                            inputId={id}
                            value={id}
                            onChange={() => handleToggle(id)}
                            checked={selected.includes(id)}
                        />
                        <label htmlFor={id} style={{marginLeft: '8px'}}>{id}</label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExperimentSelector;
