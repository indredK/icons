import React from 'react';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, List, Space } from 'antd';

import data from './problem.json'




const AllIconDemo = () => {

  return (
    <div style={{ color: '#555' }}>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={data}

        renderItem={(item) => (
          <List.Item
            key={item.title}
          >
            <List.Item.Meta
              title={<div>{item.title}</div>}
              description={item.description}
            />
            {item.content}
          </List.Item>
        )}
      />
    </div>
  );
}

export default AllIconDemo;
