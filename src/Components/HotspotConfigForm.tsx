// src/components/HotspotConfigForm.tsx
import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Form, Button, Row, Col } from 'react-bootstrap';

interface HotspotConfig {
  ssid: string;
  password: string;
}

const HotspotConfigForm: React.FC = () => {
  const [hotspotConfig, setHotspotConfig] = useState<HotspotConfig>({
    ssid: '',
    password: '',
  });

  useEffect(() => {
    axios.get<HotspotConfig>('/getHotspotConfig').then((response: AxiosResponse<HotspotConfig>) => {
      setHotspotConfig(response.data);
    });
  }, []);

  const handleSaveHotspotConfig = () => {
    const payload = {
      ssid: hotspotConfig.ssid,
      password: hotspotConfig.password,
    };

    console.log('Payload:', payload); // Debugging line

    axios.post('/setHotspotConfig', payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response: AxiosResponse) => {
      console.log('Hotspot config saved:', response.data);
    });
  };

  return (
    <Form className="mt-3">
      <Form.Group as={Row} controlId="formHotspotSsid">
        <Form.Label column sm={2}>SSID</Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            value={hotspotConfig.ssid || ''}
            onChange={(e) => setHotspotConfig({ ...hotspotConfig, ssid: e.target.value })}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="formHotspotPassword">
        <Form.Label column sm={2}>Password</Form.Label>
        <Col sm={10}>
          <Form.Control
            type="password"
            value={hotspotConfig.password || ''}
            onChange={(e) => setHotspotConfig({ ...hotspotConfig, password: e.target.value })}
          />
        </Col>
      </Form.Group>
      <Button variant="primary" onClick={handleSaveHotspotConfig} className="mt-3">
        Save
      </Button>
    </Form>
  );
};

export default HotspotConfigForm;
