import React from 'react';
import { Select } from 'antd';
const options = [];

const handleChange = (value) => {
  console.log(`selected ${value}`);
};
const App = () => (
  <Select
    mode="tags"
    style={{
      width: '100%',
    }}
    placeholder="Tags Mode"
    onChange={handleChange}
    options={options}
  />
);
export default App;