import { useState } from 'react';
import img from '../assets/colors.png'
import './backgroundAlteringComponent.css';
//import { SavePreset } from '../utils/savePreset';

function BackgroundAlteringComponent({ onSettingsChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const [settings, setSettings] = useState({
        color1: '#03fc5e',
        color2: '#764ba2',
        degree: '55deg'
    });

    const handleChange = (field, value) => {
        const newSettings = { ...settings, [field]: value };
        setSettings(newSettings);
        onSettingsChange(newSettings);
    };

    return(
        <>
            <button className="alter-bg-btn"
                onClick={() => setIsOpen(!isOpen)}
                title="Customize Background">
                <img src={img} alt="Alter Background" style={{ width: '40px', height: '40px', margin: 'auto' }} />
            </button>

            {isOpen && (
                <div className="customizer-panel">
                    <div className="customizer-panel-header">
                        <h3>Background Settings</h3>
                        <button className='exit-btn' onClick={()=> setIsOpen(!isOpen)}>x</button>
                    </div>
                    <div className="control-group">
                        <label>Color 1</label>
                        <div className="color-input-group">
                            <input
                                type="color"
                                value={settings.color1}
                                onChange={(e) => handleChange('color1', e.target.value)}
                            />
                            <input
                                type="text"
                                value={settings.color1}
                                onChange={(e) => handleChange('color1', e.target.value)}
                                placeholder="#667eea"
                            />
                        </div>
                    </div>

                    <div className="control-group">
                        <label>Color 2</label>
                        <div className="color-input-group">
                            <input
                                type="color"
                                value={settings.color2}
                                onChange={(e) => handleChange('color2', e.target.value)}
                            />
                            <input
                                type="text"
                                value={settings.color2}
                                onChange={(e) => handleChange('color2', e.target.value)}
                                placeholder="#764ba2"
                            />
                        </div>
                    </div>

                    <div className="control-group">
                        <label>Gradient Angle: {settings.degree}°</label>
                        <input
                            type="range"
                            min="0"
                            max="360"
                            value={settings.degree}
                            onChange={(e) => handleChange('degree', e.target.value)}
                        />
                    </div>

                    <div className="preset-colors">
                        <p>Presets:</p>
                        <button onClick={() => {
                            const preset = { color1: '#667eea', color2: '#764ba2', degree: 135 };
                            setSettings(preset);
                            onSettingsChange(preset);
                        }}>Purple</button>
                        <button onClick={() => {
                            const preset = { color1: '#f093fb', color2: '#f5576c', degree: 135 };
                            setSettings(preset);
                            onSettingsChange(preset);
                        }}>Pink</button>
                        <button onClick={() => {
                            const preset = { color1: '#4facfe', color2: '#00f2fe', degree: 135 };
                            setSettings(preset);
                            onSettingsChange(preset);
                        }}>Blue</button>
                        <button onClick={() => {
                            const preset = { color1: '#43e97b', color2: '#38f9d7', degree: 135 };
                            setSettings(preset);
                            onSettingsChange(preset);
                        }}>Green</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default BackgroundAlteringComponent;